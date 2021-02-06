import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { logout } from '../../api/auth';
import './Header.css';
import { Button, SearchBox } from '../shared';
import { ReactComponent as Icon } from '../../assets/npop.svg';
import AuthContext from '../auth/Context';

const Header = ({ className, ...props }) => {
  const { isLogged, onLogout } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (!isLogged) {
      history.push('/');
    }
  }, [isLogged, history]);

  return (
    <>
      <header className={classNames('header', className)} {...props}>
        <Link to="/">
          <div className="header-logo">
            <Icon width="48" height="48" />
          </div>
        </Link>
        <SearchBox width="100%" />
        <nav className="header-nav">
          <Button
            as={Link}
            to="/adverts"
            variant="primary"
            className="header-button"
          >
            See all adverts
          </Button>
          {isLogged ? (
            <Button
              as={Link}
              to="/advert/new"
              variant="primary"
              className="header-button"
            >
              Sell something
            </Button>
          ) : (
            ''
          )}
          {isLogged ? (
            <Button
              className="header-button"
              onClick={() => logout().then(onLogout)}
            >
              Log out
            </Button>
          ) : (
            <Button as={Link} to="/login" className="header-button">
              Login
            </Button>
          )}
        </nav>
      </header>
      <div className="navigation-buttons-container">
        <Button
          className="back-button"
          navigation
          onClick={() => history.goBack()}
        >
          Back
        </Button>
      </div>
    </>
  );
};

export default Header;
