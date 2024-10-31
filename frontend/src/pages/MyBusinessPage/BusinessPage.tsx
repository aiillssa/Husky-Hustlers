import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import resets from "../../components/_resets.module.css";
// Test comment

function BusinessPage() {

  return (
    <div>
      <h1>BusinessPage</h1>
      <Link to="/pages/AddBusinessPage" className={'nav-button'}>
        <button>Add my business</button>
      </Link>
    </div>
  );
}

export default BusinessPage