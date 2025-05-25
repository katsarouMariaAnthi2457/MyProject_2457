import React, { useState, useEffect } from 'react';
import { FoodList } from '@/components/FoodList';
import { Button } from '../components/ui/button';
import CategoryMenu from '@/components/CategoryMenu';
import LoaderForPage from '@/components/LoaderForPage';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Ελέγχεις το token τη στιγμή του click, όχι στην αρχή
  const handleProtectedNavigate = (path) => {
    const token = localStorage.getItem("token"); // Live check
    if (token) {
      navigate(path);
    } else {
      localStorage.setItem("redirectAfterLogin", path);
      navigate("/authentication");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoaderForPage />;

  return (
    <div>
      <CategoryMenu />

      <div className="flex justify-center gap-4 mb-10">
        <Button
          className="bg-sky-800 w-full max-w-xs"
          onClick={() => handleProtectedNavigate("/create")}
        >
          Δημιούργησε τη δική σου συνταγή!!
        </Button>

        <Button
          className="bg-emerald-600 w-full max-w-xs hover:bg-emerald-700"
          onClick={() => handleProtectedNavigate("/weekly-plan")}
        >
          Δημιούργησε το εβδομαδιαίο σου πρόγραμμα
        </Button>
      </div>

      <FoodList />
    </div>
  );
}

export default HomePage;
