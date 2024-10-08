// Main.jsx
import React, { StrictMode } from 'react'; // Ensure you import React
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router
import App from './App';
import '/src/styles.css';
const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Router>
        <App />
      </Router>
    </StrictMode>,
  );
}
