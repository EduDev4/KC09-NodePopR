/* o Formulario con inputs para recoger email y password del usuario.
o Checkbox “Recordar contraseña” mediante el que indicaremos que guardamos en el
localStorage los datos de la session de usuario, evitando tener que introducir
credenciales en cada visita la sitio */
import React, { useState } from 'react';
import T from 'prop-types';
import useForm from '../../../hooks/useForm';

import { login } from '../../../api/auth';
import { Button, FormField } from '../../shared';
import storage from '../../../utils/storage';

import './LoginPage.css';

const auth = storage.get('auth') || { email: null, token: null, ok: false };

function LoginPage({ onLogin, history }) {
  const [form, onChange] = useForm({
    email: '',
    password: '',
    rememberme: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const { email, password, rememberme } = form;

  const handleSubmit = async event => {
    const crendentials = form;
    event.preventDefault();
    setSubmitting(true);
    try {
      console.log(crendentials);
      const email = await login(crendentials);
      setError(null);
      onLogin(email).then(() => {
        history.push('/');
      });
    } catch (error) {
      setError(error);
    } finally {
      setSubmitting(false);
    }
  };

  const canSubmit = () => {
    return !submitting && email && password;
  };

  return (
    <div className="loginPage">
      <div className="loginPage-container">
        <h1 className="loginPage-title">Log in to Nodepop</h1>
        <form onSubmit={handleSubmit}>
          <FormField
            type="text"
            name="email"
            label="phone, email or username"
            className="loginPage-field"
            value={email}
            onChange={onChange}
          />
          <FormField
            type="password"
            name="password"
            label="password"
            className="loginPage-field"
            value={password}
            onChange={onChange}
          />
          <FormField
            type="checkbox"
            name="rememberme"
            label="Remember me!"
            className="loginPage-field"
            value={rememberme}
            onChange={onChange}
          />
          <br></br>
          <Button
            type="submit"
            className="loginPage-submit"
            variant="primary"
            disabled={!canSubmit()}
          >
            Log in
          </Button>
        </form>
        {error && <div className="loginPage-error">{error.message}</div>}
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  onLogin: T.func.isRequired,
  history: T.shape({ push: T.func.isRequired }).isRequired,
};

export default LoginPage;
