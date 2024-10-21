import React from 'react';
import './App.css';
import Navbar from './components/NavBar';
import {
  BrowserRouter,
  Routes,
  Route,
  //Link,
} from "react-router-dom"
import LoginPage from './pages/LoginPage/LoginPage';
import Homepage from './pages/Homepage/Homepage';
import Profile from './pages/Profile';

function App() {
  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/LoginPage' element={<LoginPage />} />
          <Route path='/Homepage' element={<Homepage />} />
          <Route path='/Profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
