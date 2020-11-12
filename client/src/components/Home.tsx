import React from 'react';

import './App.css';
import SocialLinks from './SocialLinks';

/**
 * Functional top-level React component
 * @function App
 *
 * @returns {JSX.Element} component JSX
 */
function Home() {
  return (
    <div>
      <h1>Bonnie Schulkin</h1>
      <h3 className="code">teacher | coder</h3>
      <SocialLinks />
    </div>
  );
}

export default Home;
