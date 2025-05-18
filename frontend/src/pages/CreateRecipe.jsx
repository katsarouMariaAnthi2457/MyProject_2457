// imports
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDownIcon, PhotoIcon } from "@heroicons/react/20/solid";
import axios from "axios";

export default function CreateRecipe() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState(null);
  const [method, setMethod] = useState("");
  const [servings, setServings] = useState("");
  const [ingredients, setIngredients] = useState([
    { amount: "", measurmentUnit: "", name: "" }
  ]);

  const [difficultyScore, setDifficultyScore] = useState(1);
  const [score, setScore] = useState(1);
  const [errorMsg, setErrorMsg] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  // Mappings
  const categoryMapping = {
    Οσπρια: 0,
    Πίτες: 1,
    "Κυρίως Πιάτα": 2,
    Γλυκά: 3,
    Μακαρονια: 4,
    Σαλάτες: 5,
    "Γρήγορες Συνταγές": 6,
    "Light Πιάτα": 7,
    Σνακ: 8,
    Λαδερά: 9,
    Πρωινά: 10,
    vegan: 11,
  };

  const units = { "γρ": 0, "ml": 1, "κ.σ.": 2, "κ.γ.": 3, "τεμ.": 4, "λιτρο": 5, "κιλο": 6, "κιλα": 7, "κουπα":8 };
  const mappedUnits = Object.keys(units);

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category) {
      alert("Παρακαλώ επέλεξε κατηγορία.");
      return;
    }

    if (
      ingredients.length === 0 ||
      ingredients.some(
        (i) =>
          !i.name ||
          !i.amount ||
          !i.measurmentUnit ||
          units[i.measurmentUnit] === undefined
      )
    ) {
      alert("Παρακαλώ συμπλήρωσε σωστά όλα τα υλικά.");
      return;
    }

    const formData = new FormData();
    formData.append("name", title);
    formData.append("categoriesOptions", categoryMapping[category] ?? "");
    formData.append("portions", servings);
    formData.append("dificultyScore", difficultyScore);
    formData.append("score", score);
    formData.append("execution", method);

    if (photo) {
      formData.append("file", photo);
    }

    try {
      const response = await axios.post("https://localhost:7235/Cooking", formData);
      const recipeId = response.data.id;
      await handleSubmitIngredients(recipeId);
      resetForm();
      setSubmitError(null);
    } catch (error) {
      console.error("Error creating recipe:", error);
      setSubmitError("Αποτυχία αποθήκευσης. Ελέγξτε τη σύνδεση ή προσπαθήστε ξανά.");
    }
  };

  // Υποβολή Υλικών
  const handleSubmitIngredients = async (recipeId) => {
    try {
      const payload = ingredients.map((ingredient) => ({
        name: ingredient.name,
        amount: Number(ingredient.amount),
        measurmentUnit: units[ingredient.measurmentUnit],
        recipeId: recipeId,
      }));

      console.log("Payload προς backend:", payload); // για debug

      const response = await axios.post(
        "https://localhost:7235/Cooking/addIngredients",
        payload
      );
      console.log("Η συνταγή αποθηκεύτηκε", response.data);
    } catch (error) {
      console.error("Σφάλμα κατά την αποθήκευση υλικών:", error);
    }
  };

  // Επεξεργασία υλικών
  const handleIngredientChange = (index, field, value) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { amount: "", measurmentUnit: "", name: "" }]);
  };

  const removeIngredient = (index) => {
    const updated = ingredients.filter((_, i) => i !== index);
    setIngredients(updated);
  };

  const resetForm = () => {
    setTitle("");
    setCategory("");
    setPhoto(null);
    setMethod("");
    setServings("");
    setIngredients([{ amount: "", measurmentUnit: "", name: "" }]);
    setDifficultyScore(1);
    setScore(1);
    setErrorMsg(null);
    setSubmitError(null);
  };

  // JSX αρχίζει
  return (
    <div className="min-h-screen bg-white py-12 px-6 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-10 p-8 bg-white shadow-xl rounded-xl max-w-6xl w-full text-gray-900"
      >
        <h2 className="text-center text-2xl font-bold">Δημιουργία Συνταγής</h2>

        {/* Τίτλος */}
        <div className="grid gap-1.5">
          <Label htmlFor="title" className="text-xl">
            Τίτλος Συνταγής
          </Label>
          <Input
            type="text"
            id="title"
            placeholder="π.χ. Παπουτσάκια"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border-gray-300"
          />
        </div>

        {/* Κατηγορία */}
        <div className="grid gap-1.5">
          <Label htmlFor="category" className="text-xl">
            Κατηγορία
          </Label>
          <div className="relative">
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-md border-gray-300"
            >
              <option value="">-- Επιλέξτε --</option>
              {Object.keys(categoryMapping).map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Φωτογραφία */}
        <div className="col-span-full">
          <Label htmlFor="file-upload" className="text-xl">
            Φωτογραφία
          </Label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-400 px-6 py-10">
            <div className="text-center">
              <PhotoIcon className="mx-auto h-12 w-12 text-gray-500" />
              <div className="mt-4 flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-gray-100 px-3 py-1.5 font-semibold text-indigo-600 hover:bg-gray-200"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">ή μεταφορά αρχείου</p>
              </div>
              {photo && (
                <div className="mt-4">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Preview"
                    className="h-20 mx-auto rounded-md object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Εκτέλεση */}
        <div>
          <Label htmlFor="method" className="text-xl">
            Μέθοδος Εκτέλεσης
          </Label>
          <textarea
            id="method"
            rows={5}
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2"
            placeholder="π.χ. Σωτάρουμε το κρεμμύδι..."
          />
        </div>

        {/* Μερίδες */}
        <div className="grid gap-1.5">
          <Label htmlFor="servings" className="text-xl">
            Μερίδες
          </Label>
          <Input
            type="number"
            id="servings"
            min={1}
            placeholder="π.χ. 4"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            className="w-full rounded-md border-gray-300"
          />
        </div>

        {/* Δυσκολία */}
        <div className="grid gap-1.5">
          <Label htmlFor="difficulty" className="text-xl">
            Βαθμός Δυσκολίας
          </Label>
          <select
            id="difficulty"
            value={difficultyScore}
            onChange={(e) => setDifficultyScore(Number(e.target.value))}
            className="rounded-md border-gray-300 px-2 py-1"
          >
            <option value={1}>1 - Εύκολο</option>
            <option value={2}>2 - Μέτριο</option>
            <option value={3}>3 - Δύσκολο</option>
          </select>
        </div>

        {/* Υλικά */}
        <div className="space-y-4">
          <h3 className="font-medium text-xl">Υλικά</h3>
          {ingredients.map((item, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="number"
                min={1}
                placeholder="Ποσ."
                value={item.amount}
                onChange={(e) =>
                  handleIngredientChange(index, "amount", e.target.value)
                }
                className="w-20 rounded-md border border-gray-300"
              />
              <select
                value={item.measurmentUnit}
                onChange={(e) =>
                  handleIngredientChange(index, "measurmentUnit", e.target.value)
                }
                className="rounded-md border border-gray-300"
              >
                <option value="">μονάδα</option>
                {mappedUnits.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
              <input
                placeholder="Υλικό"
                value={item.name}
                onChange={(e) =>
                  handleIngredientChange(index, "name", e.target.value)
                }
                className="flex-1 rounded-md border border-gray-300"
              />
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="text-red-500 font-bold px-2 py-1"
              >
                &times;
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredient}
            className="text-indigo-600 text-sm font-medium"
          >
            + Προσθήκη υλικού
          </button>
        </div>

        {/* Errors */}
        {submitError && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {submitError}
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-300 px-4 py-2 rounded-md text-sm font-semibold"
          >
            Ακύρωση
          </button>
          <button
            type="submit"
            className="bg-indigo-600 px-4 py-2 rounded-md text-sm font-semibold text-white"
          >
            Αποθήκευση
          </button>
        </div>
      </form>
    </div>
  );
}
