import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../../utils/api";
import FormInput from "../Input/FormInput";
import Modal from "../Modal/Modal";
import AppButton from "../Button/AppButton";
import { useAuth } from "@/context/AuthContext";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const result = await loginUser(data.email, data.password);

      if (result.token) {
        login();
      }

      setIsModalOpen(false);
    } catch (error: any) {
      let message = "Une erreur est survenue, veuillez réessayer.";

      if (error) {
        message = "Identifiants incorrects, veuillez réessayer.";
      } else {
        message = "Erreur de connexion, veuillez vérifier votre réseau.";
      }

      setErrorMessage(message);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormInput
          label="Email*"
          type="email"
          placeholder="Votre email"
          register={register}
          name="email"
        />
        <FormInput
          label="Mot de passe*"
          type="password"
          placeholder="Votre mot de passe"
          register={register}
          name="password"
        />
        <AppButton type="submit" className="w-full">
          Se connecter
        </AppButton>
      </form>

      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        title="Erreur de connexion"
      >
        <p className="text-center text-red-600 dark:text-red-700">
          {errorMessage}
        </p>
      </Modal>
    </div>
  );
}
