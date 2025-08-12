# Devin-audit-test

Simple to‑do list app with assignees and SMS notifications.

## Frontend
- Open `index.html` in a browser.
- Add a task, choose an assignee, and click Add.
- Tasks are saved to `localStorage` and persist after refresh.

## Users
- Predefined users are stored in `users.json` as:
  - `{ "id": "alice", "name": "Alice Johnson", "phone": "+15555550101" }`
- Edit `users.json` to manage the list. Phones should be in E.164 format.

## Backend (Twilio SMS)
A minimal Node/Express server sends an SMS to the assignee when a task is created.

### Setup
1. Node 18+ recommended.
2. Copy `.env.example` to `.env` and fill in:
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_FROM_NUMBER` (a verified/sending number)
   - `PORT` (optional, default 3001)
3. Install deps and run:
   ```
   npm install
   npm start
   ```
4. The frontend calls:
   - `GET /api/users` to populate the assignee select
   - `POST /api/notify` with `{ text, assignee }` to send SMS

Example:
```
curl -X POST http://localhost:3001/api/notify \
  -H "Content-Type: application/json" \
  -d '{"text":"Finish report","assignee":{"name":"Alice","phone":"+15555550101"}}'
```

## Notes
- No secrets are committed. Use `.env`.
- If the backend is not running, adding tasks still works; an error toast will appear for SMS.
