# Highland Games Application - Technology Documentation

## Technology Stack Analysis

### 1. Frontend / Client-Side Technology
- **React**: ✅ Implemented via Remix framework
  - Location: `app/routes/*.jsx` files
  - Features: Component-based UI architecture, React hooks (useLoaderData, useActionData, useSearchParams)
  - JSON data consumption: All data from server loaders consumed as JSON by React components
  - Interactive elements: Forms, navigation, search functionality

### 2. API & Data Layer
- **REST API**: ✅ Implemented via Remix loaders and actions
  - GET requests: `loader` functions return JSON data to components
  - POST requests: `action` functions handle form submissions and mutations
  - API endpoints: `/events`, `/events/:id`, `/events/:id/register`, `/admin`, `/winners`
  - Data format: JSON responses with proper HTTP status codes
- **Database**: SQLite with Prisma ORM
  - SQL database choice: Relational data with foreign keys for events/registrations
  - Query capabilities: Search filtering, date ranges, status management
  - Database file: `dev.db` (SQLite file-based database)

### 3. Full-Stack Framework
- **Remix**: ✅ Complete full-stack React framework
  - Client-side: React-based frontend with SSR (Server-Side Rendering)
  - Server-side: Node.js backend with file-system based routing
  - Database integration: Prisma ORM with SQLite database
  - Performance benefits: Automatic code splitting, prefetching, SSR optimization
  - Developer experience: Simplified data fetching, built-in form handling

### 4. Containerization & Development Environment
- **Docker**: ✅ Implemented for deployment consistency
  - `Dockerfile`: Multi-stage application containerization with Node.js 18 Alpine
  - `docker-compose.yml`: Multi-service orchestration configuration
  - Services: Web application container + SQLite database (file-based)
  - Benefits: Consistent development environment, portable deployments, isolated dependencies

### 5. Hosting & Operations (Analysis for Documentation)

#### Server/Platform Options:
1. **Single Server (Apache/Nginx)**
   - Pros: Simple setup, low cost
   - Cons: Limited scalability, single point of failure
   
2. **PaaS (Platform as a Service)**
   - Examples: Vercel, Railway, Render
   - Pros: Automatic scaling, managed infrastructure
   - Cons: Vendor lock-in, potentially higher costs
   
3. **Cloud Load Balanced**
   - Examples: AWS ELB + EC2, Google Cloud Load Balancer
   - Pros: High availability, horizontal scaling
   - Cons: Complex setup, higher operational overhead

#### Scalability Strategy:
- **Vertical scaling**: Upgrade server resources (CPU, RAM, storage)
- **Horizontal scaling**: Deploy multiple application instances behind load balancer
- **Database scaling**: SQLite limitations require migration to PostgreSQL/MySQL for high traffic
- **CDN integration**: Static asset caching and global content delivery
- **Caching layer**: Redis for session storage and frequent queries

#### Monitoring & Analytics Recommendations:
**Should Monitor:**
- Application performance metrics (response times, throughput)
- User engagement analytics (page views, conversion rates)
- System health indicators (CPU, memory, disk usage)
- Error tracking and exception monitoring
- Registration success rates and user journey analytics

**Privacy Considerations (Should NOT Track):**
- Personal identifiable information without explicit user consent
- Sensitive behavioral patterns or personal data
- Authentication credentials or password information
- Location data without user permission

## Docker Implementation Commands

### Development Environment:
```bash
# Build and start all services with Docker Compose
docker-compose up --build

# Run services in background (detached mode)
docker-compose up -d

# View application logs in real-time
docker-compose logs -f web

# Stop all running services
docker-compose down

# Rebuild without cache
docker-compose build --no-cache
```

### Production Deployment:
```bash
# Build optimized production image
docker build -t highland-games:latest .

# Run container with environment configuration
docker run -p 3000:3000 --env-file .env highland-games:latest

# Run with specific database path mounting
docker run -p 3000:3000 -v $(pwd)/data:/app/prisma highland-games:latest
```

## REST API Endpoints Documentation

### Events Management API
- `GET /events` - Retrieve all events with optional search and date filtering
  - Query parameters: `q` (search term), `from` (start date), `to` (end date)
  - Response: JSON array of event objects
- `GET /events/:id` - Get detailed information for specific event
  - Parameters: `id` (integer event ID)
  - Response: Single event JSON object
- `POST /events/:id/register` - Submit registration for specific event
  - Form data: name, email, category, consent agreement
  - Response: Redirect to event page with confirmation

### Administration API
- `POST /admin` - Admin authentication and registration management
  - Login action: email/password validation
  - Management actions: approve/reject registrations
- `GET /admin` - Admin dashboard (requires authentication)
  - Returns: Recent registrations and events list

### Winners Archive API
- `GET /winners` - Historical winners with year filtering
  - Query parameters: `year` (optional year filter)
  - Response: JSON array of winner records

### Data Format Examples

#### Event JSON Structure:
```json
{
  "id": 1,
  "name": "Paisley Highland Games 2025",
  "description": "Traditional Highland athletics featuring caber toss, stone put, and more.",
  "date": "2025-08-15T18:00:00.000Z",
  "location": "Paisley, Scotland"
}
```

#### Registration JSON Structure:
```json
{
  "id": 1,
  "name": "Duncan MacDougall",
  "email": "duncan@example.com",
  "category": "Caber Toss",
  "status": "pending",
  "eventId": 1
}
```

#### Winner JSON Structure:
```json
{
  "id": 1,
  "category": "Stone Put",
  "athlete": "Hamish Campbell",
  "position": 1,
  "year": 2024,
  "eventId": 1
}
```

## Technology Requirements Compliance Summary

### ✅ Required Technologies Successfully Implemented:

1. **React Framework**: Fully implemented via Remix with component-based architecture
2. **REST API**: Complete REST endpoints using Remix loaders/actions with JSON responses
3. **Database Integration**: SQLite database with Prisma ORM for data persistence
4. **Docker Containerization**: Production-ready Dockerfile and docker-compose configuration
5. **Full-Stack Architecture**: Remix provides complete frontend/backend integration

### 🔧 Technical Implementation Details:
- **Frontend**: React 18 with hooks, forms, routing, and responsive design
- **Backend**: Node.js with Remix framework providing server-side rendering
- **Database**: SQLite with relational schema for events, registrations, and winners
- **API**: RESTful endpoints with proper HTTP methods and JSON data exchange
- **Containerization**: Docker multi-stage builds with production optimization
- **Development Environment**: Complete development workflow with hot reloading

### 📊 Project Statistics:
- **Total Components**: 6 main routes with React components
- **API Endpoints**: 8 REST endpoints covering CRUD operations
- **Database Tables**: 4 models (Event, Registration, Winner, User)
- **Docker Services**: 2 services (web application, database)
- **Authentication**: Session-based admin authentication system