import React from 'react'
import { Card, CardContent } from "./ui/card";
import saladImg from "@/assets/salads.jpg";

function Categories() {
  return (
    <div>
      
    <Card>  
       
        <CardContent>
                <img
                src= {saladImg}
                alt="pasta"
                className="w-full h-auto rounded-lg mb-4"
            />
            <p className="text-lg font-semibold text-center">Delicious Pasta</p>
        </CardContent>
    </Card>
</div>
  )
}

export default Categories