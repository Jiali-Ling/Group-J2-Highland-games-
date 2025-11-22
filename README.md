# Highland Games Event Management

A web application for managing Highland Games events with user registration, team management, event sign-ups, and admin approval.

## Features

- User registration and login
- User profiles with personal and medical information
- Team creation and management with invite codes
- Event browsing and registration
- Admin dashboard for approving/rejecting registrations
- GDPR data export, correction, and deletion

## Technology Stack

- React 18 + Remix 2.9
- Node.js 18+
- Prisma ORM with SQLite (dev) / PostgreSQL (prod)
- bcryptjs for password hashing
- Docker support

## Quick Start

### Install and Run

Double-click `start.bat` or run:

```bash
npm install
npm run setup
npm run dev
```

Open http://localhost:3000

### Test Accounts

User (Owner): B01812585@student.uws.ac.uk / password123  
Team Members: jiali.ling@example.com, yuhan.shi@example.com / password123  
Admin: admin@example.com / admin123  
Team Code: TEST1234

Note: Use the student account (B01812585@student.uws.ac.uk) as the primary test account for registration and team management.

## Database Reset

Double-click `reset.bat` or run:

```bash
npm run setup
```

## Docker

```bash
docker build -t highland-games .
docker run -p 3000:3000 highland-games
```

Or use docker-compose:

```bash
docker-compose up
```

## Project Structure

```
app/routes/          - Page routes
app/utils/           - Server utilities  
prisma/              - Database schema and seed
public/              - Static files
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm start` - Start production server
- `npm run setup` - Initialize database

## Customization

Change Colors:  
Edit `app/styles/global.css`

Change Text Content:  
Edit `app/config/site-content.js`

## GitHub

https://github.com/Jiali-Ling/Group-J2-Highland-games-

## License

MIT
