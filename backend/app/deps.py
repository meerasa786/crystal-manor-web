from fastapi import Depends, HTTPException, Header
from sqlalchemy.orm import Session
from .db import get_db
from .security import decode_token
from .models import AdminUser

def require_admin(
    db: Session = Depends(get_db),
    authorization: str | None = Header(default=None)
) -> AdminUser:
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=401, detail="Missing bearer token")
    token = authorization.split(" ", 1)[1].strip()
    email = decode_token(token)
    admin = db.query(AdminUser).filter(AdminUser.email == email).first()
    if not admin:
        raise HTTPException(status_code=401, detail="Invalid token")
    return admin
