import '../App.css';

import React, { ReactElement } from 'react';

import SocialLinks from './SocialLinks';

/**
 * Functional top-level React component
 * @function App
 *
 * @returns {JSX.Element} component JSX
 */
export default function Home(): ReactElement {
  return (
    <div>
      <h1>Bonnie Schulkin</h1>
      <h3 className="code">teacher | coder</h3>
      <SocialLinks />
    </div>
  );
}
