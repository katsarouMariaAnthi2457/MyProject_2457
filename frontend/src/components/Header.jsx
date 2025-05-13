import { Link } from "react-router-dom";
import logo2 from '@/assets/logo2.png';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
      <div className="flex h-16 items-center justify-between px-4 w-full">
        {/* Logo with Link to homepage */}
        <div className="flex items-center">
          <Link to="/">{/* εδω κανω  to logo να γινεται κλικ ωστε να παει στο homepage */}
            <img
              src={logo2}
              alt="Logo"
              className="h-20 w-auto" 
            />
          </Link>
        </div>

        <div className="flex gap-4">
          {/* <CitySearch />
          <ThemeToggle /> */}
        </div>
      </div>
    </header>
  );
}
