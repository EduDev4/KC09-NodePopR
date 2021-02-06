import client from './client';

import storage from '../utils/storage';

export const login = crendentials =>
  client.login(crendentials).then(auth => {
    const { email, ok, token } = auth;
    if (crendentials.rememberme) {
      storage.set('auth', { email, ok, token });
    }
    return auth.email;
  });

export const logout = () =>
  client.logout().then(() => {
    storage.remove('auth');
    storage.remove('filters');
  });
