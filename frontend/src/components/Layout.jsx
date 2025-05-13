// src/components/Layout.jsx
import { Header } from './Header'; 

export function Layout({children}) {
    return (
      <div className=" bg-gradient-to-br from-background to-muted">
        <Header/>
        <main className="min-h-screen container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t backdrop-blur supports-[backdrop-filter]:bg-background/60 py-12">
          <div className="container mx-auto px-4 text-center text-black-200">
            <p>Cooking Master</p>
          </div>
        </footer>
      </div>
    );
  }