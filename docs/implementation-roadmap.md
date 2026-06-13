# Agentic Legal Team - Implementation Roadmap

## Strategy: Build All 5 Agents Independently, Then Orchestrate

This approach allows you to:
- Test each agent in isolation
- Validate agent logic before integration
- Debug issues more easily
- Merge agents into orchestration once proven

---

## Phase 0: Infrastructure Setup (Week 1-2)

**Goal:** Development environment and core services

**Tasks:**
- [ ] Initialize Git repository with directory structure
- [ ] Docker Compose for PostgreSQL, ElasticSearch, MinIO
- [ ] Database schema and migrations (Alembic)
- [ ] FastAPI skeleton with health check endpoint
- [ ] React frontend with Vite
- [ ] Environment configuration

**Deliverables:**
- All services start with `docker-compose up`
- Database accessible with schema created
- FastAPI responds to requests
- React app renders

---

## Phase 1: Document Ingestion (Week 3-4)

**Goal:** Upload and process documents

**Tasks:**
- [ ] File upload API endpoint
- [ ] S3/MinIO storage integration
- [ ] OCR service (Tesseract wrapper)
- [ ] PDF/DOCX text extraction
- [ ] Document chunking service
- [ ] Embedding generation (sentence-transformers)
- [ ] pgvector storage
- [ ] ElasticSearch indexing
- [ ] Upload UI component

**Deliverables:**
- Upload PDF → text extracted → stored in DB
- Document chunks with embeddings in pgvector
- ElasticSearch index populated

---

## Phase 2: Retrieval System (Week 5-6)

**Goal:** Search uploaded documents and legal corpus

**Tasks:**
- [ ] Semantic search API (pgvector)
- [ ] Keyword search API (ElasticSearch)
- [ ] Hybrid search with rank fusion
- [ ] Search UI with filters
- [ ] Result display with source highlighting

**Deliverables:**
- Working semantic and keyword search
- Hybrid search combining both
- UI displays results with citations

---

## Phase 3: Agent Foundation (Week 7-8)

**Goal:** Base infrastructure for agents

**Tasks:**
- [ ] Shared state schema (Pydantic models)
- [ ] Agent base class/interface
- [ ] Tool calling framework
- [ ] Agent testing harness
- [ ] Mock data for agent testing

**Deliverables:**
- Agent base class ready
- Can test agents independently
- Mock data available

---

## Phase 4: Evidence Agent (Week 9-10)

**Goal:** Extract facts from documents

**Implementation:**
```python
# Standalone agent that can be tested independently
evidence_agent = EvidenceAgent()
result = evidence_agent.process(document_text)
# Returns: entities, facts, summary
```

**Tasks:**
- [ ] Agent prompt engineering
- [ ] Entity extraction (NER)
- [ ] Fact extraction logic
- [ ] Document summarization
- [ ] Structured output formatting
- [ ] Unit tests for agent
- [ ] Integration test with real documents

**Deliverables:**
- Working Evidence Agent
- Extracts people, places, dates, organizations
- Returns structured JSON output
- Passes all tests

**Test Independently:**
- Input: Sample police report
- Output: Entities and facts JSON
- Validate: Correct entities extracted

---

## Phase 5: Timeline Agent (Week 11-12)

**Goal:** Build chronological event sequences

**Implementation:**
```python
# Standalone agent
timeline_agent = TimelineAgent()
result = timeline_agent.process(facts_list)
# Returns: ordered events, gaps, conflicts
```

**Tasks:**
- [ ] Agent prompt engineering
- [ ] Date extraction and normalization
- [ ] Event ordering logic
- [ ] Gap identification
- [ ] Temporal conflict detection
- [ ] Unit tests
- [ ] Integration test with Evidence Agent output

**Deliverables:**
- Working Timeline Agent
- Orders events chronologically
- Identifies gaps and conflicts
- Passes all tests

**Test Independently:**
- Input: Facts from Evidence Agent
- Output: Ordered timeline JSON
- Validate: Correct chronological order

---

## Phase 6: Contradiction Agent (Week 13-14)

**Goal:** Identify inconsistencies across sources

**Implementation:**
```python
# Standalone agent
contradiction_agent = ContradictionAgent()
result = contradiction_agent.process(facts_list)
# Returns: contradictions with confidence scores
```

**Tasks:**
- [ ] Agent prompt engineering
- [ ] Claim comparison logic
- [ ] Inconsistency detection
- [ ] Confidence scoring
- [ ] Unit tests
- [ ] Integration test with multiple documents

**Deliverables:**
- Working Contradiction Agent
- Identifies factual conflicts
- Assigns confidence scores
- Passes all tests

**Test Independently:**
- Input: Facts from multiple documents
- Output: Contradictions JSON
- Validate: Correct conflicts identified

---

## Phase 7: Research Agent (Week 15-16)

**Goal:** Search legal databases for relevant authorities

**Implementation:**
```python
# Standalone agent
research_agent = ResearchAgent()
result = research_agent.process(legal_query)
# Returns: cases, statutes, citations
```

**Tasks:**
- [ ] Agent prompt engineering
- [ ] Query generation from facts
- [ ] Legal corpus indexing (sample dataset)
- [ ] Semantic search integration
- [ ] Citation extraction
- [ ] Relevance scoring
- [ ] Unit tests
- [ ] Integration test with search system

**Deliverables:**
- Working Research Agent
- Retrieves relevant legal authorities
- Returns properly formatted citations
- Passes all tests

**Test Independently:**
- Input: Legal issue query
- Output: Research results JSON
- Validate: Relevant cases retrieved

---

## Phase 8: Strategy Agent (Week 17-18)

**Goal:** Synthesize all outputs into analysis memo

**Implementation:**
```python
# Standalone agent
strategy_agent = StrategyAgent()
result = strategy_agent.process(
    entities=entities,
    timeline=timeline,
    contradictions=contradictions,
    research=research
)
# Returns: structured memo
```

**Tasks:**
- [ ] Agent prompt engineering
- [ ] Evidence synthesis logic
- [ ] Issue identification
- [ ] Strength/weakness analysis
- [ ] Memo generation
- [ ] Unit tests
- [ ] Integration test with all agent outputs

**Deliverables:**
- Working Strategy Agent
- Synthesizes all inputs
- Generates structured memo
- Passes all tests

**Test Independently:**
- Input: Outputs from all other agents
- Output: Strategy memo JSON
- Validate: Coherent synthesis

---

## Phase 9: LangGraph Orchestration (Week 19-20)

**Goal:** Connect all agents in workflow

**Now that all agents work independently, orchestrate them:**

**Tasks:**
- [ ] LangGraph graph definition
- [ ] State management implementation
- [ ] Conditional routing logic
- [ ] Agent integration into graph
- [ ] Workflow execution tracking
- [ ] Error handling and retries
- [ ] End-to-end workflow test

**Deliverables:**
- LangGraph orchestrator running all 5 agents
- State flows between agents correctly
- Workflow completes successfully
- Can track execution progress

**Test Orchestration:**
- Input: Case documents
- Process: All 5 agents execute in sequence
- Output: Complete analysis with memo
- Validate: All agent outputs present

---

## Phase 10: Human Review Integration (Week 21-22)

**Goal:** Add review checkpoints

**Tasks:**
- [ ] Workflow pause mechanism
- [ ] Review queue management
- [ ] Approval/rejection handlers
- [ ] Feedback incorporation
- [ ] Review UI components
- [ ] Review history tracking

**Deliverables:**
- Workflow pauses at checkpoints
- Can approve or request revisions
- Feedback incorporated into re-runs
- Review UI functional

---

## Phase 11: MCP Tool Layer (Week 23-24)

**Goal:** Refactor tools into MCP servers

**Tasks:**
- [ ] Document MCP server
- [ ] Research MCP server
- [ ] Database MCP server
- [ ] Refactor agents to use MCP tools
- [ ] Tool monitoring

**Deliverables:**
- MCP servers operational
- Agents use MCP tools
- Tools are modular and reusable

---

## Phase 12: Frontend Polish (Week 25-26)

**Goal:** Enhanced UI/UX

**Tasks:**
- [ ] Responsive design
- [ ] Real-time updates (WebSockets)
- [ ] Error handling
- [ ] Loading states
- [ ] Dark mode
- [ ] User documentation

**Deliverables:**
- Polished, responsive UI
- Real-time workflow updates
- Comprehensive error handling

---

## Phase 13: Testing & QA (Week 27-28)

**Goal:** Comprehensive testing

**Tasks:**
- [ ] Unit tests for all agents
- [ ] Integration tests for workflows
- [ ] API endpoint tests
- [ ] UI component tests
- [ ] End-to-end scenarios
- [ ] Performance testing
- [ ] CI/CD pipeline

**Deliverables:**
- >80% code coverage
- All critical paths tested
- CI/CD runs on commits

---

## Phase 14: Kubernetes Deployment (Week 29-30)

**Goal:** Production-ready deployment

**Tasks:**
- [ ] Kubernetes manifests
- [ ] Service discovery
- [ ] Persistent volumes
- [ ] Ingress configuration
- [ ] Secrets management
- [ ] Monitoring and logging

**Deliverables:**
- Application runs in Kubernetes
- Services scale horizontally
- Monitoring shows system health

---

## Testing Strategy for Independent Agents

### Unit Testing Each Agent

```python
# Example: Testing Evidence Agent independently
def test_evidence_agent_extracts_entities():
    agent = EvidenceAgent()
    sample_text = "Officer Smith arrived at 123 Main St on June 5, 2024"
    
    result = agent.process(sample_text)
    
    assert "Officer Smith" in result.entities.people
    assert "123 Main St" in result.entities.places
    assert "June 5, 2024" in result.entities.dates
```

### Integration Testing Agent Chains

```python
# Example: Testing Evidence → Timeline flow
def test_evidence_to_timeline():
    evidence_agent = EvidenceAgent()
    timeline_agent = TimelineAgent()
    
    # Step 1: Extract facts
    facts = evidence_agent.process(document)
    
    # Step 2: Build timeline
    timeline = timeline_agent.process(facts)
    
    assert len(timeline.events) > 0
    assert timeline.events[0].date < timeline.events[-1].date
```

### Full Workflow Testing

```python
# Example: Testing complete orchestration
def test_full_workflow():
    orchestrator = LangGraphOrchestrator()
    
    result = orchestrator.run(case_documents)
    
    assert result.entities is not None
    assert result.timeline is not None
    assert result.contradictions is not None
    assert result.research is not None
    assert result.memo is not None
```

---

## Key Architecture Decisions

### Agent Independence
- Each agent is a standalone Python class
- Can be tested without orchestration
- Has clear input/output contracts
- Uses dependency injection for tools

### Shared State Schema
```python
class SharedState(BaseModel):
    case_id: str
    documents: List[Document]
    entities: Optional[Entities] = None
    facts: Optional[List[Fact]] = None
    timeline: Optional[Timeline] = None
    contradictions: Optional[List[Contradiction]] = None
    research: Optional[ResearchResults] = None
    memo: Optional[StrategyMemo] = None
```

### Agent Interface
```python
class BaseAgent(ABC):
    @abstractmethod
    def process(self, state: SharedState) -> SharedState:
        """Process state and return updated state"""
        pass
```

---

## Success Metrics

**Agent Performance:**
- Evidence Agent: >85% entity extraction accuracy
- Timeline Agent: >90% correct event ordering
- Contradiction Agent: >80% true positive rate
- Research Agent: >75% relevant results
- Strategy Agent: >80% memos approved without major revisions

**System Performance:**
- Document processing: <30 seconds per document
- Agent execution: <2 minutes per agent
- Full workflow: <10 minutes
- Search response: <500ms

---

## Next Steps

1. **Review this roadmap** - Confirm approach and timeline
2. **Start Phase 0** - Set up infrastructure
3. **Build agents sequentially** - One at a time, test thoroughly
4. **Integrate into orchestration** - Once all agents proven
5. **Add human review** - After orchestration works
6. **Polish and deploy** - Final phases

This approach ensures each component works before integration, making debugging much easier.