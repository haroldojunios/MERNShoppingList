import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  // NavLink,
} from "reactstrap";
import { useSelector } from "react-redux";

import Logout from "./auth/Logout";
import RegisterModal from "./auth/RegisterModal";

function AppNavbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <div>
      <Navbar color="dark" dark container expand="sm" className="mb-5">
        <NavbarBrand href="/">Shopping List</NavbarBrand>
        <NavbarToggler
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            {isAuthenticated ? (
              <NavItem>
                <Logout />
              </NavItem>
            ) : (
              <NavItem>
                <RegisterModal />
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default AppNavbar;
