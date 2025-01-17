import Cookies from 'js-cookie';

export const saveToken = (token: string) => {
  Cookies.set('auth_token', token, { expires: 30, secure: true, sameSite: 'Strict' });
};

export const getToken = () => {
  return Cookies.get('auth_token');
};

export const removeToken = () => {
  Cookies.remove('auth_token');
};