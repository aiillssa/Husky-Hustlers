import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import LoginPage from './pages/LoginPage/LoginPage';
import Homepage from './pages/Homepage/HomePage';
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

  render() {
    return (
      <div>
        {this.state.signedIn ? (
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/pages/Profile" element={<Profile />} />
              <Route path="/pages/Homepage" element={<Homepage />} />
              <Route path="/pages/BusinessPages" element={<BusinessPage />} />
              <Route path="/pages/BusinessPages" element={<AddBusinessPage />} />
            </Routes>
            <Homepage />
          </BrowserRouter>
        ) : (
          <LoginPage setSignedIn={this.setSignedIn} /> // Pass setSignedIn to LoginPage
        )}
      </div>
    );
  }
}

export default App;
