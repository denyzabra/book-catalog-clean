# Book Catalog Application

A full-stack book catalog application with FastAPI backend and Next.js frontend, containerized with Docker.

## Features

- **Backend**: FastAPI with SQLAlchemy ORM
- **Frontend**: Next.js with TypeScript
- **Database**: SQLite (persistent storage)
- **Containerization**: Docker and Docker Compose
- **CRUD Operations**: Create, Read, Update, Delete books
- **Responsive UI**: Modern, mobile-friendly interface

## Prerequisites

- Docker (version 20.10 or later)
- Docker Compose (version 2.0 or later)

## Quick Start

### Production Environment

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd book-catalog
   ```

2. **Build and start the application:**
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

### Development Environment

1. **Start development environment:**
   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

2. **Access the application:**
   - Frontend (with hot reload): http://localhost:3000
   - Backend (with hot reload): http://localhost:8000

## Docker Commands

### Production

```bash
# Build and start all services
docker-compose up --build

# Start services in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs

# Rebuild specific service
docker-compose build backend
docker-compose build frontend
```

### Development

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up --build

# Stop development environment
docker-compose -f docker-compose.dev.yml down

# View development logs
docker-compose -f docker-compose.dev.yml logs
```

### Useful Commands

```bash
# Remove all containers and volumes (clean slate)
docker-compose down -v

# View running containers
docker ps

# Execute command in running container
docker exec -it book-catalog-backend bash
docker exec -it book-catalog-frontend sh

# View application logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

## Project Structure

```
book-catalog/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py         # FastAPI application
│   │   ├── models.py       # Database models
│   │   ├── schemas.py      # Pydantic schemas
│   │   ├── crud.py         # Database operations
│   │   └── database.py     # Database configuration
│   ├── requirements.txt    # Python dependencies
│   ├── Dockerfile         # Production Docker image
│   └── .dockerignore
├── frontend/               # Next.js frontend
│   ├── app/
│   │   ├── page.tsx       # Home page
│   │   ├── layout.tsx     # Root layout
│   │   ├── globals.css    # Global styles
│   │   ├── add/
│   │   │   └── page.tsx   # Add book page
│   │   └── edit/[id]/
│   │       └── page.tsx   # Edit book page
│   ├── lib/
│   │   └── api.ts         # API client
│   ├── package.json
│   ├── next.config.js
│   ├── Dockerfile         # Production Docker image
│   ├── Dockerfile.dev     # Development Docker image
│   └── .dockerignore
├── docker-compose.yml      # Production compose file
├── docker-compose.dev.yml  # Development compose file
└── README.md
```

## Environment Variables

### Backend Environment Variables

- `DATABASE_URL`: SQLite database path (default: `sqlite:///./data/books.db`)
- `PYTHONPATH`: Python module path (default: `/app`)

### Frontend Environment Variables

- `API_BASE_URL`: Backend API URL (default: `http://backend:8000`)
- `NODE_ENV`: Node environment (production/development)

## API Endpoints

### Books API

- **GET** `/books` - List all books
- **GET** `/books/{id}` - Get book by ID
- **POST** `/books` - Create new book
- **PUT** `/books/{id}` - Update book
- **DELETE** `/books/{id}` - Delete book

### Documentation

- **GET** `/docs` - Swagger UI documentation
- **GET** `/redoc` - ReDoc documentation

## Database

The application uses SQLite database with persistent storage through Docker volumes:

- **Volume**: `backend_data:/app/data`
- **Database file**: `books.db`

### Data Persistence

The database data persists across container restarts through named Docker volumes. To reset the database:

```bash
# Stop containers and remove volumes
docker-compose down -v

# Restart with fresh database
docker-compose up --build
```

## Health Checks

Both services include health checks:

- **Backend**: HTTP GET to `/`
- **Frontend**: HTTP GET to `/`

Health check configuration:
- Interval: 30 seconds
- Timeout: 10 seconds
- Retries: 3
- Start period: 40 seconds

## Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 3000 and 8000 are available
2. **Build failures**: Check Docker and Docker Compose versions
3. **Database issues**: Remove volumes and restart clean

### Logs

View service logs:
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend

# Follow logs in real-time
docker-compose logs -f
```

### Container Access

Access running containers:
```bash
# Backend container
docker exec -it book-catalog-backend bash

# Frontend container
docker exec -it book-catalog-frontend sh
```

## Development

### Local Development without Docker

#### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Making Changes

1. **Backend changes**: Modify files in `backend/app/`
2. **Frontend changes**: Modify files in `frontend/`
3. **Rebuild containers**: `docker-compose up --build`

## License

This project is licensed under the MIT License.