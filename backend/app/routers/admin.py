from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..db import get_db
from ..models import AdminUser, Submission
from ..schemas import AdminBootstrapIn, AdminLoginIn, AdminLoginOut, SubmissionOut
from ..security import hash_password, verify_password, create_token
from ..deps import require_admin

router = APIRouter(prefix="/api/admin", tags=["admin"])

@router.post("/bootstrap")
def bootstrap_admin(data: AdminBootstrapIn, db: Session = Depends(get_db)):
    existing = db.query(AdminUser).filter(AdminUser.email == str(data.email)).first()
    if existing:
        return {"ok": True, "message": "Admin already exists"}
    admin = AdminUser(email=str(data.email), password_hash=hash_password(data.password))
    db.add(admin)
    db.commit()
    return {"ok": True, "message": "Admin created"}

@router.post("/login", response_model=AdminLoginOut)
def login(data: AdminLoginIn, db: Session = Depends(get_db)):
    admin = db.query(AdminUser).filter(AdminUser.email == str(data.email)).first()
    if not admin or not verify_password(data.password, admin.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return AdminLoginOut(token=create_token(admin.email))

@router.get("/submissions", response_model=list[SubmissionOut])
def list_submissions(
    db: Session = Depends(get_db),
    _admin: AdminUser = Depends(require_admin),
    type: str | None = None
):
    q = db.query(Submission)
    if type:
        q = q.filter(Submission.type == type)
    return q.order_by(Submission.created_at.desc()).limit(500).all()

@router.patch("/submissions/{submission_id}")
def update_submission_status(
    submission_id: str,
    status: str,
    db: Session = Depends(get_db),
    _admin: AdminUser = Depends(require_admin),
):
    sub = db.query(Submission).filter(Submission.id == submission_id).first()
    if not sub:
        raise HTTPException(status_code=404, detail="Not found")
    sub.status = status
    db.commit()
    return {"ok": True}
