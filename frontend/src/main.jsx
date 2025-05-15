import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>   {/* Ορίζουμε το BrowserRouter για να δουλέψει το routing */}
      <App />
    </BrowserRouter>
  </StrictMode>
);