import { FoodList } from '@/components/FoodList'
import React from 'react'
import { Button } from '../components/ui/button'
import CategoryList from '@/components/CategoryList'

function HomePage() {
  return (
    <div > 
        <FoodList/>

        <div className="flex justify-center">
            <Button className="item-center bg-sky-900  size-15 w-xl mb-3">Δημιουργησε τη δικη συνταγη!!</Button>
        </div>
          
        <CategoryList/>
    </div>
  )  
}

export default HomePage