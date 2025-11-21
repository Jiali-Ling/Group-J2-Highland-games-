# 🏴󠁧󠁢󠁳󠁣󠁴󠁿 Paisley Highland Games - Event Management System

A comprehensive Highland Games event management system featuring user registration, team management, event sign-ups, admin approval workflows, and GDPR compliance.

**GitHub**: https://github.com/Jiali-Ling/Group-J2-Highland-games-

---

## ✨ Core Features

- **User Management**: Registration, login, profile management with medical info and emergency contacts
- **Team Features**: Create teams with invite codes, join teams, team-based event participation
- **Event Registration**: Browse events, register individually or as team, multi-step approval workflow
- **Admin Dashboard**: Approve/reject registrations with reasons, manage events and announcements
- **GDPR Compliance**: Data export (DSAR), data correction, account deletion, consent audit logs
- **Notification System**: Email notifications structure ready for integration

---

## 🛠️ Technology Stack

- **Frontend**: React 18.2.0 + Remix 2.9.2 (SSR)
- **Backend**: Node.js 18+ with Remix Server
- **Database**: SQLite (dev) / PostgreSQL (prod) with Prisma ORM 5.20.0
- **Auth**: bcryptjs password hashing + session-based authentication
- **Deployment**: Docker + Render PaaS

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
Copy `.env.example` to `.env` and configure:
```env
DATABASE_URL="file:./dev.db"
SESSION_SECRET="your-secret-key"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="admin123"
```

### 3. Initialize Database
```bash
npm run setup
```
Or use batch script (Windows):
```bash
.\reset-database.bat
```

### 4. Start Development Server
```bash
npm run dev
```
Or use quick start (Windows):
```bash
.\quick-start.bat
```

### 5. Access Application
Open browser: **http://localhost:3000**

---

## 🧪 Test Accounts

| Role | Email | Password |
|------|-------|----------|
| User | duncan@highlands.com | password123 |
| Admin | admin@example.com | admin123 |
| User | john@example.com | password123 |

**Test Team**: Highland Warriors (Invite Code: `TEST1234`)

---

## 📁 Project Structure

```
├── app/
│   ├── routes/              # Page routes
│   │   ├── _index.jsx      # Homepage
│   │   ├── auth.jsx        # Login/Registration
│   │   ├── profile._index.jsx  # User profile
│   │   ├── teams._index.jsx    # Team management
│   │   ├── events._index.jsx   # Event listings
│   │   ├── events.$id.register.jsx  # Event registration
│   │   ├── admin._index.jsx    # Admin dashboard
│   │   └── privacy._index.jsx  # GDPR privacy center
│   ├── styles/             # CSS files
│   └── utils/              # Server utilities
│       ├── db.server.js    # Database client
│       ├── session.server.js  # Session management
│       └── email.server.js    # Email service
├── prisma/
│   ├── schema.prisma       # Database schema
│   ├── seed.js            # Test data
│   └── migrations/        # Migration history
├── public/                # Static assets
├── .env.example          # Environment template
├── package.json          # Dependencies
├── Dockerfile            # Docker config
├── docker-compose.yml    # Docker Compose
└── README.md             # This file
```

---

## 🗄️ Database Schema

10 related tables:

1. **User** - Authentication
2. **UserProfile** - Personal information (1:1)
3. **Team** - Team data
4. **TeamMember** - Membership (N:N)
5. **Event** - Highland Games events
6. **Registration** - Event signups with approval status
7. **Winner** - Historical results
8. **Announcement** - Event communications
9. **ConsentLog** - GDPR consent audit
10. **DataRequest** - GDPR data rights requests

---

## 🔧 Available Scripts

```bash
npm run dev          # Start dev server with hot reload
npm run build        # Build for production
npm start            # Start production server
npm run setup        # Initialize database and seed data
npm run seed         # Seed test data only

npx prisma studio    # Open database GUI
npx prisma generate  # Generate Prisma Client
npx prisma migrate dev  # Create migration
```

**Windows Batch Scripts:**
- `quick-start.bat` - Quick start dev server
- `reset-database.bat` - Reset database
- `clean-build.bat` - Clean rebuild

---

## 🐳 Docker Deployment

```bash
# Build and run
docker build -t highland-games .
docker run -p 3000:3000 highland-games

# Or use Docker Compose
docker-compose up -d
```

---

## 🌐 Production Deployment (Render)

See `RENDER_DEPLOYMENT.md` for detailed instructions.

**Quick steps:**
1. Create PostgreSQL database on Render
2. Create Web Service from GitHub repo
3. Set environment variables (DATABASE_URL, SESSION_SECRET, NODE_ENV)
4. Configure build command: `npm install && npx prisma generate && npx prisma migrate deploy && npm run build`
5. Configure start command: `npm start`
6. Deploy automatically on git push

---

## 📚 Documentation

- `API_DOCUMENTATION.md` - Complete REST API reference
- `RENDER_DEPLOYMENT.md` - Deployment guide
- `GITHUB_SETUP.md` - Git setup instructions
- `COURSE_REQUIREMENTS_COMPLIANCE.md` - Requirements checklist

---

## 🔒 Security Features

- Password hashing with bcrypt
- Session-based authentication (HTTP-only cookies)
- CSRF protection (built-in Remix)
- SQL injection prevention (Prisma parameterized queries)
- Server-side input validation
- Environment variable configuration

---

## 🎯 Key Workflows

### User Registration
Register → Complete profile → Add medical info → Add emergency contact

### Team Management
Create team (get invite code) → Share code → Others join with code

### Event Registration
Browse events → View details → Register (individual/team) → Accept consents → Submit → Await approval

### Admin Approval
View pending registrations → Review details → Approve or Reject (with reason) → User notified

### GDPR Rights
Export data (DSAR) → Correct data → Delete account → View consent logs

---

## 🚨 Troubleshooting

**Database locked**: Run `.\reset-database.bat`

**Port in use**: 
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Prisma not generated**: `npx prisma generate`

**Build failures**: Run `.\clean-build.bat`

---

## 📊 Project Highlights

- ✅ Complete end-to-end user workflows
- ✅ Full GDPR compliance (DSAR, correction, deletion, consent logs)
- ✅ 10-table normalized database with proper relationships
- ✅ Modern React SSR with Remix framework
- ✅ Type-safe database queries with Prisma
- ✅ Production-ready with Docker containerization

---

## 📝 License

MIT License

---

**Version**: 1.0.0  
**Last Updated**: November 2025
