import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import RecipeCard from "./RecipeCard";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const query = useQuery().get("query") || "";
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    axios.get(`https://localhost:7235/Cooking/search?query=${encodeURIComponent(query)}`)
      .then(res => {
        setRecipes(res.data);
      })
      .catch(err => {
        console.error("Error fetching search results:", err);
      })
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div>
      <h2>Αναζήτηση για: "{query}"</h2>

      {loading && <p>Φορτώνει...</p>}

      {!loading && recipes.length === 0 && <p>Δεν βρέθηκαν αποτελέσματα.</p>}

      <div className="grid grid-cols-4 gap-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
