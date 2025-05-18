import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/el";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.locale("el");
dayjs.extend(isoWeek);

const meals = ["Πρωινό", "Μεσημεριανό", "Απογευματινό", "Βραδινό"];
const foodOptions = [
  "Αυγά", "Τοστ", "Γιαούρτι",
];

const generateWeek = (startDate) => {
  return Array.from({ length: 7 }, (_, i) => startDate.add(i, "day"));
};

export default function CreateWeeklyPlan() {
  const [weeks, setWeeks] = useState([
    { id: 1, startDate: dayjs().startOf("isoWeek") } // Ξεκινάει πάντα από Δευτέρα
  ]);

  const addWeek = () => {
    const lastWeek = weeks[weeks.length - 1];
    const newStartDate = lastWeek.startDate.add(7, "day");
    setWeeks([...weeks, { id: Date.now(), startDate: newStartDate }]);
  };

  const removeWeek = (id) => {
    setWeeks(weeks.filter((w) => w.id !== id));
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
                      {days.map((day) => (
                        <td key={`${day.format()}-${meal}`} className="border p-2">
                          <select className="w-full p-1 border rounded">
                            <option value="">-- Επιλογή --</option>
                            {foodOptions.map((food) => (
                              <option key={food} value={food}>
                                {food}
                              </option>
                            ))}
                          </select>
                        </td>
                      ))}
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
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={addWeek}
        >
          Προσθήκη Εβδομαδιαίου Πλάνου
        </button>
      </div>
    </div>
  );
}
