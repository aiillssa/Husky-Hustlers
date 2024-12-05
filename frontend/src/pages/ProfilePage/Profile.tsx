import React from 'react'
import { handleSignOut } from '../../utils/axios';

function Profile() {


  const handleLogout = () => {
    handleSignOut(); // Call the centralized logout logic 
  };

  return (
    <div>
      <h1>Profile</h1>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default Profile