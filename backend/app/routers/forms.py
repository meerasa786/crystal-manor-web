from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..db import get_db
from ..schemas import ResidentFormIn, PostOpFormIn, ContactFormIn
from ..models import Submission
from ..emailer import send_notify_email

router = APIRouter(prefix="/api/forms", tags=["forms"])

@router.post("/resident")
def submit_resident(form: ResidentFormIn, db: Session = Depends(get_db)):
    sub = Submission(
        type="resident",
        name=form.name,
        email=str(form.email),
        phone=form.phone,
        payload={
            "preferred_move_in_date": form.preferred_move_in_date,
            "notes": form.notes,
        },
    )
    db.add(sub)
    db.commit()
    db.refresh(sub)

    send_notify_email(
        "New Resident Pre-Admission Form",
        f"Name: {sub.name}\nEmail: {sub.email}\nPhone: {sub.phone}\nMove-in: {sub.payload.get('preferred_move_in_date')}\nNotes: {sub.payload.get('notes')}"
    )
    return {"ok": True, "id": str(sub.id)}

@router.post("/postop")
def submit_postop(form: PostOpFormIn, db: Session = Depends(get_db)):
    sub = Submission(
        type="postop",
        name=form.name,
        email=str(form.email),
        phone=form.phone,
        payload={
            "discharge_date": form.discharge_date,
            "procedure_type": form.procedure_type,
            "needs_adl_help": form.needs_adl_help or {},
            "notes": form.notes,
        },
    )
    db.add(sub)
    db.commit()
    db.refresh(sub)

    send_notify_email(
        "New Post-Op Pre-Admission Form",
        f"Name: {sub.name}\nEmail: {sub.email}\nPhone: {sub.phone}\nDischarge: {sub.payload.get('discharge_date')}\nProcedure: {sub.payload.get('procedure_type')}\nADLs: {sub.payload.get('needs_adl_help')}\nNotes: {sub.payload.get('notes')}"
    )
    return {"ok": True, "id": str(sub.id)}

@router.post("/contact")
def submit_contact(form: ContactFormIn, db: Session = Depends(get_db)):
    sub = Submission(
        type="contact",
        name=form.name,
        email=str(form.email),
        phone=form.phone or "",
        payload={"message": form.message},
    )
    db.add(sub)
    db.commit()
    db.refresh(sub)

    send_notify_email(
        "New Website Contact Message",
        f"Name: {sub.name}\nEmail: {sub.email}\nPhone: {sub.phone}\nMessage:\n{sub.payload.get('message')}"
    )
    return {"ok": True, "id": str(sub.id)}
