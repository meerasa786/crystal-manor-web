# Maintenance & Future Expansion Plan

## Maintenance (Monthly)
- Review backups (DB snapshots) and restore test quarterly
- Rotate secrets (SMTP, Stripe, JWT) as required
- Review admin access (remove unused accounts)
- Update dependencies (security patches)

## Monitoring (Recommended)
- Health endpoint checks: `/health`
- Error logging: enable structured logs (already included)
- Metrics (optional): Prometheus/Grafana or hosted APM

## Future Expansion
1) **Care Levels (Tier I/II/III)**:
   - Add detail pages and eligibility criteria
2) **Referrals & Care Coordination**:
   - Add a referral intake flow
3) **File Uploads**:
   - Upload documents (ID, referrals) via signed URLs (S3)
4) **Patient Portal (Private)**:
   - Authenticated portal for families/residents
5) **CMS**:
   - Use a headless CMS for updating content without code changes

## Security Enhancements
- Add reCAPTCHA to public forms
- Rate limiting on form endpoints
- Admin MFA (via identity provider)

