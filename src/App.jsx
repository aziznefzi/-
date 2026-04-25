import { useState } from 'react'
import './App.css'
import Home from './pages/home'
import Adhkar from './pages/home/Adhkar'
import Settings from './pages/settings'
import { Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
function App() {
  
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/settings" element={<Settings/>}/>
      <Route path="/adhkar" element={<Adhkar/>}/>
    </Routes>
    </>
  )
}

export default App
