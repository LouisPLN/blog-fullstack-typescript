import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import AppButton from "../Button/AppButton";
import ToggleThemeButton from "../Button/ToggleThemeButton";

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="mx-auto h-full max-w-7xl flex items-center justify-between gap-3">
      <div className="lg:flex-1 flex items-center gap-1.5">
        <Link href="/" className="text-2xl font-bold">
          Louis <span className="text-green-600">Poulin</span>
        </Link>
      </div>
      <div className="flex items-center justify-end lg:flex-1 gap-4">
        <Link
          href="/"
          className="text-sm font-medium hidden lg:inline-block relative"
        >
          Accueil
        </Link>
        <Link
          href="/blog"
          className="text-sm font-medium hidden lg:inline-block relative"
        >
          Blog
        </Link>
        {isAuthenticated ? (
          <>
            <Link
              href="/dashboard"
              className="text-sm font-medium hidden lg:inline-block relative"
            >
              Tableau de Bord
            </Link>
            <AppButton size="sm" onClick={handleLogout}>
              Déconnexion
            </AppButton>
          </>
        ) : (
          <Link href="/auth/login">
            <AppButton size="sm">Se connecter</AppButton>
          </Link>
        )}
        <ToggleThemeButton />
      </div>
    </nav>
  );
};

export default Navbar;
