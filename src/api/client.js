import axios from 'axios';

const { REACT_APP_API_BASE_URL: baseURL } = process.env;

const { REACT_APP_API_VERSION_URL: apiVersion } = process.env;

const client = axios.create({
  baseURL,
});

const setAuthorizationHeader = token => {
  client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const removeAuthorizationHeader = () => {
  delete client.defaults.headers.common['Authorization'];
};

client.login = credentials =>
  client.post(`${apiVersion}/auth/login`, credentials).then(auth => {
    setAuthorizationHeader(auth.token);
    auth.email = credentials.email;
    return auth;
  });

// Logout method
client.logout = () =>
  new Promise(resolve => {
    // Remove Authorization header
    removeAuthorizationHeader();
    resolve();
  });

client.interceptors.response.use(
  response => {
    console.log(response.data);
    return response.data;
  },
  error => {
    console.log(error);
    if (!error.response) {
      return Promise.reject({ message: error.message });
    }
    return Promise.reject({
      message: error.response.statusText,
      ...error.response.data,
    });
  },
);

export const configureClient = token => {
  if (token) {
    setAuthorizationHeader(token);
  }
};

export default client;
