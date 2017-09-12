import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'

const Header: React.SFC = () => (
  <div className="row center-xs">
    <div className="col-xs-12">
      <div className="App-header">
        <h1><Link to='/'>Blogchain</Link></h1>
        <h5>A Hackathon Project</h5>
      </div>
    </div>
  </div>
);

export default Header;
