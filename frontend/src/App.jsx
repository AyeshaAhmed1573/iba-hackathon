import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './ProtectedRoute'
import Products from './pages/Products'
import Pricing from './pages/Pricing'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <>
      <BrowserRouter>
      <Routes>
       <Route path='/' element={<Home/>} />
       <Route path='/pricing' element={<Pricing/>} />
       <Route path='/dashboard' element={<Dashboard/>} />
       <Route path='/Products' element={<Products/>} />
     
       <Route path='/login' element={<Login/>} />
       <Route path='/signup' element={<Signup/>} />
      </Routes>
      </BrowserRouter>
    </>
    </>
  )
}

export default App
