import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { userSelector } from '../../redux/selectors/user';
import { userLogin, userLogout } from '../../redux/dispatchers/user';
import { LoginModal } from '../login/LoginModal';
import logo from '../../logo.svg';

const NavBar = props => {
  const { user, login, logout } = props;
  const [show, showLogin] = useState(false);

  const navLinks = <>
    <LinkContainer to="/">
      <Nav.Link>Browse all items</Nav.Link>
    </LinkContainer>
    {user ? <LinkContainer to="/add">
      <Nav.Link>Add a product</Nav.Link>
    </LinkContainer> : <></>}
  </>

  const displayLogin = <Nav.Link onClick={() => showLogin(true)}>Login</Nav.Link>;
  const displayUser = () => (
    <>
      <Navbar.Text>
        Logged in as: {user.username}
      </Navbar.Text>
      <Navbar.Brand>
        <img
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Logged in user"
        />
      </Navbar.Brand>
      <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
    </>
  );

  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <LinkContainer to='/'>
        <Navbar.Brand>React Shop</Navbar.Brand>
      </LinkContainer>
      <Nav className="mr-auto">
        {navLinks}
      </Nav>
      <Nav>
        {user ? displayUser() : displayLogin}
      </Nav>
      <LoginModal show={show} handleNo={() => showLogin(false)} handleYes={login} />
    </Navbar>
  );
}

const mapStateToProps = state => ({
  user: userSelector(state),
});

const mapDispatchToProps = dispatch => ({
  login: userLogin(dispatch),
  logout: userLogout(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);