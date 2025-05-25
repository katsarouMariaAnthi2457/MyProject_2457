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
import ForgotPassword from './pages/ForgotPassword';
import RecipeInfo from './pages/RecipeInfo';
import CreateWeeklyPlan from './pages/CreateWeeklyPlan';
import { ProtectedRoute } from './routes.jsx/ProtectedRoute';
import SearchResults from './components/SearchResults';
function App() {
  const [count, setCount] = useState(0); // 

  return (
    <Layout>
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/authentication" element={<AuthenticationPage />} /> 
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />       
        <Route path="/recipe/:id" element={<RecipeInfo />} />
        <Route path="/search" element={<SearchResults />} />
       
          {/* Προστατευμένες routes */}
          <Route element={<ProtectedRoute />}>
          <Route path="/create" element={<CreateRecipe />} /> {/* <-- Add this */}
          <Route path="/weekly-plan" element={<CreateWeeklyPlan />} />

         
          </Route>
      </Routes>
    </Layout>
  );
}

export default App;