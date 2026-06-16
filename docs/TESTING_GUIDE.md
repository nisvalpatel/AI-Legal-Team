# Testing Guide

This guide covers testing strategies and practices for the AI Legal Team application.

## Table of Contents

- [Testing Philosophy](#testing-philosophy)
- [Backend Testing](#backend-testing)
- [Frontend Testing](#frontend-testing)
- [Integration Testing](#integration-testing)
- [End-to-End Testing](#end-to-end-testing)
- [Testing in Docker](#testing-in-docker)
- [CI/CD Integration](#cicd-integration)

## Testing Philosophy

The AI Legal Team follows a comprehensive testing strategy:

1. **Unit Tests**: Test individual functions and classes in isolation
2. **Integration Tests**: Test interactions between components
3. **End-to-End Tests**: Test complete user workflows
4. **Agent Tests**: Test individual agent behaviors and outputs

### Test Coverage Goals

- **Backend**: Minimum 80% code coverage
- **Frontend**: Minimum 70% code coverage
- **Critical Paths**: 100% coverage for agent orchestration and legal analysis

## Backend Testing

### Setup

Backend tests use pytest with async support:

```bash
cd backend
pytest
```

### Test Structure

```
backend/tests/
├── conftest.py              # Shared fixtures
├── unit/                    # Unit tests
│   ├── test_agents.py
│   ├── test_services.py
│   └── test_utils.py
├── integration/             # Integration tests
│   ├── test_api.py
│   ├── test_database.py
│   └── test_orchestration.py
└── e2e/                     # End-to-end tests
    └── test_workflows.py
```

### Running Backend Tests

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=. --cov-report=html

# Run specific test file
pytest tests/unit/test_agents.py

# Run specific test
pytest tests/unit/test_agents.py::test_evidence_agent_extraction

# Run tests by marker
pytest -m unit          # Unit tests only
pytest -m integration   # Integration tests only
pytest -m slow          # Slow tests only
```

### Writing Backend Tests

#### Unit Test Example

```python
import pytest
from agents.evidence_agent import EvidenceAgent

@pytest.mark.unit
async def test_evidence_extraction():
    """Test evidence extraction from document."""
    agent = EvidenceAgent()
    document = "Officer Smith arrived at 123 Main St on June 5, 2024."
    
    result = await agent.extract_evidence(document)
    
    assert result["person"] == "Officer Smith"
    assert result["location"] == "123 Main St"
    assert result["date"] == "2024-06-05"
```

#### Integration Test Example

```python
import pytest
from httpx import AsyncClient

@pytest.mark.integration
async def test_create_case_endpoint(client: AsyncClient):
    """Test case creation API endpoint."""
    response = await client.post(
        "/api/cases",
        json={
            "title": "Test Case",
            "description": "Test description"
        }
    )
    
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Test Case"
    assert "id" in data
```

### Mocking External Services

```python
from unittest.mock import AsyncMock, patch

@pytest.mark.unit
async def test_openai_call():
    """Test OpenAI API call with mock."""
    with patch('openai.ChatCompletion.acreate') as mock_create:
        mock_create.return_value = AsyncMock(
            choices=[{"message": {"content": "Test response"}}]
        )
        
        result = await call_openai("Test prompt")
        assert result == "Test response"
```

## Frontend Testing

### Setup

Frontend tests use Vitest and React Testing Library:

```bash
cd frontend
npm test
```

### Test Structure

```
frontend/src/
├── test/
│   └── setup.js             # Test configuration
├── components/
│   ├── Button.jsx
│   └── Button.test.jsx      # Component tests
├── pages/
│   ├── Dashboard.jsx
│   └── Dashboard.test.jsx   # Page tests
└── services/
    ├── api.js
    └── api.test.js          # Service tests
```

### Running Frontend Tests

```bash
# Run all tests
npm test

# Run with UI
npm run test:ui

# Run with coverage
npm run test:coverage

# Watch mode
npm test -- --watch
```

### Writing Frontend Tests

#### Component Test Example

```javascript
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Button from './Button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

#### API Service Test Example

```javascript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getCases } from './api'

describe('API Service', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  it('fetches cases successfully', async () => {
    const mockCases = [{ id: 1, title: 'Test Case' }]
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCases,
    })

    const cases = await getCases()
    expect(cases).toEqual(mockCases)
    expect(fetch).toHaveBeenCalledWith('/api/cases')
  })
})
```

## Integration Testing

Integration tests verify that different parts of the system work together correctly.

### Database Integration Tests

```python
@pytest.mark.integration
async def test_case_document_relationship(db_session):
    """Test case and document relationship."""
    # Create case
    case = Case(title="Test Case")
    db_session.add(case)
    await db_session.commit()
    
    # Create document
    document = Document(
        case_id=case.id,
        title="Test Document",
        content="Test content"
    )
    db_session.add(document)
    await db_session.commit()
    
    # Verify relationship
    result = await db_session.execute(
        select(Document).where(Document.case_id == case.id)
    )
    docs = result.scalars().all()
    assert len(docs) == 1
    assert docs[0].title == "Test Document"
```

### Agent Orchestration Tests

```python
@pytest.mark.integration
async def test_evidence_to_timeline_flow():
    """Test evidence extraction flowing to timeline creation."""
    # Extract evidence
    evidence_agent = EvidenceAgent()
    evidence = await evidence_agent.extract("Document content...")
    
    # Create timeline
    timeline_agent = TimelineAgent()
    timeline = await timeline_agent.create_timeline(evidence)
    
    # Verify flow
    assert len(timeline.events) > 0
    assert timeline.events[0].source == evidence[0].id
```

## End-to-End Testing

E2E tests simulate real user workflows through the entire application.

### Example E2E Test

```python
@pytest.mark.e2e
async def test_complete_case_analysis_workflow(client: AsyncClient):
    """Test complete workflow from case creation to analysis."""
    # 1. Create case
    case_response = await client.post(
        "/api/cases",
        json={"title": "Test Case", "description": "Test"}
    )
    case_id = case_response.json()["id"]
    
    # 2. Upload document
    files = {"file": ("test.pdf", b"PDF content", "application/pdf")}
    doc_response = await client.post(
        f"/api/cases/{case_id}/documents",
        files=files
    )
    assert doc_response.status_code == 201
    
    # 3. Start analysis
    analysis_response = await client.post(
        f"/api/cases/{case_id}/analyze"
    )
    assert analysis_response.status_code == 202
    
    # 4. Check results
    results_response = await client.get(
        f"/api/cases/{case_id}/results"
    )
    results = results_response.json()
    assert "evidence" in results
    assert "timeline" in results
    assert "contradictions" in results
```

## Testing in Docker

### Run Backend Tests in Docker

```bash
# Run all tests
docker-compose exec backend pytest

# Run with coverage
docker-compose exec backend pytest --cov=. --cov-report=html

# Run specific test
docker-compose exec backend pytest tests/unit/test_agents.py
```

### Run Frontend Tests in Docker

```bash
# Run all tests
docker-compose exec frontend-dev npm test

# Run with coverage
docker-compose exec frontend-dev npm run test:coverage
```

### Run Tests During Build

Add to `docker-compose.yml`:

```yaml
services:
  backend-test:
    build:
      context: ./backend
      dockerfile: Dockerfile
    command: pytest --cov=. --cov-report=xml
    volumes:
      - ./backend:/app
    depends_on:
      - postgres
    profiles:
      - test
```

Run with:
```bash
docker-compose --profile test up backend-test
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  backend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - name: Install dependencies
        run: |
          cd backend
          pip install -r requirements.txt
      - name: Run tests
        run: |
          cd backend
          pytest --cov=. --cov-report=xml
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  frontend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      - name: Install dependencies
        run: |
          cd frontend
          npm ci
      - name: Run tests
        run: |
          cd frontend
          npm test -- --coverage
```

## Test Data Management

### Fixtures and Factories

```python
# conftest.py
@pytest.fixture
def sample_case():
    """Create a sample case for testing."""
    return {
        "title": "Sample Case",
        "description": "Sample description",
        "status": "active"
    }

@pytest.fixture
def sample_document():
    """Create a sample document for testing."""
    return {
        "title": "Police Report",
        "content": "Officer Smith arrived at the scene...",
        "document_type": "police_report"
    }
```

### Database Seeding for Tests

```python
@pytest.fixture
async def seed_test_data(db_session):
    """Seed database with test data."""
    cases = [
        Case(title=f"Case {i}", description=f"Description {i}")
        for i in range(5)
    ]
    db_session.add_all(cases)
    await db_session.commit()
    return cases
```

## Best Practices

1. **Isolation**: Each test should be independent
2. **Clarity**: Test names should describe what they test
3. **Speed**: Keep unit tests fast (<100ms each)
4. **Reliability**: Tests should not be flaky
5. **Coverage**: Aim for high coverage but focus on critical paths
6. **Mocking**: Mock external services to avoid dependencies
7. **Cleanup**: Always clean up test data and resources

## Debugging Tests

### Backend

```bash
# Run with verbose output
pytest -vv

# Run with print statements
pytest -s

# Run with debugger
pytest --pdb

# Run last failed tests
pytest --lf
```

### Frontend

```bash
# Run with debug output
npm test -- --reporter=verbose

# Run specific test file
npm test -- Button.test.jsx

# Update snapshots
npm test -- -u
```

## Performance Testing

### Load Testing with Locust

```python
from locust import HttpUser, task, between

class LegalTeamUser(HttpUser):
    wait_time = between(1, 3)
    
    @task
    def view_cases(self):
        self.client.get("/api/cases")
    
    @task(3)
    def view_case_detail(self):
        self.client.get("/api/cases/1")
```

Run with:
```bash
locust -f tests/performance/locustfile.py
```

## Next Steps

- Set up continuous integration with GitHub Actions
- Implement automated testing in deployment pipeline
- Add performance benchmarks for agent operations
- Create test data generators for realistic scenarios