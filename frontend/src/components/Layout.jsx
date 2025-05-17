import { Header } from './Header';

export function Layout({ children }) {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />

      {/* Responsive container για το main content */}
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 md:px-8 lg:px-12">
        {children}
      </main>

      <footer className="border-t py-6 text-center text-gray-500 text-sm sm:text-base">
        <p>Cooking Master  2025</p>
      </footer>
    </div>
  );
}
