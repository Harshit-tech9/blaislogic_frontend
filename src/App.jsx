import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ArticlePage from './pages/ArticlePage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/insights/:articleId" element={<ArticlePage />} />
      </Routes>
    </Router>
  )
}

export default App
