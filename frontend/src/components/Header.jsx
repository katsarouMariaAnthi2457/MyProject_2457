import { Link } from "react-router-dom";
import logoImg from '@/assets/logo.png'; // Εισαγωγή της εικόνας από τον φάκελο assets
import logo2 from '@/assets/logo2.png';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo χωρίς το Link */}
        <div className="flex items-center">
          <img
            src={logo2} 
            alt="Logo"
            className="rounded-full h-19"  
          />
        </div>

        <div className="flex gap-4">
          {/* <CitySearch />
          <ThemeToggle /> */}
        </div>
      </div>
    </header>
  );
}
