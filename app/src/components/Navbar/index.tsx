import React from 'react';
import './styles.css';
import { NavLink as Link } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';

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
            <NavItem key={key}>
              <Link to={route.path} className="nav-link" activeClassName="selected-page">{route.name}</Link>
            </NavItem>
          ))
        }
      </Nav>
      <div className="scallop"></div>
    </div>
  )
}

export default Navbar;