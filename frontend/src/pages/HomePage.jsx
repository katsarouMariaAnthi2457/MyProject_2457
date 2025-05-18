import { FoodList } from '@/components/FoodList';
import React from 'react';
import { Button } from '../components/ui/button';
import CategoryMenu from '@/components/CategoryMenu';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <CategoryMenu />

      <div className="flex justify-center gap-4 mb-10">
        <Link to="/create">
          <Button className="bg-sky-800 w-full max-w-xs">
            Δημιούργησε τη δική σου συνταγή!!
          </Button>
        </Link>

        <Link to="/weekly-plan">
          <Button className="bg-emerald-600 w-full max-w-xs hover:bg-emerald-700">
            Δημιούργησε το εβδομαδιαίο σου πρόγραμμα
          </Button>
        </Link>
      </div>

      <FoodList />
    </div>
  );
}

export default HomePage;
