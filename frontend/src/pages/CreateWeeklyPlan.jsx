import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/el";
import isoWeek from "dayjs/plugin/isoWeek";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

dayjs.locale("el");
dayjs.extend(isoWeek);

const meals = ["Πρωινό", "Μεσημεριανό", "Απογευματινό", "Βραδινό"];

const mealCategoryIds = {
  Πρωινό: [10],
  Μεσημεριανό: [2, 9, 4, 5, 6, 7, 0],
  Απογευματινό: [8, 5, 3],
  Βραδινό: [5, 8, 6, 7, 3]
};

const generateWeek = (startDate) => {
  return Array.from({ length: 7 }, (_, i) => startDate.add(i, "day"));
};

export default function CreateWeeklyPlan() {
  const [weeks, setWeeks] = useState([{ id: 1, startDate: dayjs().startOf("isoWeek") }]);
  const [mealFoodOptions, setMealFoodOptions] = useState({});
  const [selections, setSelections] = useState({});

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const promises = Object.entries(mealCategoryIds).map(async ([meal, ids]) => {
          const params = new URLSearchParams();
          ids.forEach((id) => params.append("options", id));
          const response = await axios.get("https://localhost:7235/Cooking/recipesByCategory", { params });
          return [meal, response.data];
        });
        const results = await Promise.all(promises);
        setMealFoodOptions(Object.fromEntries(results));
      } catch (error) {
        console.error("Σφάλμα κατά τη φόρτωση των συνταγών:", error);
      }
    };
    fetchOptions();
  }, []);

  const addWeek = () => {
    const lastWeek = weeks[weeks.length - 1];
    setWeeks([...weeks, { id: Date.now(), startDate: lastWeek.startDate.add(7, "day") }]);
  };

  const removeWeek = (id) => setWeeks(weeks.filter((w) => w.id !== id));

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();

    weeks.forEach((week) => {
      const days = generateWeek(week.startDate);
      const header = ["Γεύμα / Ημέρα", ...days.map((d) => d.format("dddd D/M"))];
      const data = meals.map((meal) => {
        const row = [meal];
        days.forEach((day) => {
          const key = `${week.id}|${day.format("YYYY-MM-DD")}|${meal}`;
          row.push(selections[key] || "");
        });
        return row;
      });

      const worksheet = XLSX.utils.aoa_to_sheet([header, ...data]);

      // Χρήση ασφαλούς ονόματος για το φύλλο Excel (χωρίς /, ?, *, κλπ)
      const safeSheetName = `Εβδομάδα_${week.startDate.format("D-M")}_${days[6].format("D-M")}`;
      XLSX.utils.book_append_sheet(wb, worksheet, safeSheetName);
    });

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(dataBlob, "Πρόγραμμα_Διατροφής.xlsx");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Εβδομαδιαίο Πρόγραμμα Διατροφής</h1>

      {weeks.map((week) => {
        const days = generateWeek(week.startDate);
        return (
          <div key={week.id} className="mb-10">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">
                Εβδομάδα: {week.startDate.format("D/M")} - {days[6].format("D/M")}
              </h2>
              <button
                className="text-red-500 hover:text-red-700 font-medium"
                onClick={() => removeWeek(week.id)}
              >
                Διαγραφή Πλάνου
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 text-center">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2">Γεύμα / Ημέρα</th>
                    {days.map((day) => (
                      <th key={day.format()} className="border p-2">
                        {day.format("dddd D/M")}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {meals.map((meal) => (
                    <tr key={meal}>
                      <td className="border p-2 font-medium">{meal}</td>
                      {days.map((day) => {
                        const key = `${week.id}|${day.format("YYYY-MM-DD")}|${meal}`;
                        return (
                          <td key={key} className="border p-2">
                            <select
                              className="w-full p-1 border rounded text-black"
                              value={selections[key] || ""}
                              onChange={(e) =>
                                setSelections((prev) => ({
                                  ...prev,
                                  [key]: e.target.value
                                }))
                              }
                            >
                              <option value="">-- Επιλογή --</option>
                              {(mealFoodOptions[meal] || []).map((recipe) => (
                                <option key={recipe.id} value={recipe.name}>
                                  {recipe.name && recipe.name.trim() !== ""
                                    ? recipe.name
                                    : `(Άγνωστο πιάτο ID: ${recipe.id})`}
                                </option>
                              ))}
                            </select>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      <div className="text-center">
        <button
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 mr-4"
          onClick={addWeek}
        >
          Προσθήκη Εβδομαδιαίου Πλάνου
        </button>

        <button
          className="mt-6 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={exportToExcel}
        >
          Αποθήκευση ως Excel
        </button>
      </div>
    </div>
  );
}
