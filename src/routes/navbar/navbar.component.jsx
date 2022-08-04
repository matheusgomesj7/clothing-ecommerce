import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import './navbar.styles.scss';

const NavBar = () => {

  return (
    <Fragment>
      <nav className="navigation">
        <Link className="logo-container" to='/'>
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="shop">
            SHOP
          </Link>
          <Link className="nav-link" to="auth">
          SIGN-IN
        </Link>
        </div>
      </nav>
      <Outlet />
    </Fragment>
  )
}

export default NavBar;