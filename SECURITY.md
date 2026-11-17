# Security Policy

## Supported Versions

Security fixes are applied to the latest minor release on the `main` branch.

| Version | Supported |
| :--- | :---: |
| `1.1.x` | Yes |
| `1.0.x` | Security fixes via upgrade to `1.1.x` |
| `< 1.0.0` | No |

## Reporting a Vulnerability

Please **do not** report security vulnerabilities through public GitHub issues, discussions, or pull requests.

Instead, report suspected vulnerabilities privately via one of these channels:

1. **GitHub Private Vulnerability Reporting:** Open the **Security** tab of this repository and click **Report a vulnerability** (if enabled).
2. **Direct Email:** Send details to **atsiilaarya14@gmail.com** with the subject line `[SECURITY] arya-portfolio: <brief summary>`.

Please include:
- The affected route, API endpoint, or file path.
- Clear steps or a minimal proof-of-concept to reproduce the issue.
- Potential impact (for example: XSS, credential exposure, SSRF, or unauthorized data modification).

You can expect an initial acknowledgment within 72 hours.

## Repository Security Practices

- **Environment Isolation:** Secrets, API tokens, OAuth client secrets, and SMTP credentials are loaded strictly via runtime environment variables and excluded by `.gitignore` (`.env`, `.env.*`).
- **Public Read-Only Client:** Public portfolio pages (`NEXT_PUBLIC_SUPABASE_ANON_KEY`) rely on Supabase Row-Level Security (RLS) policies scoped to read-only public records (`is_show = true`).
- **Server-Side Validation:** API routes (`/api/email`, `/api/projects`, `/api/achievements`) validate and sanitize incoming parameters on the server before processing.
