import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.js';
import './style.scss';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  // <React.StrictMode>
    <Router>
      <App />
    </Router>
  // </React.StrictMode>
);












