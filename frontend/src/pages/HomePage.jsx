import { FoodList } from '@/components/FoodList';
import React from 'react';
import { Button } from '../components/ui/button';
import CategoryMenu from '@/components/CategoryMenu';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <CategoryMenu />
      
      <div className="flex justify-center">
        <Link to="/create Recipe">
          <Button className="bg-sky-900 w-full max-w-xs mb-3">
            Δημιούργησε τη δική σου συνταγή!!
          </Button>
        </Link>
      </div>

      <FoodList />
    </div>
  );
}

export default HomePage;
