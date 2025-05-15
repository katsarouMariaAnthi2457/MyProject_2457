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
        <Link to="/create">
          <Button className="bg-sky-800 w-full max-w-xs mb-10">
            Δημιούργησε τη δική σου συνταγή!!
          </Button>
        </Link>
      </div>

      <FoodList />
    </div>
  );
}

export default HomePage;
