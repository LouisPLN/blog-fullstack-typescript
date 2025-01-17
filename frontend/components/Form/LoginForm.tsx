import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../../utils/api";
import FormInput from "./FormInput";
import Modal from "../Modal";
import { saveToken } from "@/utils/auth";
import router from "next/router";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const result = await loginUser(data.email, data.password);
      if (result.token) {
        saveToken(result.token);
      }
      router.push("/");
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Email"
          type="email"
          placeholder="Votre email"
          register={register}
          name="email"
          errors={errors.email}
        />
        <FormInput
          label="Mot de passe"
          type="password"
          placeholder="Votre mot de passe"
          register={register}
          name="password"
          errors={errors.password}
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Se connecter
        </button>
      </form>

      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        title="Erreur de connexion"
        customClass="bg-red-100"
      >
        <p className="text-center text-red-500">{errorMessage}</p>
      </Modal>
    </div>
  );
}
