import Cookies from 'js-cookie';

export const saveToken = (token: string) => {
  Cookies.set('auth_token', token, { expires: 1 }); // Sauvegarde du token dans un cookie
};

export const getToken = () => {
  return Cookies.get('auth_token'); // Récupère le token du cookie
};

export const removeToken = () => {
  Cookies.remove('auth_token'); // Supprime le token du cookie
};