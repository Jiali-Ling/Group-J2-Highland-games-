# Highland Games REST API Documentation

## Base URL
- Development: `http://localhost:3000`
- Production: `https://highland-games.onrender.com`

## Authentication
Session-based authentication using HTTP-only cookies.

---

## API Endpoints

### 1. Authentication

#### POST `/auth`
Register or login user.

**Request Body (Login)**:
```json
{
  "authType": "login",
  "email": "test@example.com",
  "password": "password123"
}
```

**Request Body (Register)**:
```json
{
  "authType": "register",
  "name": "Duncan MacDougall",
  "email": "test@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response** (Success):
```json
{
  "success": true,
  "redirect": "/events"
}
```

**Response** (Error):
```json
{
  "errors": {
    "email": "Email already exists",
    "password": "Password too short"
  }
}
```

#### POST `/auth/logout`
Logout current user.

**Response**: Redirect to `/`

---

### 2. Events

#### GET `/events`
Get all events with optional filtering.

**Query Parameters**:
- `q` (string): Search term
- `from` (date): Start date filter
- `to` (date): End date filter

**Response**:
```json
{
  "events": [
    {
      "id": 1,
      "name": "Paisley Highland Games 2025",
      "description": "Traditional Highland athletics...",
      "date": "2025-08-15T10:00:00.000Z",
      "location": "Paisley, Scotland",
      "registrationOpen": true,
      "maxParticipants": 200
    }
  ]
}
```

#### GET `/events/:id`
Get event details by ID.

**Response**:
```json
{
  "event": {
    "id": 1,
    "name": "Paisley Highland Games 2025",
    "description": "Traditional Highland athletics...",
    "date": "2025-08-15T10:00:00.000Z",
    "location": "Paisley, Scotland",
    "registrationOpen": true,
    "rules": "All competitors must be 18+...",
    "registrations": [
      {
        "id": 1,
        "name": "Duncan MacDougall",
        "category": "Caber Toss",
        "status": "pending"
      }
    ]
  }
}
```

#### POST `/events/:id/register`
Submit event registration (requires authentication).

**Request Body**:
```json
{
  "name": "Duncan MacDougall",
  "category": "Caber Toss",
  "teamId": 1,
  "agree": true,
  "consentPrivacy": true,
  "consentRisk": true
}
```

**Response**:
```json
{
  "success": true,
  "registrationId": 1,
  "status": "pending"
}
```

---

### 3. Teams

#### GET `/teams`
Get user's teams (requires authentication).

**Response**:
```json
{
  "userTeams": [
    {
      "id": 1,
      "team": {
        "id": 1,
        "name": "Highland Warriors",
        "description": "A team of dedicated athletes",
        "inviteCode": "TEST1234",
        "owner": {
          "email": "test@example.com"
        },
        "members": [
          {
            "id": 1,
            "user": {
              "email": "test@example.com"
            },
            "role": "owner"
          }
        ]
      }
    }
  ],
  "ownedTeams": [...]
}
```

#### POST `/teams` (intent=create)
Create a new team.

**Request Body**:
```json
{
  "intent": "create",
  "name": "Highland Warriors",
  "description": "A team of dedicated athletes"
}
```

**Response**:
```json
{
  "success": true,
  "team": {
    "id": 1,
    "name": "Highland Warriors",
    "inviteCode": "ABC12345"
  }
}
```

#### POST `/teams` (intent=join)
Join a team using invite code.

**Request Body**:
```json
{
  "intent": "join",
  "inviteCode": "ABC12345"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Successfully joined team!"
}
```

#### POST `/teams` (intent=leave)
Leave a team.

**Request Body**:
```json
{
  "intent": "leave",
  "teamId": 1
}
```

**Response**:
```json
{
  "success": true,
  "message": "Left team successfully"
}
```

---

### 4. User Profile

#### GET `/profile`
Get current user's profile (requires authentication).

**Response**:
```json
{
  "user": {
    "id": 1,
    "email": "test@example.com",
    "emailVerified": true,
    "profile": {
      "fullName": "Duncan MacDougall",
      "dateOfBirth": "1990-05-15T00:00:00.000Z",
      "phone": "+44 141 555 0123",
      "address": "123 High Street, Paisley",
      "emergencyContact": "Mary MacDougall - +44 141 555 0124",
      "medicalInfo": null
    }
  }
}
```

#### POST `/profile` (intent=updateProfile)
Update user profile.

**Request Body**:
```json
{
  "intent": "updateProfile",
  "fullName": "Duncan MacDougall",
  "dateOfBirth": "1990-05-15",
  "phone": "+44 141 555 0123",
  "address": "123 High Street, Paisley, Scotland",
  "emergencyContact": "Mary MacDougall - +44 141 555 0124",
  "medicalInfo": "No known allergies"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Profile updated successfully"
}
```

---

### 5. Privacy & GDPR

#### GET `/privacy`
Get user's data requests and consent logs (requires authentication).

**Response**:
```json
{
  "user": {
    "id": 1,
    "email": "test@example.com"
  },
  "dataRequests": [
    {
      "id": 1,
      "requestType": "export",
      "status": "pending",
      "createdAt": "2025-11-21T10:00:00.000Z"
    }
  ],
  "consentLogs": [
    {
      "id": 1,
      "consentType": "privacy_policy",
      "agreed": true,
      "createdAt": "2025-11-21T09:00:00.000Z"
    }
  ]
}
```

#### POST `/privacy` (intent=exportData)
Request data export.

**Request Body**:
```json
{
  "intent": "exportData"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Data export request submitted. You will receive your data within 30 days."
}
```

#### POST `/privacy` (intent=correctData)
Request data correction.

**Request Body**:
```json
{
  "intent": "correctData",
  "reason": "My phone number is incorrect and needs to be updated."
}
```

**Response**:
```json
{
  "success": true,
  "message": "Data correction request submitted. We will review and process your request."
}
```

#### POST `/privacy` (intent=deleteAccount)
Request account deletion.

**Request Body**:
```json
{
  "intent": "deleteAccount",
  "confirmation": "DELETE"
}
```

**Response**: Redirect to `/` with session destroyed

---

### 6. Admin

#### GET `/admin`
Get admin dashboard (requires admin authentication).

**Response**:
```json
{
  "isAdmin": true,
  "regs": [
    {
      "id": 1,
      "name": "Duncan MacDougall",
      "email": "test@example.com",
      "category": "Caber Toss",
      "status": "pending",
      "submittedAt": "2025-11-21T10:00:00.000Z",
      "event": {
        "name": "Paisley Highland Games 2025"
      },
      "user": {
        "email": "test@example.com"
      },
      "team": {
        "name": "Highland Warriors"
      }
    }
  ],
  "events": [...],
  "pendingCount": 5,
  "dataRequests": [...]
}
```

#### POST `/admin` (intent=login)
Admin login.

**Request Body**:
```json
{
  "_intent": "login",
  "email": "admin@example.com",
  "password": "admin123"
}
```

#### POST `/admin` (intent=approve)
Approve registration.

**Request Body**:
```json
{
  "_intent": "approve",
  "id": 1
}
```

**Response**:
```json
{
  "success": true
}
```

#### POST `/admin` (intent=reject)
Reject registration.

**Request Body**:
```json
{
  "_intent": "reject",
  "id": 1,
  "rejectionReason": "Incomplete information provided"
}
```

**Response**:
```json
{
  "success": true
}
```

#### POST `/admin` (intent=processDataRequest)
Process data request.

**Request Body**:
```json
{
  "_intent": "processDataRequest",
  "requestId": 1,
  "action": "approve"
}
```

**Response**:
```json
{
  "success": true
}
```

---

### 7. Winners

#### GET `/winners`
Get winners with optional year filtering.

**Query Parameters**:
- `year` (number): Filter by year

**Response**:
```json
{
  "winners": [
    {
      "id": 1,
      "category": "Caber Toss",
      "athlete": "Hamish MacLeod",
      "position": 1,
      "year": 2024,
      "event": {
        "name": "Paisley Highland Games 2024"
      }
    }
  ]
}
```

---

## HTTP Status Codes

- `200 OK`: Successful GET request
- `201 Created`: Successful POST request (resource created)
- `302 Found`: Redirect
- `400 Bad Request`: Invalid input / validation error
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource already exists
- `500 Internal Server Error`: Server error

---

## Error Response Format

```json
{
  "error": "Error message",
  "errors": {
    "field1": "Field error message",
    "field2": "Field error message"
  }
}
```

---

## Rate Limiting

Currently no rate limiting implemented. In production, consider:
- 100 requests per minute per IP
- 1000 requests per hour per user

---

## CORS

CORS is handled by Remix. In production, configure allowed origins in `remix.config.js`.

---

## Testing with Postman/cURL

### Example: Login
```bash
curl -X POST http://localhost:3000/auth \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "authType=login&email=test@example.com&password=password123" \
  -c cookies.txt
```

### Example: Get Events (with session)
```bash
curl http://localhost:3000/events \
  -b cookies.txt
```

### Example: Create Team (authenticated)
```bash
curl -X POST http://localhost:3000/teams \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "intent=create&name=My Team&description=A great team" \
  -b cookies.txt
```

---

## Database Schema

See `prisma/schema.prisma` for complete database schema.

**Main Tables**:
- `User`: User accounts
- `UserProfile`: User personal information
- `Team`: Teams
- `TeamMember`: Team memberships (N:N)
- `Event`: Highland Games events
- `Registration`: Event registrations
- `Winner`: Historical winners
- `Announcement`: Event announcements
- `ConsentLog`: GDPR consent tracking
- `DataRequest`: GDPR data requests

---

## Relationships

```
User (1) ─── (1) UserProfile
User (1) ─── (N) Registration
User (N) ─── (N) Team (through TeamMember)
User (1) ─── (N) ConsentLog
User (1) ─── (N) DataRequest

Event (1) ─── (N) Registration
Event (1) ─── (N) Winner
Event (1) ─── (N) Announcement

Team (1) ─── (N) TeamMember
Team (1) ─── (N) Registration
```

---

## Notes

- All dates are in ISO 8601 format
- All endpoints returning lists support pagination (can be added)
- File uploads not currently supported (can be added with multipart/form-data)
- Email notifications are logged but not sent (requires email service integration)
