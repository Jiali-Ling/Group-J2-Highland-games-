# Highland Games Project Implementation Guide

## Project Overview

This is a Highland Games event management system. Users can:
Register accounts and manage profiles
Browse and search events
Register for competitions
Create and manage teams
Admins can approve or reject registrations
Users can exercise GDPR data rights (export, correct, delete)

## Technology Stack

### Frontend: React + Remix

Why Remix:
Remix is a modern full-stack framework that supports both Remix and Next.js patterns
React provides excellent component-based architecture
Remix provides server-side rendering for better performance
No need to separate frontend and backend, simplifying development

Code location:
app/routes/ - All page routes (React components)
app/entry.client.jsx - Client entry point
app/entry.server.jsx - Server entry point

Example: app/routes/_index.jsx is the home page using React components

### Backend: Node.js + Remix

Why Node.js:
Node.js is widely used and well-supported
Remix has built-in backend capabilities
Same language for frontend and backend reduces complexity

Code location:
app/routes/*.jsx - Each route file has loader and action functions
  loader = Get data (like GET request)
  action = Handle form submission (like POST request)
server.js - Express server wrapper for production

Example: app/routes/events._index.jsx loader function gets event list from database

### Database: Prisma ORM + SQLite

Why Prisma:
Relational database fits the data model well
SQLite is simple for development, no separate server needed
Prisma provides type-safe database access
Auto-generates migration files for schema changes

Code location:
prisma/schema.prisma - Database structure definition
prisma/seed.js - Initial data seeding
app/utils/db.server.js - Database connection

### Container: Docker

Why Docker:
Docker provides containerization for easy deployment
Simplifies environment setup and configuration
Ensures consistent environment across development and production

Code location:
Dockerfile - Container build configuration
docker-compose.yml - Multi-container setup

## Database Design

The project uses 8 main database tables:

```
User
  ├── UserProfile (one-to-one)
  ├── Registration (one-to-many)
  ├── TeamMember (one-to-many)
  ├── Team (one-to-many as owner)
  ├── ConsentLog (one-to-many)
  └── DataRequest (one-to-many)

Event
  ├── Registration (one-to-many)
  ├── Winner (one-to-many)
  └── Announcement (one-to-many)

Team
  ├── TeamMember (one-to-many)
  └── Registration (one-to-many)
```

### Key Tables

1. User Table
Stores user account information
Supports login authentication
Fields: id, email, passwordHash, role

2. UserProfile Table
Stores user detailed information
Supports GDPR data export
Fields: fullName, dateOfBirth, phone, address, medicalInfo

3. Event Table
Stores competition event information
Fields: name, description, date, location, maxParticipants

4. Registration Table
Stores user event registrations
Supports admin approval
Fields: eventId, userId, category, status (pending/approved/rejected)

5. ConsentLog Table
Records user consent for GDPR compliance
Fields: consentType, agreed, ipAddress, userAgent

6. DataRequest Table
Records GDPR data requests (export, correction, deletion)
Fields: requestType, status, reason

## API Design

Remix does not use traditional REST API endpoints. Instead, it uses loader and action functions in route files.

### Getting Data (GET request = loader function)

Example: Get event list
File: app/routes/events._index.jsx

```javascript
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  
  const where = {};
  if (q) {
    where.OR = [
      { name: { contains: q } },
      { location: { contains: q } }
    ];
  }
  
  const events = await prisma.event.findMany({ 
    where, 
    orderBy: { date: "asc" } 
  });
  
  return json({ events, q: q || "" });
}
```

Frontend usage:
```javascript
export default function Events() {
  const { events, q } = useLoaderData();
  
  return (
    <div>
      {events.map(e => <div key={e.id}>{e.name}</div>)}
    </div>
  );
}
```

This is equivalent to REST API: GET /events?q=searchterm

### Submitting Data (POST request = action function)

Example: User registration
File: app/routes/auth.jsx

```javascript
export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const authType = formData.get("authType");
  
  if (authType === "register") {
    if (!email || !password) {
      return json({ errors: { email: "Required" } }, { status: 400 });
    }
    
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return json({ errors: { email: "Already exists" } }, { status: 409 });
    }
    
    const passwordHash = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
      data: { email, passwordHash, role: "participant" }
    });
    
    const session = await storage.getSession(request.headers.get("Cookie"));
    session.set("userId", user.id);
    
    return redirect("/", {
      headers: { "Set-Cookie": await storage.commitSession(session) }
    });
  }
}
```

Frontend form:
```jsx
<Form method="post">
  <input name="email" type="email" />
  <input name="password" type="password" />
  <input type="hidden" name="authType" value="register" />
  <button type="submit">Register</button>
</Form>
```

This is equivalent to REST API: POST /auth with body { email, password, authType }

### JSON Data Consumption

Frontend consumes JSON in three ways:

1. Automatic (loader data):
```javascript
const { events } = useLoaderData();
```

2. Manual fetch:
```javascript
const response = await fetch('/events');
const data = await response.json();
```

3. Form submission:
```javascript
<Form method="post">
  <input name="email" />
</Form>
```

## Frontend Implementation

### Page Structure

1. Home Page
File: app/routes/_index.jsx
Shows website introduction
Provides navigation links

2. Events List Page
File: app/routes/events._index.jsx
Shows all events
Supports search by name, location, description
Supports date filtering

Data flow:
User input → loader function queries database → returns JSON → React renders

3. Event Detail Page
File: app/routes/events.$id.jsx
Shows single event details
Shows Google map
Provides registration button

4. Registration Page
File: app/routes/events.$id.register.jsx
User selects competition category
User selects team (optional)
Submits registration request

5. Admin Panel
File: app/routes/admin._index.jsx
View pending registrations
Approve or reject registrations
Process GDPR data requests

## GDPR Compliance

### Three Core GDPR Rights

1. Right to Data Portability (Export)

Implementation: app/routes/privacy._index.jsx

```javascript
if (intent === "exportData") {
  await prisma.dataRequest.create({
    data: {
      userId,
      requestType: "export",
      status: "pending"
    }
  });
  
  await sendDataRequestConfirmation(user.email, "Data Export");
  
  return json({
    success: true,
    message: "Data export request submitted. You will receive your data within 30 days."
  });
}
```

User operation:
1. Visit /privacy page
2. Click "Request Data Export" button
3. System creates request record
4. Admin processes and exports all user data in JSON format

Data includes:
User basic information
User profile
All registration records
Team memberships
Consent records

2. Right to Rectification (Correct)

Implementation: app/routes/privacy._index.jsx

```javascript
if (intent === "correctData") {
  const reason = formData.get("reason");
  
  await prisma.dataRequest.create({
    data: {
      userId,
      requestType: "correction",
      status: "pending",
      reason
    }
  });
  
  return json({
    success: true,
    message: "Data correction request submitted."
  });
}
```

User operation:
1. Visit /privacy page
2. Fill in what needs to be corrected
3. Submit request
4. Admin reviews and corrects

3. Right to Erasure (Delete)

Implementation: app/routes/privacy._index.jsx

```javascript
if (intent === "deleteAccount") {
  const confirmation = formData.get("confirmation");
  
  if (confirmation !== "DELETE") {
    return json({ error: 'Please type "DELETE" to confirm' }, { status: 400 });
  }
  
  await prisma.dataRequest.create({
    data: {
      userId,
      requestType: "deletion",
      status: "pending"
    }
  });
  
  const session = await storage.getSession(request.headers.get("Cookie"));
  return redirect("/", {
    headers: { "Set-Cookie": await storage.destroySession(session) }
  });
}
```

Note: Actual deletion is done by admin in backend because:
Need to verify identity
May need to keep some data for legal compliance
Cascade delete related data (registrations, team members, etc.)

Database cascade delete configuration:
```prisma
model UserProfile {
  user  User  @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### Consent Management

Implementation: ConsentLog model in prisma/schema.prisma

Records:
Consent type (e.g., "privacy_policy")
Agreed (true/false)
IP address (for audit)
Browser information
Timestamp

Purpose:
Prove user consented to data processing
Meet GDPR "explicit consent" requirement
Provide audit trail

## Security and Authentication

### Password Security

Implementation: app/routes/auth.jsx

Using bcrypt encryption:
```javascript
import bcrypt from "bcryptjs";

const passwordHash = await bcrypt.hash(password, 10);

const isValid = await bcrypt.compare(password, user.passwordHash);
```

Why secure:
Passwords not stored in plain text
Uses salt to prevent rainbow table attacks
bcrypt is industry standard

### Session Management

Implementation: app/utils/session.server.js

Using Cookie to store session:
```javascript
export const storage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  }
});
```

Session content:
userId - User ID
userEmail - User email
userRole - User role (participant/admin)

### Permission Control

Implementation: app/utils/session.server.js

Check user login:
```javascript
export async function requireUser(request) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  
  if (!userId) {
    throw redirect("/auth/login");
  }
  
  return userId;
}
```

Check admin permission:
```javascript
export async function requireAdmin(request) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  if (session.get("admin") === true) return;
  throw redirect("/admin?msg=login");
}
```

Usage example:
```javascript
export async function loader({ request }) {
  const userId = await requireUser(request);
}
```

## Docker Deployment

### Dockerfile

File: Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build command:
```bash
docker build -t highland-games .
```

Run command:
```bash
docker run -p 3000:3000 highland-games
```

### Docker Compose

File: docker-compose.yml

```yaml
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      DATABASE_URL: "file:./dev.db"
      SESSION_SECRET: "your-secret-key"
```

Run command:
```bash
docker-compose up
```

Advantages:
One command to start all services
Centralized environment variables
Easy to extend (add database, Redis, etc.)

## Project Structure

```
highland-games-starter/
├── app/
│   ├── routes/
│   │   ├── _index.jsx
│   │   ├── events._index.jsx
│   │   ├── events.$id.jsx
│   │   ├── auth.jsx
│   │   ├── admin._index.jsx
│   │   └── privacy._index.jsx
│   ├── styles/
│   ├── utils/
│   │   ├── db.server.js
│   │   ├── session.server.js
│   │   └── email.server.js
│   ├── config/
│   ├── entry.client.jsx
│   └── entry.server.jsx
├── prisma/
│   ├── schema.prisma
│   ├── seed.js
│   └── dev.db
├── public/
│   └── images/
├── Dockerfile
├── docker-compose.yml
├── server.js
├── package.json
└── README.md
```

## Project Features

### Core Functionality

Code and Deployment
GitHub repository: Link provided in README.md
Database interaction: All pages interact with Prisma database
Online accessible: Supports Docker deployment to cloud server

API and Data
Database table design: 8 tables with clear relationships (see prisma/schema.prisma)
API access method: Uses Remix loader/action (REST style)
SQL queries: Executes SQL queries through Prisma ORM

Frontend/Client
React: All pages are React components
JSON consumption: Uses useLoaderData() to automatically get JSON data

Server
Node.js: Uses Node.js 18+
Remix framework: Full-stack SSR framework

Database
Relational database: Uses SQLite (development) / PostgreSQL (production)
Schema explanation: prisma/schema.prisma clearly defines all table structures
Query examples: All route files have database queries

Containerization
Docker support: Provides Dockerfile and docker-compose.yml

GDPR and Security
Consent mechanism: ConsentLog table records all consents
Data export: /privacy page supports data export requests
Data correction: Supports data correction requests
Data deletion: Supports account deletion requests
Authentication: Uses bcrypt to encrypt passwords, Cookie session management

### Technology Choices

Technology Stack

Client: React 18 + Remix 2.9
Server: Node.js 18 + Remix (built-in server)
Database: Prisma ORM + SQLite/PostgreSQL
Storage: SQLite file (development) or PostgreSQL (production)
Plugins/Integration: bcryptjs (password encryption)

Why Remix instead of Next.js?
  Remix data loading is simpler (loader function)
  Better form handling (action function)
  Less client-side JavaScript

Why SQLite instead of MongoDB?
  Relational data is more suitable (user-registration-event relationships)
  SQLite is simple for development, no need to install database server
  Prisma ORM provides type safety

Hosting Options

Hosting service options:
  Vercel (recommended, supports Remix)
  Railway (supports Docker)
  DigitalOcean (supports Docker)
  AWS/GCP (enterprise level)

Cost calculation:
  Vercel free tier: suitable for small projects
  Railway: $5/month starting
  DigitalOcean Droplet: $6/month starting

Scalability strategy:
  Use PostgreSQL instead of SQLite (production)
  Add Redis cache (optional)
  Use CDN to accelerate static resources

Tracking and statistics:
  Can use Vercel Analytics (if deployed to Vercel)
  Can integrate Google Analytics (requires user consent, GDPR compliant)
  Server logs record access

### Implementation Details

Database read/write:
  Read: loader function in app/routes/events._index.jsx
  Write: action function in app/routes/auth.jsx

Key processes:
  User registration: app/routes/auth.jsx
  Event registration: app/routes/events.$id.register.jsx
  Admin approval: app/routes/admin._index.jsx
  GDPR data request: app/routes/privacy._index.jsx

Diagrams:
  ER diagram: Based on prisma/schema.prisma
  Architecture diagram: Frontend (React) → Backend (Remix) → Database (Prisma)
  API flow diagram: loader/action data flow

## Project Overview

This project implements a Highland Games event management system with the following features:

1. Technology stack: React + Remix + Node.js + Prisma + SQLite
2. Database interaction: All features interact with database
3. API design: Uses Remix loader/action (REST style)
4. GDPR compliance: Complete implementation of data export, correction, deletion
5. Security: Password encryption, session management, permission control
6. Containerization: Provides Docker support
7. GitHub: Code uploaded to GitHub
