import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client';
import AuthProvider from './context/AuthProvider';


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <AuthProvider>   {/* Τυλίγουμε το App με το AuthProvider */}
      <App />
    </AuthProvider>
  </BrowserRouter>
</StrictMode>
);