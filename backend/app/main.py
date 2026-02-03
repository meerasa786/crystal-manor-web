from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import CORS_ORIGINS
from .db import engine, Base
from .routers import forms, admin, payments

app = FastAPI(title="Crystal Manor API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def _create_tables():
    # For small deployments this is fine.
    # For enterprise environments use Alembic migrations instead.
    Base.metadata.create_all(bind=engine)

@app.get("/health")
def health():
    return {"ok": True}

app.include_router(forms.router)
app.include_router(admin.router)
app.include_router(payments.router)
