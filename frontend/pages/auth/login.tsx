import AppCard from "@/components/Card/AppCard";
import LoginForm from "@/components/Form/LoginForm";
import H1 from "@/components/Typo/H1";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { KeyRound } from "lucide-react";
import Paragraph from "@/components/Typo/Paragraph";

const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/profile/dashboard");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <div>
      <AppCard>
        <div className="flex flex-col justify-center items-center w-full mb-6 space-y-4">
          <KeyRound size={36} />
          <H1 size="md" className="text-center">
            Accédez à votre espace personnel
          </H1>
          <Paragraph size="sm" className="text-center">
            Seules les personnes disposant d'un compte administrateur peuvent
            accéder à cette plateforme.
          </Paragraph>
        </div>
        <LoginForm />
      </AppCard>
    </div>
  );
};

export default LoginPage;
