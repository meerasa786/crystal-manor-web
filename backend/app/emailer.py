import smtplib
from email.mime.text import MIMEText
from email.utils import formataddr
from .config import SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_EMAIL_TO, EMAIL_FROM_NAME

def send_notify_email(subject: str, body: str) -> None:
    """Send an email notification. If SMTP is not configured, no-op in dev."""
    if not (SMTP_HOST and SMTP_USER and SMTP_PASS and NOTIFY_EMAIL_TO):
        # In dev, allow running without SMTP
        return

    msg = MIMEText(body, "plain", "utf-8")
    msg["Subject"] = subject
    msg["From"] = formataddr((EMAIL_FROM_NAME, SMTP_USER))
    msg["To"] = NOTIFY_EMAIL_TO

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASS)
        server.sendmail(SMTP_USER, [NOTIFY_EMAIL_TO], msg.as_string())
