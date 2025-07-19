import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import Index from './pages/Index'
import Home from './pages/Home'
import Login from './pages/Login'
import MyGallery from './pages/MyGallery'

function App() {
  return (
    // <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mygallery" element={<MyGallery />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    // </Router>
  )
}

export default App
