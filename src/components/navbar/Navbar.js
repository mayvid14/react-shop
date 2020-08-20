import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class NavBar extends React.Component {

  navLinks = () => (
    <>
      <LinkContainer to="/">
        <Nav.Link>Browse</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/add">
        <Nav.Link>Add</Nav.Link>
      </LinkContainer>
    </>
  )

  render() {
    return (
      <Navbar bg="dark" variant="dark" fixed="top">
        <LinkContainer to='/'>
          <Navbar.Brand>React Shop</Navbar.Brand>
        </LinkContainer>
        <Nav className="mr-auto">
          {this.navLinks()}
        </Nav>
      </Navbar>
    );
  }
}