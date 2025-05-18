import React from 'react';
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipe/${recipe.id}`} className="block">
      <Card>  
        <CardContent>
          <img
            src={`https://localhost:7235/${recipe.filePath}`}
            alt={recipe.name}
            className="w-full h-40 rounded-lg mb-4 object-cover"
          />               
          <h1 className='font-semibold text-xl text-balance text-center'>{recipe.name}</h1>
          <p className="text-lg text-center line-clamp-4 mt-3">{recipe.execution}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default RecipeCard;
