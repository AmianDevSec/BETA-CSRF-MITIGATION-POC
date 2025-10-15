# BETA-CSRF-MITIGATION-POC

**Purpose**  
Proof-of-concept showing a *strict CORS origin allowlist + origin-required check* for sensitive endpoints as a CSRF mitigation approach. Intended to **prevent** CSRF risk in controlled/local demos.

## How it works (concise)
- Only allows requests from `http://localhost:3000` (origin allowlist).
- Rejects requests that omit the `Origin` header (treated as suspicious).
- CORS configured with `credentials: true` so browser sends cookies only when origin matches.
- `/login` sets an `HttpOnly` cookie; `/transfer` requires requests to come from the allowed origin.

> ✅ Intended effect: makes cross-site requests less likely to succeed from unauthorized origins.  

## Quick start
```bash
npm install express cookie-parser cors
node index.js   # or server.js
```
