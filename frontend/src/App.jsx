import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import { Layout } from './components/Layout';
import HomePage  from './pages/HomePage';
import { Routes, Route } from 'react-router-dom';
import CategoryPage from './pages/CategoryPage';
import CreateRecipe from './pages/CreateRecipe'; 
import AuthenticationPage from './pages/AuthenticationPage';

 
function App() {
  const [count, setCount] = useState(0); // 

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateRecipe />} /> {/* <-- Add this */}
        <Route path="/authentication" element={<AuthenticationPage />} /> 
        <Route path="/category/:categoryName" element={<CategoryPage />} />
       
      </Routes>
    </Layout>
  );
}

export default App;