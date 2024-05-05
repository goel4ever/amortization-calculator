import React from 'react';
import {Container, Navbar} from 'react-bootstrap';
import './Header.css';

const Header = props => (
  <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="#home">Amortization Calculator</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          created by: <a href="https://github.com/goel4ever" target="_blank" rel="noreferrer">{props.developer}</a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Header
