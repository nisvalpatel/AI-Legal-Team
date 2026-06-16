# AI Legal Team

An agentic AI legal defense assistant that uses multi-agent workflows, retrieval-augmented generation, and public legal data to analyze case files, surface insights, and support defense research.

## 🎯 Overview

The AI Legal Team is a sophisticated multi-agent system designed to assist legal professionals with case analysis, evidence extraction, timeline construction, contradiction detection, and legal research. Built with modern AI technologies and a microservices architecture.

## ✨ Features

- **Multi-Agent System**: Five specialized agents working in orchestrated workflows
  - Evidence Agent: Extracts facts from case documents
  - Timeline Agent: Constructs chronological event sequences
  - Contradiction Agent: Identifies inconsistencies across documents
  - Research Agent: Searches legal databases for relevant precedents
  - Strategy Agent: Synthesizes insights and recommendations

- **Document Processing**: Upload and analyze legal documents (PDFs, DOCX)
- **Vector Search**: Semantic search using pgvector for relevant information retrieval
- **Full-Text Search**: Elasticsearch integration for fast document search
- **Object Storage**: MinIO for secure document storage
- **Modern UI**: React-based frontend with real-time updates

## 🏗️ Architecture

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

## 🚀 Quick Start

### Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+
- OpenAI API key
- At least 4GB RAM

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AI-Legal-Team
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your credentials:
   ```env
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
   - API Docs: http://localhost:8000/docs

## 📚 Documentation

- [Docker Setup Guide](docs/DOCKER_SETUP.md) - Complete Docker configuration and usage
- [Testing Guide](docs/TESTING_GUIDE.md) - Testing strategies and best practices
- [Architecture & Implementation Plan](docs/architecture-and-implementation-plan.md) - System design and architecture
- [Implementation Roadmap](docs/implementation-roadmap.md) - Development phases and milestones
- [Agent Guidelines](docs/AGENT_GUIDELINES.md) - Agent design principles

## 🛠️ Technology Stack

### Backend
- **Framework**: FastAPI (Python 3.11)
- **Orchestration**: LangGraph
- **Database**: PostgreSQL with pgvector
- **Search**: Elasticsearch
- **Storage**: MinIO (S3-compatible)
- **AI/ML**: OpenAI API, LangChain, sentence-transformers

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Orchestration**: Kubernetes (production)
- **Testing**: pytest (backend), Vitest (frontend)

## 🧪 Testing

### Backend Tests
```bash
# Run all tests
docker-compose exec backend pytest

# Run with coverage
docker-compose exec backend pytest --cov=. --cov-report=html
```

### Frontend Tests
```bash
# Run all tests
docker-compose exec frontend-dev npm test

# Run with UI
docker-compose exec frontend-dev npm run test:ui
```

See [Testing Guide](docs/TESTING_GUIDE.md) for comprehensive testing documentation.

## 📁 Project Structure

```
AI-Legal-Team/
├── backend/                 # Python backend
│   ├── agents/             # Agent implementations
│   ├── api/                # FastAPI routes
│   ├── orchestration/      # LangGraph workflows
│   ├── services/           # Business logic
│   ├── models/             # Database models
│   ├── schemas/            # Pydantic schemas
│   └── tests/              # Backend tests
├── frontend/               # React frontend
│   └── src/
│       ├── components/     # React components
│       ├── pages/          # Page components
│       ├── services/       # API clients
│       └── hooks/          # Custom hooks
├── database/               # Database files
│   ├── migrations/         # Alembic migrations
│   └── init.sql           # Initial schema
├── docs/                   # Documentation
├── infrastructure/         # Deployment configs
│   ├── docker/            # Docker files
│   └── kubernetes/        # K8s manifests
└── docker-compose.yml     # Docker orchestration
```

## 🔧 Development

### Running in Development Mode

For frontend development with hot reload:
```bash
docker-compose --profile dev up frontend-dev
```

The backend automatically reloads on code changes.

### Viewing Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
```

### Stopping Services
```bash
docker-compose down
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [LangChain](https://langchain.com/) and [LangGraph](https://langchain-ai.github.io/langgraph/)
- Powered by [OpenAI](https://openai.com/)
- UI components inspired by modern design systems

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Note**: This is a development tool for legal professionals. Always verify AI-generated insights with qualified legal counsel.
