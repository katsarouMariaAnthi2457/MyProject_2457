import { Card, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import pastaImg from "@/assets/pasta.jpg";
import RecipeCard from "./RecipeCard";
import axios from 'axios';


export function FoodList() {
  

  // Format temperature
  //const formatTemp = (temp: number) => `${Math.round(temp)}°`;



  return (
    <Card className="overflow-hidden mb-4">
      <CardContent className="p-6">
            <div className="grid grid-cols-4 gap-4">

                <RecipeCard/>
                
            </div>
              
      
          
        
      </CardContent>
    </Card>
  );
}