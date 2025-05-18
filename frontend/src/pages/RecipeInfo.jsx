import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import portionImg from "@/assets/portions.png";
import methodImg from "@/assets/method.png";
import ingredientsImg from "@/assets/ingredients.png";
import axios from 'axios';

function RecipeInfo() {
  const { id } = useParams();

  const baseServings = 4;

  const recipe = {
    id: 0,
  categoriesOptions: 0,
  name: "",
  dificultyScore: 0,
  score: 0,
  execution0: "",
  portions: 6,
  filePath: "",
    ingredients: [
      { amount: 0, measurmentUnit: 0, name: '' }
    ],
    execution: ''
  }

  const measurementUnits = [
    "γρ",     // 0
    "μλ",     // 1
    "κ.σ",     // 2
    "κ.γ",     // 3
    "τεμ",    // 4
    "λιτρο",  // 5
    "κιλο",   // 6
    "κιλα",   // 7
    "κουπα"   // 8
  ];
  
  
//   const recipe = {
//     name: 'Μακαρόνια με Κιμά',
//     ingredients: [
//       { amount: 500, measurementUnit: 'γρ', name: 'μακαρόνια' },
//       { amount: 400, measurementUnit: 'γρ', name: 'κιμάς μοσχαρίσιος' },
//       { amount: 1, measurementUnit: '', name: 'κρεμμύδι ψιλοκομμένο' },
//       { amount: 2, measurementUnit: '', name: 'σκελίδες σκόρδο' },
//       { amount: 400, measurementUnit: 'γρ', name: 'ντομάτα κονκασέ' },
//       { amount: '', measurementUnit: '', name: 'Αλάτι, πιπέρι, ελαιόλαδο' },
//     ],
//     execution: `1. Βράζουμε τα μακαρόνια σύμφωνα με τις οδηγίες του πακέτου.\n2. Σε κατσαρόλα σοτάρουμε το κρεμμύδι και το σκόρδο με λίγο ελαιόλαδο.\n3. Προσθέτουμε τον κιμά και τον σοτάρουμε μέχρι να πάρει χρώμα.\n4. Προσθέτουμε την ντομάτα, αλάτι και πιπέρι και αφήνουμε να σιγοβράσει.\n5. Σερβίρουμε τον κιμά πάνω από τα μακαρόνιαες του πακέτου.\n2. Σε κατσαρόλα σοτάρουμε το κρεμμύδι και το σκόρδο με λίγο ελαιόλαδο.\n3. Προσθέτουμε τον κιμά και τον σοτάρουμε μέχρι να πάρει χρώμα.\n4. Προσθέτουμε την ντομάτα, αλάτι και πιπέρι και αφήνουμε να σιγοβράσει.\n5. Σερβίρουμε τον κιμά πάνω από τα μακαρόνια.φωνα με τις οδηγίες του πακέτου.\n2. Σε κατσαρόλα σοτάρουμε το κρεμμύδι και το σκόρδο με λίγο ελαιόλαδο.\n3. Προσθέτουμε τον κιμά και τον σοτάρουμε μέχρι να πάρει χρώμα.\n4. Προσθέτουμε την ντομάτα, αλάτι και πιπέρι και αφήνουμε να σιγοβράσει.\n5. Σερβίρουμε τον κιμά πάνω από τα μακαρόνιαες του πακέτου.\n2. Σε κατσαρόλα σοτάρουμε το κρεμμύδι και το σκόρδο με λίγο ελαιόλαδο.\n3. Προσθέτουμε τον κιμά και τον σοτάρουμε μέχρι να πάρει χρώμα.\n4. Προσθέτουμε την ντομάτα, αλάτι και πιπέρι και αφήνουμε να σιγοβράσει.\n5. Σερβίρουμε τον κιμά πάνω από τα μακαρόνια..                                                                                                                                                                                   .`,
//   };


  const [recipeInfo, setRecipes] = useState(recipe);

  useEffect(() => {
    axios.get(`https://localhost:7235/Cooking/id?id=${id}`)
      .then((response) => {

        setRecipes(response.data);
        console.log("mplalalal" +response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },[]); // Empty dependency array = run once on mount

console.log(recipeInfo)
  

  const [servings, setServings] = useState(recipeInfo.portions);
  const [rating, setRating] = useState(0);

  const scaleAmount = (amount) => {
    if (amount === '') return '';
    return (amount * servings / recipeInfo.portions).toFixed(0);
  };

  return (
    <div className="max-w-10xl mx-auto px-8 pt-12 text-[22px]">
      <h1 className="text-5xl font-bold mb-12 text-center">{recipeInfo.name}</h1>

      <div className="flex flex-col md:flex-row justify-start items-start gap-12">
            {/* Υλικά */}
            <div className="w-full md:w-1/2 flex gap-6">
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-4xl font-semibold flex items-center gap-3">
                            <img src={ingredientsImg} alt="Υλικά" className="w-14 h-14" />
                            Υλικά
                        </h2>              
                    </div>
                    <ul className="list-disc list-inside text-2xl">
                    {recipeInfo.ingredients.map((item, index) => (
                        
                        <li key={index}>
                            {console.log(item.measurmentUnit)}
                        {item.amount !== '' ? `${scaleAmount(item.amount)}
                        
                       ${measurementUnits[item.measurmentUnit]} ` : ''}
                        {item.name}
                        </li>
                    ))}
                    </ul>
            </div> 

            {/* Right: Image next to the list */}
            <div className="flex-shrink-0">
                <img
                src={`https://localhost:7235/${recipeInfo.filePath}`} // Replace with your actual image path
                alt="Σχετική εικόνα"
                className="w-52 h-auto rounded-lg shadow-lg mt-15"
                />
            </div>     
        </div>
        {/* Δες ινστα και βρες μουθ μια το τσατ */}

           {/* Εκτέλεση */}
            <div className="w-full md:w-1/2">
                {/* Heading and Μερίδες on the same line */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-4xl font-semibold flex items-center gap-3">
                    <img src={methodImg} alt="Εκτέλεση" className="w-14 h-14" />
                    Μέθοδος Εκτέλεσης
                    </h2>

                    {/* Μερίδες inline */}
                    <div className="flex items-center gap-3 bg-blue-200 rounded-lg px-4 py-2 shadow-md">
                    <img src={portionImg} alt="Μερίδες" className="w-10 h-10" />
                    <span className="text-2xl font-semibold">Μερίδες:</span>
                    <input
                        type="number"
                        min={1}
                        max={20}
                        value={servings}
                        onChange={(e) => setServings(Number(e.target.value))}
                        className="w-20 text-center rounded border border-gray-300 p-1 text-xl"
                    />
                    </div>
                </div>

                {/* Εκτέλεση περιεχόμενο */}
                <div className="bg-gray-100 rounded-lg p-6 shadow-inner max-h-[400px] overflow-y-auto">
                    <p className="whitespace-pre-line text-2xl">{recipeInfo.execution}</p>
                </div>
            </div>

      </div>

        {/* Βαθμολογία */}
        <div className="mt-12">
            <div className="flex items-center justify-between mb-4">
                <Typography component="legend" sx={{ fontSize: '3rem', fontWeight: 'bold' }}>
                    Προσθήκη Βαθμολογίας:
                </Typography>
                <span className="text-xl bg-blue-100 text-blue-800 px-4 py-1 rounded-full font-medium shadow">
                Βαθμός Δυσκολίας: <span className="text-xl font-bold">{recipeInfo.dificultyScore} </span>
                </span>
            </div>

            <Rating
                name="recipe-rating"
                value={rating}
                onChange={async (event, newValue) => {
                    setRating(newValue); // update UI immediately

                    try {
                        const response = await axios.put("https://localhost:7235/Cooking", {
                          score: newValue,
                          recipeId: Number(id), // assuming you're using useParams for id
                        });
                      
                        console.log("Rating updated successfully", response.data);
                      } catch (error) {
                        console.error("Error updating rating:", error);
                      }
                }}
                size="large"
                sx={{ fontSize: '3rem', fontWeight: 'bold' }}
            />

            <Typography component="legend" sx={{ fontSize: '3rem', fontWeight: 'bold' }}>
                Βαθμολογίας συνταγής: {recipeInfo.score ? recipeInfo.score : 'Καμία'}
            </Typography>
        </div>

      
    </div>
  );
}

export default RecipeInfo;
