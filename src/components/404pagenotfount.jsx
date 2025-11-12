import React from 'react';

import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 Page Not Found | Propel Foundry</title>
      </Helmet>
      
      <div className="not-found-container">
        <div className="not-found-content">
          <div className="not-found-icon">
            <FaExclamationTriangle />
          </div>
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>Oops! The page you're looking for doesn't exist or has been moved.</p>
          <Link to="/" className="home-button">
            Go to Homepage
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;