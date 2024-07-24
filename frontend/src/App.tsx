import React, { useContext, useEffect } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap'; // Import Button
import { Outlet } from 'react-router-dom';
import logo from "../public/images/logo.png"; // Make sure the path to the logo is correct
import { Store } from './Store';

const App = () => {
  const {
    state: { mode },
    dispatch,
  } = useContext(Store);

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode);
  }, [mode]);

  const switchModeHandler = () => {
    dispatch({ type: 'SWITCH_MODE' });
  };

  return (
    <div className='d-flex flex-column vh-100'>
      <header>
        <Navbar expand='lg'>
          <Container>
            <Navbar.Brand href="/">
              <img 
                src={logo} 
                alt="Shoppy Logo" 
                height="45" 
                className="d-inline-block align-top me-2"
              />
              Shoppy
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Button variant={mode} onClick={switchModeHandler}>
                  <i className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}></i>
                </Button>
                <Nav.Link href="/cart">Cart</Nav.Link>
                <Nav.Link href="/signin">Sign In</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main className="flex-grow-1">
        <Container className='mt-3'>
          <Outlet />
        </Container>
      </main>
      <footer className="py-3 bg-light">
        <Container>
          <div className='text-center'>
            All rights reserved
          </div>
        </Container>
      </footer>
    </div>
  );
}

export default App;
