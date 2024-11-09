import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/NavBar';
import LoginPage from './pages/LoginPage/LoginPage';
import Homepage from './pages/Homepage/Homepage';
import Profile from './pages/Profile';
import BusinessPage from './pages/MyBusinessPage/BusinessPage';
import AddBusinessPage from './pages/AddBusinessPage/AddBusinessPage';

type AppState = {
  signedIn: boolean;
};

export class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = { signedIn: false };
  }

  setSignedIn = (value: boolean) => {
    this.setState({ signedIn: value });
  };

  // Layout component that includes Navbar
  NavbarLayout = () => (
    <>
      <Navbar />
      <Outlet /> {/* This renders the nested route's component */}
    </>
  );

  render() {
    return (
      <div>
        {this.state.signedIn ? (
          <BrowserRouter>
            <Routes>
              {/* Routes with Navbar */}
              <Route element={<this.NavbarLayout />}>
                <Route path="/pages/Profile" element={<Profile />} />
                <Route path="/pages/Homepage" element={<Homepage />} />
                <Route path="/pages/BusinessPage" element={<BusinessPage />} />
              </Route>

              {/* Routes without Navbar */}
              <Route path="/pages/AddBusinessPage" element={<AddBusinessPage />} />

              {/* Redirect to Homepage after login */}
              <Route path="/" element={<Navigate to="/pages/Homepage" replace />} />
            </Routes>
          </BrowserRouter>
        ) : (
          <LoginPage setSignedIn={this.setSignedIn} /> // Pass setSignedIn to LoginPage
        )}
      </div>
    );
  }
}

export default App;
