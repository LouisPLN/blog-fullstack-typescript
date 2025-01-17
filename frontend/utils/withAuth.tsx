import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const withAuth = (WrappedComponent: React.FC) => {
  const RequiresAuth = (props: any) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/login"); // Redirige les utilisateurs non connectés
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return null; // Affiche rien en attendant la redirection
    }

    return <WrappedComponent {...props} />;
  };

  return RequiresAuth;
};

export default withAuth;