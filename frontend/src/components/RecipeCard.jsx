import React from 'react'
import { Card, CardContent } from "./ui/card";
import pastaImg from "@/assets/pasta.jpg";

function RecipeCard() {
  return (
    <div>
        <Card>  
            <CardContent>
                    <img
                    src= {pastaImg}
                    alt="pasta"
                    className="w-full h-auto rounded-lg mb-4"
                />
                <p className="text-lg font-semibold text-center">Delicious Pasta</p>
            </CardContent>
        </Card>
    </div>
  )
}

export default RecipeCard