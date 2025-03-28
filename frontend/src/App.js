import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login  from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from './pages/Profile';
import Discover from './pages/Discover';
function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/discover" element={<Discover/>}/>
      </Routes>
  )
}

export default App;
