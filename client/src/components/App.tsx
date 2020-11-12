import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import Routes from './Routes';

export default function App() {
  // separate routes out for easier testing
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}
