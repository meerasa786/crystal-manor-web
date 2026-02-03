from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
import stripe
from ..db import get_db
from ..models import Payment
from ..schemas import StripeCheckoutOut
from ..config import (
    STRIPE_SECRET_KEY,
    STRIPE_DEPOSIT_AMOUNT_USD,
    STRIPE_SUCCESS_URL,
    STRIPE_CANCEL_URL,
    STRIPE_WEBHOOK_SECRET,
)

router = APIRouter(prefix="/api/payments", tags=["payments"])

@router.post("/create-checkout-session", response_model=StripeCheckoutOut)
def create_checkout_session(db: Session = Depends(get_db)):
    if not STRIPE_SECRET_KEY:
        raise HTTPException(status_code=500, detail="Stripe not configured")
    stripe.api_key = STRIPE_SECRET_KEY

    session = stripe.checkout.Session.create(
        mode="payment",
        success_url=STRIPE_SUCCESS_URL,
        cancel_url=STRIPE_CANCEL_URL,
        line_items=[
            {
                "price_data": {
                    "currency": "usd",
                    "product_data": {"name": "Admission Deposit"},
                    "unit_amount": STRIPE_DEPOSIT_AMOUNT_USD * 100,
                },
                "quantity": 1,
            }
        ],
    )

    p = Payment(
        stripe_session_id=session.id,
        amount_usd=STRIPE_DEPOSIT_AMOUNT_USD,
        status="created",
    )
    db.add(p)
    db.commit()

    return StripeCheckoutOut(checkout_url=session.url)

@router.post("/webhook")
async def stripe_webhook(request: Request, db: Session = Depends(get_db)):
    if not STRIPE_WEBHOOK_SECRET:
        raise HTTPException(status_code=400, detail="Webhook secret not set")

    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")

    try:
        event = stripe.Webhook.construct_event(
            payload=payload,
            sig_header=sig_header,
            secret=STRIPE_WEBHOOK_SECRET,
        )
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid webhook")

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        payment = db.query(Payment).filter(Payment.stripe_session_id == session["id"]).first()
        if payment:
            payment.status = "paid"
            db.commit()

    return {"ok": True}
