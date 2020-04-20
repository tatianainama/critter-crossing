import React from 'react';
import './styles.css';
import { NavLink as Link } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';

type NavbarProps = {
  routes: {
    path: string,
    name: string,
    exact?: boolean,
    component: React.FunctionComponent
  }[]
}

const Navbar: React.FunctionComponent<NavbarProps> = ({ routes }) => {
  return (
    <div className="cc-navbar">
      <Nav>
        {
          routes.map((route, key) => (
            <NavItem>
              <Link to={route.path} className="nav-link" activeClassName="selected-page" key={key}>{route.name}</Link>
            </NavItem>
          ))
        }
      </Nav>
      <div className="scallop"></div>
    </div>
  )
}

export default Navbar;