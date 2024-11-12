import React, { Component } from 'react';
import { useNavigate, Link } from 'react-router-dom';

type BusinessPageState = {
  hasBusiness: boolean; // need to get this value from server
};

export class BusinessPage extends Component<{}, BusinessPageState> {
  constructor(props: {}) {
    super(props);
    this.state = { hasBusiness: false };
  }

  setHasBusiness = (value: boolean) => {
    this.setState({ hasBusiness: value });
  };

  render () {
    return (
      <div>
        {this.state.hasBusiness ? (
            <h1>This page will display your business information because you have a business!</h1>
          ) : (
            <div>
              <h1>BusinessPage</h1>
              <Link to="/pages/AddBusinessPage" className={'nav-button'}>
                Add my business
              </Link>
            </div>
          )}
        
      </div>
    );
  }
}

export default BusinessPage