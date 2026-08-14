# Security Policy

## Reporting Security Issues

**Do NOT open public issues for security vulnerabilities.**

Instead, please email: `security@radixedge.io` with:
- Description of vulnerability
- Steps to reproduce
- Potential impact
- Your recommendations for fixing

We will acknowledge receipt within 48 hours and work on a fix.

## Supported Versions

| Version | Status | Support Until |
|---------|--------|---|
| 1.0.x | ✅ Active | 2027-08-14 |
| 0.9.x | ⚠️ Security Only | 2026-12-31 |
| < 0.9 | ❌ Unsupported | - |

## Security Features

✅ **Environment Variables** - Sensitive data via .env  
✅ **HTTPS/TLS** - Encrypted communications  
✅ **CORS** - Cross-origin protection  
✅ **Security Headers** - XSS, Clickjack, Content-Type protection  
✅ **Docker Isolation** - Container security  
✅ **Health Checks** - Uptime monitoring  
✅ **Rate Limiting** - DoS protection (can be configured)

## Best Practices for Users

1. **Keep Dependencies Updated**
   ```bash
   npm audit
   npm update
   ```

2. **Environment Variables**
   - Never commit `.env` files
   - Use strong, unique secrets
   - Rotate credentials regularly

3. **Deployment Security**
   - Use HTTPS in production
   - Enable security headers
   - Configure firewall rules
   - Monitor access logs

4. **Container Security**
   - Use latest base image
   - Scan images for vulnerabilities
   - Run with minimal privileges

## Vulnerability Disclosure Timeline

1. **Day 1** - Vulnerability reported
2. **Day 2** - Acknowledgment & investigation starts
3. **Day 7** - Patch development
4. **Day 14** - Security release published
5. **Day 21** - Public disclosure

## Dependencies

We use:
- `express` - Web framework
- `cors` - CORS middleware
- `dotenv` - Environment configuration

Regular audits performed via:
- `npm audit`
- GitHub Security Alerts
- Dependabot

## Compliance

- MIT License
- GDPR-friendly (no data collection)
- Cloud-agnostic deployment
- Enterprise-grade security

---

For more information, see [LICENSE](LICENSE) and [README.md](README.md)
