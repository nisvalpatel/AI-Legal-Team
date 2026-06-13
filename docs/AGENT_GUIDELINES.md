# AI Agent Guidelines for AI Legal Team Project

This document provides context and guidelines for AI assistants working on this project.

## Project Overview

**Name:** AI Legal Team - Agentic Legal Analysis System

**Purpose:** An AI-powered legal case analysis system that uses multiple specialized agents to analyze legal documents, extract evidence, build timelines, identify contradictions, research legal authorities, and generate strategic memos.

**Architecture:** Multi-agent system orchestrated by LangGraph, with 5 specialized agents working collaboratively.

## Core Principles

1. **Agent Independence First:** Build and test each agent independently before orchestration
2. **Phased Implementation:** Follow the roadmap in `docs/implementation-roadmap.md`
3. **Clean Code:** No attribution comments, keep code professional and minimal
4. **Documentation:** Maintain clear, technical documentation without fluff

## Project Structure

```
AI-Legal-Team/
├── backend/              # Python backend (FastAPI, LangGraph)
├── frontend/             # React frontend (Vite)
├── infrastructure/       # Docker, Kubernetes configs
├── database/             # Migrations, seeds
├── scripts/              # Utility scripts
├── data/                 # Sample documents, legal corpus
└── docs/                 # Project documentation
```

## The Five Agents

1. **Evidence Agent** - Extracts entities, facts, and summaries from case documents
2. **Timeline Agent** - Builds chronological event sequences, identifies gaps
3. **Contradiction Agent** - Identifies inconsistencies across sources
4. **Research Agent** - Searches legal databases for relevant authorities
5. **Strategy Agent** - Synthesizes all outputs into strategic analysis memo

## Technology Stack

- **Backend:** Python 3.11+, FastAPI, LangGraph, SQLAlchemy, Pydantic
- **Frontend:** React 18+, Vite, TypeScript
- **Database:** PostgreSQL with pgvector extension
- **Search:** ElasticSearch
- **Storage:** MinIO (S3-compatible)
- **AI/ML:** OpenAI API, sentence-transformers
- **Orchestration:** Kubernetes
- **Testing:** pytest, React Testing Library

## Development Guidelines

### Code Style

- **Python:** Follow PEP 8, use type hints, docstrings for public APIs
- **JavaScript/TypeScript:** Use ESLint, Prettier, functional components with hooks
- **No attribution comments:** Keep code clean and professional
- **Minimal comments:** Code should be self-documenting; comment only complex logic

### File Organization

- **Backend packages:** Each has `__init__.py` with brief docstring
- **Frontend components:** One component per file, named exports
- **Tests:** Mirror source structure in `tests/` directory
- **Configs:** Keep in root or `infrastructure/` directory

### Git Workflow

- **Commit messages:** Use conventional commits (feat:, fix:, chore:, docs:, etc.)
- **Branch strategy:** Feature branches, PR to main
- **Documentation:** Update relevant docs with code changes

### Testing Strategy

- **Unit tests:** Test each agent independently with mock data
- **Integration tests:** Test agent chains and workflows
- **E2E tests:** Test complete user flows
- **Coverage target:** >80% for critical paths

## Key Reference Documents

1. **`docs/agentic-legal-team-project-scope.md`** - Original project scope and requirements
2. **`docs/architecture-and-implementation-plan.md`** - Detailed architecture (1592 lines)
3. **`docs/implementation-roadmap.md`** - Phase-by-phase implementation plan
4. **`PROJECT_STRUCTURE.md`** - Directory structure overview

## Implementation Phases (Summary)

- **Phase 0:** Infrastructure setup (Docker, DB, FastAPI skeleton)
- **Phase 1:** Document ingestion pipeline
- **Phase 2:** Retrieval system (semantic + keyword search)
- **Phase 3:** Agent foundation (base classes, shared state)
- **Phase 4-8:** Individual agent implementation (one per phase)
- **Phase 9:** LangGraph orchestration
- **Phase 10:** Human review integration
- **Phase 11:** MCP tool layer
- **Phase 12:** Frontend polish
- **Phase 13:** Testing & QA
- **Phase 14:** Kubernetes deployment

## Common Tasks & Patterns

### Adding a New Agent

1. Create agent class in `backend/agents/`
2. Implement `process()` method with clear input/output
3. Write unit tests with mock data
4. Test independently before integration
5. Document agent's purpose and interface

### Adding an API Endpoint

1. Create route in `backend/api/routes/`
2. Define Pydantic schemas in `backend/schemas/`
3. Implement business logic in `backend/services/`
4. Add tests for endpoint
5. Update API documentation

### Adding a Frontend Component

1. Create component in `frontend/src/components/`
2. Use TypeScript for type safety
3. Implement with React hooks
4. Add component tests
5. Update Storybook if applicable

### Database Changes

1. Create Alembic migration in `database/migrations/`
2. Update SQLAlchemy models in `backend/models/`
3. Update Pydantic schemas if needed
4. Test migration up and down
5. Document schema changes

## Decision-Making Guidelines

### When to Ask for Clarification

- Ambiguous requirements or conflicting information
- Major architectural decisions
- Breaking changes to existing functionality
- Security or performance concerns

### When to Proceed Independently

- Following established patterns in the codebase
- Implementing well-defined features from roadmap
- Bug fixes with clear root cause
- Refactoring for code quality

### Code Quality Standards

- **Readability:** Code should be clear and self-explanatory
- **Maintainability:** Follow DRY, SOLID principles
- **Performance:** Optimize critical paths, profile before optimizing
- **Security:** Validate inputs, sanitize outputs, use parameterized queries
- **Testing:** Write tests for new features and bug fixes

## Common Pitfalls to Avoid

1. **Don't add attribution comments** - Keep code professional
2. **Don't skip testing** - Test agents independently first
3. **Don't over-engineer** - Start simple, iterate based on needs
4. **Don't ignore the roadmap** - Follow phased approach
5. **Don't mix concerns** - Keep agents focused on single responsibility

## Quick Reference Commands

```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
uvicorn api.main:app --reload

# Frontend
cd frontend
npm install
npm run dev

# Database
alembic upgrade head
alembic revision --autogenerate -m "description"

# Tests
pytest backend/tests/
npm test  # frontend tests

# Docker
docker-compose up -d
docker-compose down
```

## Success Metrics

- **Agent accuracy:** >80% for each agent's primary task
- **Response time:** <500ms for search, <2min per agent
- **Code coverage:** >80% for critical paths
- **User satisfaction:** Memos approved without major revisions >80%

## Getting Help

- Review architecture docs for design decisions
- Check implementation roadmap for current phase
- Refer to existing code for patterns
- Ask for clarification on ambiguous requirements

---

**Last Updated:** 2026-06-13

**Note:** This is a living document. Update as the project evolves.