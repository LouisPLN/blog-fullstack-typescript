import AppCard from "@/components/Card/AppCard";
import LoginForm from "@/components/Form/LoginForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <div>
      <AppCard>
        <LoginForm />
      </AppCard>
    </div>
  );
};

export default LoginPage;
