import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Formulario } from "./components/Login"
import Menu from './components/Menu'
import Empleados from './components/Empleados'
import Horarios from './components/Horarios'
import Gerentes from './components/Gerentes'

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false)

  const handleLogin = (email, password) => {
    if (email === "facundo@gmail.com" && password === "12345") {
      setLoggedIn(true)
    } else {
      alert("No eres el administrador")
    }
  }

  return <Router>
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/menu" /> : <Formulario onLogin={handleLogin} />}
        />
        <Route path="/menu" element={<Menu />} />
        <Route path="/empleados" element={<Empleados />} />
        <Route path="/horarios" element={<Horarios />} />
        <Route path="/gerentes" element={<Gerentes />} />
      </Routes>
    </div>
  </Router>
}

export default App
