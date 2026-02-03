# Deployment Guide

You have two common options:

## Option A — Frontend on Vercel + Backend on Render (Recommended)

### 1) Database (Render Postgres or Supabase)
Create a managed Postgres DB. Copy the connection string.

### 2) Backend on Render
- Create a new **Web Service**
- Runtime: Python
- Build command:
  ```bash
  pip install -r requirements.txt
  ```
- Start command:
  ```bash
  uvicorn app.main:app --host 0.0.0.0 --port $PORT
  ```

Set environment variables (Render dashboard):
- `DATABASE_URL`
- `APP_ENV=prod`
- `CORS_ORIGINS=https://<your-vercel-domain>`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `NOTIFY_EMAIL_TO`
- `STRIPE_SECRET_KEY`
- `STRIPE_SUCCESS_URL=https://<your-domain>/payments/success`
- `STRIPE_CANCEL_URL=https://<your-domain>/payments/cancel`
- `JWT_SECRET`

> The backend auto-creates tables on startup (good for small deployments).
> For enterprise workflows, use Alembic migrations.

### 3) Frontend on Vercel
- Import the `frontend/` folder into Vercel
- Add environment variable:
  - `NEXT_PUBLIC_API_BASE_URL=https://<your-backend-domain>`

Deploy.

---

## Option B — Everything on AWS

### High-level architecture
- Frontend: Vercel OR S3 + CloudFront
- Backend: ECS Fargate OR Elastic Beanstalk OR EC2
- Database: RDS Postgres
- Emails: SES (recommended) or SMTP provider
- Payments: Stripe

### Steps (common pattern)
1) Create RDS Postgres + security group
2) Deploy FastAPI service on ECS/EB/EC2
3) Configure environment variables & secrets (SSM Parameter Store or Secrets Manager)
4) Deploy frontend and set `NEXT_PUBLIC_API_BASE_URL`
5) Add monitoring:
   - CloudWatch logs/alarms
   - Basic uptime check for `/health`

---

## Stripe Webhooks (Optional but Recommended)
If you want the backend to automatically mark payments as "paid":
1) Create a webhook endpoint in Stripe dashboard:
   - URL: `https://<backend>/api/payments/webhook`
2) Listen to:
   - `checkout.session.completed`
3) Add env var:
   - `STRIPE_WEBHOOK_SECRET`

