import os
from dotenv import load_dotenv

load_dotenv()

def _get(name: str, default: str | None = None) -> str:
    v = os.getenv(name, default)
    if v is None:
        raise RuntimeError(f"Missing required env var: {name}")
    return v

APP_ENV = os.getenv("APP_ENV", "dev")
CORS_ORIGINS = [x.strip() for x in os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",") if x.strip()]
JWT_SECRET = _get("JWT_SECRET", "change_me")

DATABASE_URL = _get("DATABASE_URL", "postgresql://crystal:crystalpass@localhost:5432/crystal_manor")

SMTP_HOST = os.getenv("SMTP_HOST", "")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASS = os.getenv("SMTP_PASS", "")
NOTIFY_EMAIL_TO = os.getenv("NOTIFY_EMAIL_TO", "")
EMAIL_FROM_NAME = os.getenv("EMAIL_FROM_NAME", "Crystal Manor Website")

STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY", "")
STRIPE_DEPOSIT_AMOUNT_USD = int(os.getenv("STRIPE_DEPOSIT_AMOUNT_USD", "250"))
STRIPE_SUCCESS_URL = os.getenv("STRIPE_SUCCESS_URL", "http://localhost:3000/payments/success")
STRIPE_CANCEL_URL = os.getenv("STRIPE_CANCEL_URL", "http://localhost:3000/payments/cancel")
STRIPE_WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET", "")
