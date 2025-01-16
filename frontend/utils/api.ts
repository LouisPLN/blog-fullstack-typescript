import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333'; // URL de ton backend

// Fonction pour se connecter
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data; // Contient le token et les infos de l'utilisateur
  } catch (error) {
    console.error("Error during login:", error);
    throw error; // On renvoie l'erreur pour l'afficher
  }
};