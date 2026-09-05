# Cloud Functions — Manual Test Checklist

Covers `downloadFile` (gen-1 HTTP), tested against a deployed instance. No automated
harness exists by design — the checklist mirrors the exact acceptance cases, each with a
curl command and the expected result.

> **Note:** `setAdminRole` was removed from `functions/index.js`. Granting and
> revoking the admin flag is done through the admin panel's direct Firestore write to
> `users/{uid}.admin` — the security rules are the single enforcement boundary for that
> operation (the update rule already restricts it to callers whose own
> `users/{uid}.admin` is true). Keeping one enforcement path avoids drift between
> duplicate checks. The remaining exported functions are `downloadFile` (HTTP) and
> `onUserDeleted` (Auth trigger — no HTTP endpoint, coverable only via the emulator).

**Project:** `gyanu-notes-6f6d8` · **Region:** `us-central1` · **Web API key** (public, safe):
`AIzaSyA-QLb54wT2y-k4W3GUrsxB9SA-WFZ_03w`

---

## 0. Prerequisites

1. Deploy once so the latest code is live:
   ```bash
   firebase deploy --only functions
   ```
2. Create a test account (email/password sign-up via the site, or the Auth REST below)
   and **verify its email** (click the verification link), for the downloadFile cases.

   | Account | Purpose |
   |---|---|
   | `verified@example.com` | Has **verified their email** (required to download) |
   | `student@example.com` | Signed in but **not** email-verified → for the 403 case |

3. **Windows users:** use `curl.exe` (the real curl). PowerShell's `curl` is an alias
   for `Invoke-WebRequest` and will mangle these commands.

### Get an ID token (one-liner per account)

```bash
curl.exe -s -X POST "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA-QLb54wT2y-k4W3GUrsxB9SA-WFZ_03w" \
  -H "Content-Type: application/json" \
  -d '{"email":"verified@example.com","password":"YOUR_PASSWORD","returnSecureToken":true}'
```

Copy the `idToken` field from each response. A fresh login is needed per session; tokens
expire in ~1h.

---

## 1. `downloadFile` (gen-1 HTTP)

> ℹ️ Unlike callables, **this one uses real HTTP status codes** — assert them with `-w "%{http_code}"`.

**Endpoint:** `https://us-central1-gyanu-notes-6f6d8.cloudfunctions.net/downloadFile?type=note&id=c10-math-01&name=Ch01.pdf`
(validated ids from the bundled catalogue: note `c10-math-01`, paper `c10-math-2081-real`)

### 1.1 No Authorization header → **401**
```bash
curl.exe -s -o NUL -w "%{http_code}" "https://us-central1-gyanu-notes-6f6d8.cloudfunctions.net/downloadFile?type=note&id=c10-math-01&name=t.pdf"
```
Expected: `401` (body: `{"error":"Sign in to download files."}`). Use `-o /dev/null` on Git Bash/WSL.

### 1.2 Invalid / expired token → **401**
```bash
curl.exe -s -o NUL -w "%{http_code}" "https://us-central1-gyanu-notes-6f6d8.cloudfunctions.net/downloadFile?type=note&id=c10-math-01" \
  -H "Authorization: Bearer not.a.real.token"
```
Expected: `401` (body: `{"error":"Your session expired. ..."}`). `verifyIdToken` throws → caught.

### 1.3 Verified-token but unverified email → **403**
Header: `Authorization: Bearer <student token>` (student has **not** verified email)
Expected: `403` (`{"error":"Verify your email address before downloading files."}`)
`decoded.email_verified !== true` → deny. (For the positive path, use a `verified@example.com` token.)

### 1.4 Invalid `id` query-param format → **400**
Regex: `/^[-\w]{2,80}$/` — anything else is rejected.
```bash
...?type=note&id=a            # too short (1 char)   -> 400
...?type=note&id=a%20b        # space (URL-encoded)  -> 400
...?type=note&id=no?chars!    # illegal chars        -> 400
...?type=note                 # missing id           -> 400
```

All with a valid `Authorization: Bearer <verified token>`. Expected: `400`
(`{"error":"Invalid file reference."}`).

### 1.5 Valid request for an existing catalogue entry → proceeds to the fetch step
Header: `Authorization: Bearer <verified token>`
```bash
curl.exe -s -D - -o /dev/null "https://us-central1-gyanu-notes-6f6d8.cloudfunctions.net/downloadFile?type=note&id=c10-math-01&name=Ch01.pdf" \
  -H "Authorization: Bearer <verified token>"
```
The function resolves the record, then fetches `https://drive.usercontent.google.com/download?id=…&export=download&confirm=t`.
What you see next depends on the file state:

| Catalogue state | Expected |
|---|---|
| `driveFileId` placeholder / invalid | `404` `{"error":"No downloadable file is attached to this entry yet."}` |
| Real file, shared "Anyone with the link" | `200`, body streams the PDF, `Content-Disposition: attachment; filename="Ch01.pdf"` |
| Drive refuses / file removed | `502` `{"error":"..."}` |
| `siteContent/current` missing entirely | `503` `{"error":"The catalogue has not been imported yet. ..."}` |

**Sanity check that the fetch step ran:** add a second to the function and watch
`us-central1-gyanu-notes-6f6d8` → Cloud Functions → `downloadFile` → Logs; a log line
with the resolved Drive `fileId` confirms the record lookup + Drive fetch executed.

### 1.6 Bonus — method guard
```bash
curl.exe -s -o NUL -w "%{http_code}" -X POST "https://us-central1-gyanu-notes-6f6d8.cloudfunctions.net/downloadFile?type=note&id=c10-math-01"
```
Expected: `405` (`{"error":"Method not allowed."}`).

---

## 2. Full acceptance trace (recommended order)

1. 1.1 no header → `401` ✅
2. 1.2 bad token → `401` ✅
3. 1.3 unverified → `403` ✅
4. 1.4 bad `id` → `400` ✅
5. 1.5 real entry → fetch path (`200`/`404`/`502` per file state) ✅

---

## Running against the emulator (optional)

```bash
firebase emulators:start --only functions
```
The HTTP function `downloadFile` runs at `http://localhost:5001/gyanu-notes-6f6d8/us-central1/downloadFile`.
Note the **Auth emulator** must also be started for ID tokens to verify
(`firebase emulators:start --only functions,auth`); otherwise the
functions emulator cannot construct a valid `context.auth`. The deployed-instance flow
above is the preferred path because it exercises the real token verification.