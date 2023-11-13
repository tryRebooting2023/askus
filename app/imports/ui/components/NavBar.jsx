import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, List, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <Image src="/images/its_logo_uppercase_out.png" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end ms-auto">
            <NavDropdown title={<List />} id="basic-nav-dropdown" className="menu-dropdown">
              <NavDropdown.Item id="home" title="Home">
                <a href="https://www.hawaii.edu/its/" target="_blank" rel="noopener noreferrer" className="menu-link">
                  Home
                </a>
              </NavDropdown.Item>
              <NavDropdown.Item id="about" title="About">
                <a href="https://www.hawaii.edu/its/about/" target="_blank" rel="noopener noreferrer" className="menu-link">
                  About
                </a>
              </NavDropdown.Item>
              <NavDropdown.Item id="new" title="News">
                <a href="https://www.hawaii.edu/its/category/news//" target="_blank" rel="noopener noreferrer" className="menu-link">
                  News
                </a>
              </NavDropdown.Item>
              <NavDropdown.Item id="contact" title="Contact">
                <a href="https://www.hawaii.edu/its/contact/" target="_blank" rel="noopener noreferrer" className="menu-link">
                  Contact
                </a>
              </NavDropdown.Item>
            </NavDropdown>
            {currentUser === '' ? (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                  <PersonFill />
                  Sign
                  in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign
                  up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="navbar-current-user" title={currentUser}>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign
                  out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
