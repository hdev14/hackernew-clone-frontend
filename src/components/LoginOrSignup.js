import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { AUTH_TOKEN } from '../constants';
import { LOGIN_MUTATION, SIGNUP_MUTATION } from '../graphql/mutations';

const LoginOrSignup = () => {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const saveUserData = (token) => {
    localStorage.setItem(AUTH_TOKEN, token);
  };

  const confirm = (data) => {
    const { token } = isLogin ? data.login : data.signup;
    saveUserData(token);
    history.push('/');
  };

  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => confirm(data),
  });

  const [signup] = useMutation(SIGNUP_MUTATION, {
    onCompleted: (data) => confirm(data),
  });

  const onSubmit = () => {
    if (isLogin && email && password) {
      login({ variables: { email, password } });
      setEmail('');
      setPassword('');
      return;
    }

    if (name && email && password) {
      signup({ variables: { name, email, password } });
      setName('');
      setEmail('');
      setPassword('');
    }
  };
  return (
    <div>
      <h4 className="mv3">{isLogin ? 'Login' : 'Sign Up'}</h4>
      <div className="flex flex-column">
        {!isLogin && (
          <input
            type="text"
            placeholder="Your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Your email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Choose a safe password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex mt3">
        <div
          className="pointer mr2 button"
          role="button"
          tabIndex={0}
          onClick={() => onSubmit()}
          onKeyPress={() => onSubmit()}
        >
          {isLogin ? 'login' : 'create account'}
        </div>
        <div
          className="pointer button"
          role="button"
          tabIndex={0}
          onClick={() => setIsLogin(!isLogin)}
          onKeyPress={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'need to create an account?' : 'already have an account'}
        </div>
      </div>
    </div>
  );
};

export default LoginOrSignup;
