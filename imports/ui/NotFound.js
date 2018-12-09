import React from 'react';
import {Link} from 'react-router';

export default () => {
  return (
    <div className="boxed-view">
      <div className="boxed-view__box">
        <h1>Page not found</h1>
        <p>404 - Page not found. Grab your towel.</p>
        <Link to="/" className="button button--link">Home</Link>
      </div>
    </div>
    
    );
};