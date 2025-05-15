import { Card, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import pastaImg from "@/assets/pasta.jpg";
import RecipeCard from "./RecipeCard";
import axios from 'axios';
import { useState, useEffect } from "react";


export function FoodList() {
  

  // Format temperature
  //const formatTemp = (temp: number) => `${Math.round(temp)}°`;

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:7235/Cooking")
      .then((response) => {

        setRecipes(response.data);
        //console.log(response.data);

      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array = run once on mount
  


  return (
    <Card className="overflow-hidden mb-4">
      <CardContent className="p-6">
            <div className="grid grid-cols-4 gap-4">

            {recipes.map((recipe, index) => (
                
                <RecipeCard key={index} recipe={recipe}/>

            ))}  
            </div>
                     
      </CardContent>
    </Card>
  );
}