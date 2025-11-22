
Highland Games Event Management

Live Demo: Deploy URL will be added after deployment

A web application for managing Highland Games events with user registration, team management, event signups, and admin approval.

Features

User registration and login
User profiles with personal and medical information
Team creation and management with invite codes
Event browsing and registration
Admin dashboard for approving or rejecting registrations
GDPR data export, correction, and deletion

Technology Stack

React 18 and Remix 2.9
Node.js 18 or higher
Prisma ORM with SQLite (development) or PostgreSQL (production)
bcryptjs for password hashing
Docker support

Quick Start

Install and Run

Double-click start.bat or run:

npm install
npm run setup
npm run dev

Open http://localhost:3000

Test Accounts (Demo Only)

Note: These accounts are for educational demonstration purposes only.

User (Owner): demo+owner@example.com / DemoPassword123!
Team Members: demo+member1@example.com, demo+member2@example.com / DemoPassword123!
Admin: demo+admin@example.com / DemoPassword123!
Team Code: DEMO1234

Database Reset

Double-click reset.bat or run:

npm run setup

Docker

docker build -t highland-games .
docker run -p 3000:3000 highland-games

Or use docker-compose:

docker-compose up

Project Structure

app/routes/          Page routes
app/utils/           Server utilities
prisma/              Database schema and seed
public/              Static files
docs/                Documentation and diagrams

Available Scripts

npm run dev   Start development server
npm run build   Build for production
npm start   Start production server
npm run setup   Initialize database

Customization

Change Colors:
Edit app/styles/global.css

Change Text Content:
Edit app/config/site-content.js

Documentation

See docs/ for detailed documentation including:
Deployment Guide (docs/deployment.md)  How to deploy to Render or Railway
Process Flow Diagram (docs/flow.mmd)  Registration to GDPR workflow
Architecture Diagram (docs/architecture.mmd)  System architecture
Database ER Diagram (docs/er.mmd)  Entity relationships
Technology Comparison (docs/tech-comparison.md)  Remix vs React and Express, SQLite vs PostgreSQL

Hosting and Scaling

Platform Selection

This project is designed to deploy on Render or Railway for the following reasons:

Render:
Simple deployment process with GitHub integration
Free tier available for PostgreSQL databases
Automatic SSL certificates
Built-in environment variable management
Supports Node.js 18 and PostgreSQL

Railway:
Docker support for consistent deployments
PostgreSQL add-on available
Simple pricing model
Good for development and production

Deployment Configuration

Environment Variables Required:
DATABASE_URL  PostgreSQL connection string (for example, postgresql://user:password@host:5432/dbname)
SESSION_SECRET  Random secret string for session encryption
NODE_ENV  Set to production for production deployments

Build Command:
npm run build

Start Command:
npm start

Scaling Strategy

Single Instance (Initial):
One application instance
One PostgreSQL database
Suitable for low to medium traffic

Multi-Instance (Horizontal Scaling):
Multiple application instances behind a load balancer
Shared PostgreSQL database with connection pooling
Session storage moved to Redis or database-backed sessions
CDN for static assets

Database Connection Pooling:
Prisma automatically manages connection pooling
Configure DATABASE_URL with connection pool parameters
Monitor connection usage in production

Estimated Monthly Costs:
Render Free Tier: $0 (limited hours)
Render Starter: $7/month (unlimited hours, 512MB RAM)
Railway Hobby: $5/month (512MB RAM, $0.000463/GB-hour)
PostgreSQL (Render): Free tier available, or $7/month for production

Data and Privacy

Data Categories

This application collects and processes the following personal data:

User Account Data:
Email address
Encrypted password hash
Account creation timestamp

User Profile Data:
Full name
Date of birth (optional)
Phone number (optional)
Address (optional)
Emergency contact information (optional)
Medical information (optional, sensitive)

Event Registration Data:
Event selection
Competition category
Team association (if applicable)
Registration status and history

Consent Records:
Consent type (privacy policy, event registration, etc.)
Agreement status (true or false)
IP address (for audit purposes)
Browser user agent
Timestamp

Data Request Records:
Request type (export, correction, deletion)
Request status
Processing timestamps

Consent Management

All user consents are logged in the ConsentLog table with:
Consent type identifier
User agreement status
IP address and user agent for audit trail
Timestamp of consent

Consent records are created when users:
Register for events
Agree to privacy policy
Accept terms and conditions

Data Rights (GDPR)

Users can exercise their GDPR rights through the /privacy page:

Data Export:
Request a copy of all personal data
Data is exported in JSON format
Includes all user data, registrations, team memberships, and consent records

Data Correction:
Submit requests to correct inaccurate information
Admin reviews and processes correction requests

Data Deletion:
Request account and data deletion
Admin processes deletion requests
Cascade deletion removes all associated data

Tracking and Analytics

What We Track:
Page visits and navigation (server-side logs)
Application performance metrics
Error logs for debugging

What We Don't Track:
Personal browsing behavior outside this application
Third-party website visits
Cross-site tracking
Behavioral analytics without consent

Analytics Implementation:
Server logs record access patterns (IP addresses, timestamps, routes)
No client-side tracking scripts by default
Google Analytics can be integrated with explicit user consent (GDPR compliant)

GitHub

https://github.com/Jiali-Ling/Group-J2-Highland-games-

Assessment Checklist

Required Deliverables

GitHub repository link: https://github.com/Jiali-Ling/Group-J2-Highland-games-
Live deployment URL: To be added after deployment
Database read or write screenshots:
User registration flow
Event registration submission
Admin approval or rejection process
GDPR data export request
Account deletion request
Process flow diagram: docs/flow.mmd
Architecture diagram: docs/architecture.mmd
Database ER diagram: docs/er.mmd
Hosting platform justification and cost analysis: See Hosting and Scaling section above
Academic references: To be included in report
Student declaration and anonymization note: To be included in report

Student Declaration

This project is submitted for educational assessment purposes. All code, documentation, and diagrams are original work created for this assignment. Test accounts and sample data are for demonstration only and do not represent real users or events.

License

MIT
