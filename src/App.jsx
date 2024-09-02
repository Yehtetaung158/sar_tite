import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage'
import SignPage from './pages/auth/SignPage'
import "./index.css";
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';

const App = () => {
  return (
  <div>
     <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/' element={<SignPage/>}/>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/profile' element={<Profile/>}/>
   </Routes>
  </div>
  )
}

export default App