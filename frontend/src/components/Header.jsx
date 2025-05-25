import { Link, useNavigate } from "react-router-dom";
import logo2 from '@/assets/logo2.png';
import { UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'; // Πρόσθεσα το logout icon
import { useState } from "react";

export function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Παίρνουμε το token από localStorage για να ξέρουμε αν είναι logged in
  const token = localStorage.getItem("token");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleLogout = () => {
    // Διαγραφή token από localStorage
    localStorage.removeItem("token");
    // Ανακατεύθυνση στην αρχική ή στην σελίδα σύνδεσης
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
      <div className="flex h-16 items-center px-4 w-full">
        {/* Logo αριστερά */}
        <div className="flex items-center">
          <Link to="/">
            <img src={logo2} alt="Logo" className="h-20 w-auto" />
          </Link>
        </div>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Search + User icons δεξιά */}
        <div className="flex items-center gap-2">
          <form className="flex items-center w-72" onSubmit={handleSubmit}>
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                placeholder="Search recipe"
                required
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              <svg
                className="w-6 h-8"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </form>

          {/* User icon - πάντοτε */}
          <Link to="/authentication">
            <UserIcon
              className="w-14 h-12 text-gray-900 cursor-pointer"
              onClick={() => console.log("User icon clicked")}
            />
          </Link>

          {/* Logout icon - εμφανίζεται μόνο αν είμαστε logged in */}
          {token && (
            <button onClick={handleLogout} title="Logout" className="ml-2">
              <ArrowRightOnRectangleIcon className="w-12 h-12 text-black cursor-pointer hover:text-red-800" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
