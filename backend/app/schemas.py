from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Dict, Any
from datetime import datetime
import uuid

class ResidentFormIn(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    email: EmailStr
    phone: str = Field(..., min_length=3, max_length=50)
    preferred_move_in_date: Optional[str] = None
    notes: Optional[str] = None

class PostOpFormIn(BaseModel):
    name: str
    email: EmailStr
    phone: str
    discharge_date: Optional[str] = None
    procedure_type: Optional[str] = None
    needs_adl_help: Optional[Dict[str, bool]] = None
    notes: Optional[str] = None

class ContactFormIn(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    message: str

class SubmissionOut(BaseModel):
    id: uuid.UUID
    type: str
    name: str
    email: str
    phone: str
    payload: Dict[str, Any]
    status: str
    created_at: datetime

class AdminBootstrapIn(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)

class AdminLoginIn(BaseModel):
    email: EmailStr
    password: str

class AdminLoginOut(BaseModel):
    token: str

class StripeCheckoutOut(BaseModel):
    checkout_url: str
