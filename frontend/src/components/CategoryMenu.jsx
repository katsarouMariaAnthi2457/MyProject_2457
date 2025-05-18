import React from 'react';
import { Card, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import saladImg from "@/assets/salads.jpg";
import CardListItem from './CardListItem'; // Assuming CardListItem component renders the items
import breakfastImg from "@/assets/breakfast.png";
import kiriosPiataImg from "@/assets/KiriosPiata.png";
import DessertImg from "@/assets/dessert2.png";
import SpaghettiImg from "@/assets/spaghetti.png";
import ospriaImg from "@/assets/ospria.png";
import laderaImg from "@/assets/ladera.png";
import SaladImg from "@/assets/salad.png";
import QuickMealsImg from "@/assets/QuickMeal.png";
import LightPiataImg from "@/assets/light.png";
import snackImg from "@/assets/snack.png";


export default CategoryMenu;

export function CategoryMenu() {
  return (
    <Card className="overflow-hidden mb-4">
      <CardContent className="p-6">
        <div className="grid-1 grid-cols-1 gap-4">
          
          {/* Scrollable container for horizontal scrolling */}
          <div className="overflow-x-auto whitespace-nowrap space-x-6 flex items-center w-full">
            {/* Assuming CardListItem renders a list of items */}
            <CardListItem title="Πρωινά" image={breakfastImg} />
            <CardListItem title="Κυρίως Πιάτα" image={kiriosPiataImg} />
            <CardListItem title="Γλυκά" image={DessertImg} />
            <CardListItem title="Μακαρονια" image={SpaghettiImg} />
            <CardListItem title="Οσπρια" image ={ospriaImg}/>
            <CardListItem title="Σαλάτες" image ={SaladImg}/> 
            <CardListItem title="Λαδερά" image ={laderaImg}/> 
            <CardListItem title="Γρήγορες Συνταγές" image ={QuickMealsImg}/> 
            <CardListItem title="Light Πιάτα" image ={LightPiataImg}/> 
            <CardListItem title="Σνακ" image ={snackImg}/> 



          </div>
          
        </div>
      </CardContent>
    </Card>
  );
}
