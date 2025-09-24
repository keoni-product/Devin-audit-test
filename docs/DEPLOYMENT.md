# Deployment Guide

## Prerequisites
- Node.js 18+
- Twilio account with verified phone number
- Environment variables configured

## Environment Setup

1. Copy `.env.example` to `.env`
2. Fill in required Twilio credentials:
   ```
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_FROM_NUMBER=your_verified_number
   PORT=3001
   ```

## Local Development

```bash
npm install
npm start
```

## Production Deployment

### Using PM2
```bash
npm install -g pm2
pm2 start server.js --name "todo-app"
pm2 save
pm2 startup
```

### Using Docker
```bash
docker build -t todo-app .
docker run -p 3001:3001 --env-file .env todo-app
```

## Health Checks

The server exposes a health check endpoint at `/health` for monitoring.
