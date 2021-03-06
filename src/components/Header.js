import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { AUTH_TOKEN } from '../constants';

const Header = () => {
  const history = useHistory();
  const [authToken, setAuthToken] = useState(localStorage.getItem(AUTH_TOKEN));

  const logOut = () => {
    localStorage.removeItem(AUTH_TOKEN);
    setAuthToken('');
    history.push('/');
  };

  return (
    <div className="flex pa1 justify-between nowrap orange">
      <div className="flex flex-fixed black">
        <div className="fw7 mr1">Harker News</div>

        <Link to="/top" className="ml1 no-underline black">top</Link>

        <div className="ml1">|</div>
        <Link to="/" className="ml1 no-underline black">new</Link>

        <div className="ml1">|</div>
        <Link to="/search" className="ml1 no-underline black">search</Link>

        {authToken && (
          <>
            <div className="ml1">|</div>
            <Link to="/create" className="ml1 no-underline black">submit</Link>
          </>
        )}
      </div>

      <div className="flex flex-fixed">
        {authToken ? (
          <div
            className="ml1 pointer black"
            role="button"
            tabIndex={0}
            onClick={logOut}
            onKeyPress={logOut}
          >
            logout
          </div>
        ) : (
          <Link to="/login-or-signup" className="ml1 no-underline black">Login or Signup</Link>
        )}
      </div>
    </div>
  );
};

export default Header;
