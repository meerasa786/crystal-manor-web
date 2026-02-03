from datetime import datetime, timedelta
import jwt
from passlib.context import CryptContext
from .config import JWT_SECRET

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(password: str, password_hash: str) -> bool:
    return pwd_context.verify(password, password_hash)

def create_token(email: str) -> str:
    payload = {
        "sub": email,
        "exp": datetime.utcnow() + timedelta(hours=12),
        "iat": datetime.utcnow(),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")

def decode_token(token: str) -> str:
    data = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
    return data["sub"]
