import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import AppButton from '../Button/AppButton';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
 
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold">
              Louis Poulin
            </Link>
          </div>

          <div className="hidden md:flex space-x-4">
            <Link href="/" className="hover:bg-blue-700 px-3 py-2 rounded-md">
              Accueil
            </Link>
            {isAuthenticated && (
              <>
                <Link href="/dashboard" className="hover:bg-blue-700 px-3 py-2 rounded-md">
                  Tableau de Bord
                </Link>
                <AppButton
                  onClick={handleLogout}
                >
                  Déconnexion
                </AppButton>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link href="/login" className="hover:bg-blue-700 px-3 py-2 rounded-md">
                 Se Connecter
                </Link>
                <Link href="/register" className="hover:bg-blue-700 px-3 py-2 rounded-md">
                  S'inscrire
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-3 py-2 rounded-md hover:bg-blue-800">
             Accueil
            </Link>
            {isAuthenticated && (
              <>
                <Link href="/dashboard" className="block px-3 py-2 rounded-md hover:bg-blue-800">
                    Tableau de Bord
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md hover:bg-blue-800"
                >
                  Déconnexion
                </button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link href="/login" className="block px-3 py-2 rounded-md hover:bg-blue-800">
                  Se Connecter
                </Link>
                <Link href="/register" className="block px-3 py-2 rounded-md hover:bg-blue-800">
                  S'inscrire
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;