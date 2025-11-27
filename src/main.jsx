// Entry point for the React application.
// - Sets up React StrictMode for highlighting potential problems during development.
// - Mounts the top-level <App /> component into the DOM element with id="root".
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Render the application into the root DOM node.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
