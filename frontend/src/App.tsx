import { useContext, useEffect } from 'react';
import {
  Badge,
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap'
import { Outlet, Link } from 'react-router-dom';
import CartImg from '../public/images/cart_icon.png';
import logo from '../public/images/logo.png';
import { LinkContainer } from 'react-router-bootstrap';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Store } from './Store';

const App = () => {
  const {
    state: { mode, cart, userInfo },
    dispatch,
  } = useContext(Store);

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode);
  }, [mode]);

  const switchModeHandler = () => {
    dispatch({ type: 'SWITCH_MODE' });
  };
  const signoutHandler = () => {
    dispatch({ type: 'USER_SIGNOUT' })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    window.location.href = '/signin'
  }

  return (
    <div className="d-flex flex-column vh-100">
      <ToastContainer position='bottom-center' limit={1}/>
      <header>
        <Navbar expand="lg">
          <Container>
            <LinkContainer to="/">
            <Navbar.Brand as={Link} to="/">
              <img
                src={logo}
                alt="Shoppy Logo"
                height="45"
                className="d-inline-block align-top me-2"
              />
              Shoppy
            </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto align-items-center">
                <Button variant={mode} onClick={switchModeHandler} className="me-2">
                  <i className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}></i>
                </Button>
                <Nav.Link as={Link} to="/cart" className="d-flex align-items-center">
                  <img src={CartImg} alt="Cart" className="me-1" />
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Nav.Link>
                {userInfo ? (
              <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                <Link
                  className="dropdown-item"
                  to="#signout"
                  onClick={signoutHandler}
                >
                  Sign Out
                </Link>
              </NavDropdown>
            ) : (
              <Link className="nav-link" to="/signin">
                Sign In
              </Link>
            )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main className="flex-grow-1">
        <Container className="mt-3">
          <Outlet />
        </Container>
      </main>
      <footer className="py-3 bg-light">
        <Container>
          <div className="text-center">
            All rights reserved
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default App;
