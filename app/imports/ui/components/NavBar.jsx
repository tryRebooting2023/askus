import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, List, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import DarkToggleMode from './DarkToggleMode';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);
  const { isAdmin } = useTracker(() => ({
    isAdmin: Roles.userIsInRole(Meteor.userId(), 'admin'),
  }), []);

  return (
    <Navbar bg="light" expand="lg" className="fixed-top">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <Image src="/images/its_logo_uppercase_out.png" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <DarkToggleMode />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end ms-auto">
            <NavDropdown title={<List />} id="menu-dropdown" className="menu-dropdown">
              <NavDropdown.Item id="home" title="Home" as={NavLink} to="https://www.hawaii.edu/its/" target="_blank" rel="noopener noreferrer">
                Home
              </NavDropdown.Item>
              <NavDropdown.Item id="about" title="About" as={NavLink} to="https://www.hawaii.edu/its/about/" target="_blank" rel="noopener noreferrer">
                About
              </NavDropdown.Item>
              <NavDropdown.Item id="news" title="News" as={NavLink} to="https://www.hawaii.edu/its/category/news/" target="_blank" rel="noopener noreferrer">
                News
              </NavDropdown.Item>
              <NavDropdown.Item className="contact" title="Contact" as={NavLink} to="https://www.hawaii.edu/its/contact/" target="_blank" rel="noopener noreferrer">
                Contact
              </NavDropdown.Item>
              <NavDropdown.Item className="menu-link tutorial-link" id="tutorial-nav" title="Tutorial" as={NavLink} to="/tutorial">
                Tutorial
              </NavDropdown.Item>
              <NavDropdown.Item className="dark-mode-toggle" id="dark-mode-toggle">
                <DarkToggleMode />
              </NavDropdown.Item>
            </NavDropdown>
            {isAdmin ? (
              <NavLink to="/analytics" className="nav-link" id="analytics-nav">
                Analytics
              </NavLink>
            ) : ''}
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
