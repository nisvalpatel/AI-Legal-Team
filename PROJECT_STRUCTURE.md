# AI Legal Team - Project Structure

This document outlines the directory structure for the Agentic Legal Team application.

## Directory Overview

```
AI-Legal-Team/
├── backend/                    # Python backend services
│   ├── api/                   # FastAPI application
│   │   └── routes/           # API route handlers
│   ├── agents/               # Individual agent implementations
│   ├── orchestration/        # LangGraph workflow orchestration
│   ├── services/             # Business logic services
│   ├── models/               # SQLAlchemy database models
│   ├── schemas/              # Pydantic schemas for validation
│   ├── mcp_servers/          # Model Context Protocol servers
│   ├── utils/                # Utility functions
│   └── tests/                # Backend tests
│
├── frontend/                  # React frontend application
│   └── src/
│       ├── components/       # Reusable React components
│       ├── pages/            # Page-level components
│       ├── services/         # API client services
│       ├── hooks/            # Custom React hooks
│       └── utils/            # Frontend utilities
│
├── infrastructure/            # Deployment configurations
│   ├── docker/               # Docker configurations
│   └── kubernetes/           # Kubernetes manifests
│
├── database/                  # Database-related files
│   ├── migrations/           # Alembic migration scripts
│   └── seeds/                # Seed data for development
│
├── scripts/                   # Utility scripts
│
├── data/                      # Data storage
│   ├── sample_documents/     # Sample legal documents for testing
│   └── legal_corpus/         # Legal reference materials
│
└── docs/                      # Project documentation
    ├── agentic-legal-team-project-scope.md
    ├── architecture-and-implementation-plan.md
    └── implementation-roadmap.md
```

## Key Components

### Backend Structure

- **api/**: FastAPI application with REST endpoints
- **agents/**: Five specialized agents (Evidence, Timeline, Contradiction, Research, Strategy)
- **orchestration/**: LangGraph-based workflow coordination
- **services/**: Document processing, search, embeddings
- **models/**: Database schema definitions
- **schemas/**: Request/response validation models
- **mcp_servers/**: Modular tool servers for agent capabilities

### Frontend Structure

- **components/**: Reusable UI components
- **pages/**: Main application views
- **services/**: API integration layer
- **hooks/**: Custom React hooks for state management
- **utils/**: Helper functions and utilities

### Infrastructure

- **docker/**: Container definitions for services
- **kubernetes/**: Production deployment manifests

### Database

- **migrations/**: Version-controlled schema changes
- **seeds/**: Development and test data

## Technology Stack

- **Backend**: Python, FastAPI, LangGraph, SQLAlchemy
- **Frontend**: React, Vite
- **Database**: PostgreSQL with pgvector
- **Search**: ElasticSearch
- **Storage**: MinIO (S3-compatible)
- **Orchestration**: Kubernetes
- **AI/ML**: OpenAI API, sentence-transformers

## Next Steps

Refer to [`docs/implementation-roadmap.md`](docs/implementation-roadmap.md) for the phased implementation plan.