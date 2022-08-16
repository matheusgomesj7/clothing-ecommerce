import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart-dropdown.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import './navbar.styles.scss';

const NavBar = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen  } = useContext(CartContext)

  return (
    <Fragment>
      <nav className="navigation">
        <Link className="logo-container" to='/clothing-ecommerce'>
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN-OUT
            </span>
            ) : (
            <Link className="nav-link" to="auth">
              SIGN-IN
            </Link>
            )
          }
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </nav>
      <Outlet />
    </Fragment>
  )
}

export default NavBar;