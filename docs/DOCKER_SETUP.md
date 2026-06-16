# Docker Setup Guide

This guide explains how to set up and run the AI Legal Team application using Docker.

## Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+
- At least 4GB of available RAM
- OpenAI API key

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AI-Legal-Team
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your-api-key-here
   SECRET_KEY=your-secret-key-here
   ```

3. **Start all services**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs
   - MinIO Console: http://localhost:9001
   - Elasticsearch: http://localhost:9200

## Services Overview

### Backend (FastAPI)
- **Port:** 8000
- **Technology:** Python 3.11, FastAPI, LangGraph
- **Purpose:** API server, agent orchestration, business logic

### Frontend (React)
- **Port:** 3000 (production), 5173 (development)
- **Technology:** React 18, Vite, TailwindCSS
- **Purpose:** User interface

### PostgreSQL with pgvector
- **Port:** 5432
- **Purpose:** Primary database with vector search capabilities
- **Default credentials:** postgres/postgres

### Elasticsearch
- **Port:** 9200, 9300
- **Purpose:** Full-text search for legal documents
- **Memory:** 512MB heap size

### MinIO
- **Port:** 9000 (API), 9001 (Console)
- **Purpose:** S3-compatible object storage for documents
- **Default credentials:** minioadmin/minioadmin

## Development Workflow

### Running in Development Mode

For frontend development with hot reload:
```bash
docker-compose --profile dev up frontend-dev
```

This starts the frontend with Vite's development server on port 5173.

### Backend Development

The backend container mounts the local `./backend` directory, so changes are reflected immediately with auto-reload enabled.

### Viewing Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Stopping Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: deletes all data)
docker-compose down -v
```

## Testing

### Backend Tests

Run tests inside the backend container:
```bash
docker-compose exec backend pytest
```

Run tests with coverage:
```bash
docker-compose exec backend pytest --cov=. --cov-report=html
```

### Frontend Tests

Run tests inside the frontend container:
```bash
docker-compose exec frontend-dev npm test
```

Run tests with UI:
```bash
docker-compose exec frontend-dev npm run test:ui
```

## Building for Production

### Build all images
```bash
docker-compose build
```

### Build specific service
```bash
docker-compose build backend
docker-compose build frontend
```

## Troubleshooting

### Services won't start

1. Check if ports are already in use:
   ```bash
   lsof -i :8000  # Backend
   lsof -i :3000  # Frontend
   lsof -i :5432  # PostgreSQL
   ```

2. Check Docker logs:
   ```bash
   docker-compose logs
   ```

### Database connection issues

1. Ensure PostgreSQL is healthy:
   ```bash
   docker-compose ps postgres
   ```

2. Check database logs:
   ```bash
   docker-compose logs postgres
   ```

3. Verify connection from backend:
   ```bash
   docker-compose exec backend python -c "from sqlalchemy import create_engine; engine = create_engine('postgresql://postgres:postgres@postgres:5432/ai_legal_team'); print('Connected!')"
   ```

### Elasticsearch memory issues

If Elasticsearch fails to start, increase Docker's memory limit to at least 4GB in Docker Desktop settings.

### MinIO bucket creation

MinIO buckets are created automatically. If you need to create one manually:
```bash
docker-compose exec minio mc mb /data/legal-documents
```

## Data Persistence

Data is persisted in Docker volumes:
- `postgres_data`: Database data
- `elasticsearch_data`: Search indices
- `minio_data`: Uploaded documents

To backup data:
```bash
docker-compose exec postgres pg_dump -U postgres ai_legal_team > backup.sql
```

To restore data:
```bash
docker-compose exec -T postgres psql -U postgres ai_legal_team < backup.sql
```

## Environment Variables

### Backend Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql+asyncpg://postgres:postgres@postgres:5432/ai_legal_team` |
| `ELASTICSEARCH_URL` | Elasticsearch endpoint | `http://elasticsearch:9200` |
| `MINIO_ENDPOINT` | MinIO endpoint | `minio:9000` |
| `MINIO_ACCESS_KEY` | MinIO access key | `minioadmin` |
| `MINIO_SECRET_KEY` | MinIO secret key | `minioadmin` |
| `OPENAI_API_KEY` | OpenAI API key | Required |
| `SECRET_KEY` | JWT secret key | Required |
| `DEBUG` | Enable debug mode | `true` |
| `LOG_LEVEL` | Logging level | `INFO` |

### Frontend Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:8000` |

## Network Architecture

All services communicate through the `ai-legal-network` bridge network:

```
┌─────────────┐     ┌──────────────┐
│   Frontend  │────▶│   Backend    │
│   (React)   │     │  (FastAPI)   │
└─────────────┘     └──────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
   ┌──────────┐     ┌──────────┐      ┌──────────┐
   │PostgreSQL│     │Elastic-  │      │  MinIO   │
   │+pgvector │     │ search   │      │  (S3)    │
   └──────────┘     └──────────┘      └──────────┘
```

## Health Checks

All services include health checks:
- **PostgreSQL:** `pg_isready`
- **Elasticsearch:** Cluster health endpoint
- **MinIO:** Health endpoint
- **Backend:** `/health` endpoint

Check service health:
```bash
docker-compose ps
```

## Security Considerations

1. **Change default passwords** in production
2. **Use secrets management** for sensitive data
3. **Enable HTTPS** with reverse proxy (nginx/traefik)
4. **Restrict network access** to necessary ports only
5. **Regular security updates** for base images

## Next Steps

- Review [`TESTING_GUIDE.md`](./TESTING_GUIDE.md) for testing strategies
- See [`architecture-and-implementation-plan.md`](./architecture-and-implementation-plan.md) for system architecture
- Check [`implementation-roadmap.md`](./implementation-roadmap.md) for development phases