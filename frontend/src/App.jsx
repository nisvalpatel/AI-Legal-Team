import { Routes, Route } from 'react-router-dom'
import './App.css'

// Placeholder components - will be implemented later
const HomePage = () => (
  <div className="container">
    <h1>AI Legal Team</h1>
    <p>Agentic legal defense assistant</p>
  </div>
)

const DashboardPage = () => (
  <div className="container">
    <h1>Dashboard</h1>
    <p>Case management dashboard</p>
  </div>
)

const CaseDetailPage = () => (
  <div className="container">
    <h1>Case Details</h1>
    <p>View and manage case details</p>
  </div>
)

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/case/:id" element={<CaseDetailPage />} />
      </Routes>
    </div>
  )
}

export default App

// Made with Bob
