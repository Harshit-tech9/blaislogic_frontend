import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ArticlePage from './pages/ArticlePage'
import AssessPage from './pages/AssessPage'
import ArchitectFloatingCTA from './components/ArchitectFloatingCTA/ArchitectFloatingCTA'

function App() {
  return (
    <Router>
      <ArchitectFloatingCTA />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assess" element={<AssessPage />} />
        <Route path="/assess/:assessmentId" element={<AssessPage />} />
        <Route path="/insights/:articleId" element={<ArticlePage />} />
      </Routes>
    </Router>
  )
}

export default App
