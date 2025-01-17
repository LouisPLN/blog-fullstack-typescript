import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';

// Fonction pour se connecter
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      throw new Error('Identifiants incorrects, veuillez réessayer.');
    } else {
      throw new Error('Une erreur est survenue, veuillez réessayer.');
    }
  }
};