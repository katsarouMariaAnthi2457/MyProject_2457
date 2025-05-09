import React from 'react'
import { Card, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import saladImg from "@/assets/salads.jpg";
import Categories from './Categories';



export default CategoryList

export function CategoryList() {
  

    // Format temperature
    //const formatTemp = (temp: number) => `${Math.round(temp)}°`;
  
    return (
      <Card className="overflow-hidden mb-4">
        <CardContent className="p-6">
              <div className="grid grid-cols-4 gap-4">
  
                  <Categories/>
                  
              </div>
                
        
            
          
        </CardContent>
      </Card>
    );
  }