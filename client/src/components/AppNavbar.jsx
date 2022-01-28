import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText,
  // NavLink,
} from "reactstrap";
import { useSelector } from "react-redux";

import Logout from "./auth/Logout";
import LoginModal from "./auth/LoginModal";
import RegisterModal from "./auth/RegisterModal";

function AppNavbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const { isAuthenticated, user } = useSelector(state => state.auth);

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
              <>
                <NavbarText className="me-3">
                  <strong>{user ? `Welcome ${user.name}` : ""}</strong>
                </NavbarText>
                <NavItem>
                  <Logout />
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <RegisterModal />
                </NavItem>
                <NavItem>
                  <LoginModal />
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default AppNavbar;
