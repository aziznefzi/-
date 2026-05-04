import { useState } from 'react'
import './App.css'
import Home from './pages/home'
import Adhkar from './pages/home/Adhkar'
import Settings from './pages/settings'
import { Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sebha from './pages/Sebha'
import Hadith from './pages/Hadith'
import Koraan from './pages/Koraan'
import Kids from './pages/Kids'

function App() {
  
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/settings" element={<Settings/>}/>
      <Route path="/adhkar" element={<Adhkar/>}/>
      <Route path="/sebha" element={<Sebha/>}/>
      <Route path="/hadith" element={<Hadith/>}/>
      <Route path="/koraan" element={<Koraan/>}/>
      <Route path='/Kids' element={<Kids/>}/>
      <Route path='/Kids/KidsLevel' element={<Kids/>}/>
    </Routes>
    </>
  )
}

export default App
