
// Importing StrictMode from React to highlight potential problems in the application during development
import { StrictMode } from 'react';
import './index.css'

// Importing createRoot from ReactDOM to create the root for rendering the application
import { createRoot } from 'react-dom/client';

// Importing the main App component
import App from './App.jsx';

// Creating a root element and rendering the application
createRoot(document.getElementById('root')).render(
  // Wrapping the App component in StrictMode to enable additional checks and warnings in development mode
  <StrictMode>
    <App />
  </StrictMode>
);
