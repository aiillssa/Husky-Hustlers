import React from 'react';
import './App.css';
import Navbar from './components/NavBar';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom"
import LoginPage from './pages/LoginPage';
import Homepage from './pages/Homepage';
import Profile from './pages/Profile';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='./pages/LoginPage' element={<LoginPage />} />
          <Route path='./pages/Homepage' element={<Homepage />} />
          <Route path='./pages/Profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
