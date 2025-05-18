import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecipeCard from "../components/RecipeCard";
import { Card, CardContent } from "../components/ui/card";

function CategoryPage() {
  // Mapping of category names to their corresponding numeric values (options)
  const categoryMapping = {
    "Οσπρια": 0,
    "Πίτες": 1,
    "Κυρίως Πιάτα": 2,
    "Γλυκά": 3,
    "Μακαρονια": 4,
    "Σαλάτες": 5,
    "Γρήγορες Συνταγές": 6,
    "Light Πιάτα": 7,
    "Σνακ": 8,
    "Λαδερά": 9,
    "Πρωινά": 10,
    "vegan":11,
  };

  // Get the category name from the URL parameters
  const { categoryName } = useParams();
console.log(categoryName);
  // Decode the category name to handle encoded characters in URL
  const decodedCategoryName = decodeURIComponent(categoryName);

  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the category ID based on the decoded category name
  const categoryId = categoryMapping[categoryName];

  useEffect(() => {
    if (categoryId !== undefined) {
      setLoading(true);  // Set loading state
      // Make an API request to fetch recipes by category
      axios.get('https://localhost:7235/Cooking/recipesByCategory', {
        params: { options: categoryId }
      })
      .then(response => {
        setLoading(false);  // Stop loading
        setCategoryData(response.data); // Set the category data
        
      })
      .catch(error => {
        console.error("Error fetching category data:", error);
        setError('Failed to load category data');
        setLoading(false);  // Stop loading
      });
    }
  }, [categoryId]); // Re-run the effect when categoryId changes

  // Display loading or error message
  if (loading == true) {
    return (
      <div className="text-center">
        <h1 className="text-4xl font-semibold mt-10">{decodedCategoryName}</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <h1 className="text-4xl font-semibold mt-10">{decodedCategoryName}</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1 className="text-4xl font-semibold mt-10">{decodedCategoryName}</h1>
      {console.log(categoryData)}
      {/* Render the fetched recipes */}
      {categoryData && categoryData.length > 0 ? (     
          <Card className="overflow-hidden mb-4">
            <CardContent className="p-6">
                  <div className="grid grid-cols-4 gap-4">

                  {categoryData.map((recipe, index) => (
                      
                      <RecipeCard key={index} recipe={recipe}/>

                  ))}  
                  </div>                 
            </CardContent>
        </Card>
  
      ) : (
        <p>No recipes found in this category.</p>
      )}
    </div>
  );
}

export default CategoryPage;
