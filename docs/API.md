# API Documentation

## Endpoints

### GET /api/users
Returns list of available users for task assignment.

**Response:**
```json
[
  {
    "id": "alice",
    "name": "Alice Johnson", 
    "phone": "+15555550101"
  }
]
```

### POST /api/notify
Sends SMS notification to assigned user when task is created.

**Request Body:**
```json
{
  "text": "Task description",
  "assignee": {
    "name": "Alice Johnson",
    "phone": "+15555550101"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "SMS sent successfully"
}
```

## Error Handling

All endpoints return appropriate HTTP status codes:
- 200: Success
- 400: Bad Request
- 500: Internal Server Error
