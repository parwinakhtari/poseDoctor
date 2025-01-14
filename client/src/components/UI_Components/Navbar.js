import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";

const NavbarComp = () => {
  const [collapsed, setCollapsed] = useState(true);
  function toggleNavbar() {
    setCollapsed(!collapsed);
  }
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <div>
      <div>
        <Navbar color="faded" light>
          <Container>
            <NavbarBrand
              href="/"
              className="mr-auto"
              style={{ fontFamily: "Monoton", fontSize: "40px" }}
            >
              PoseDoc
            </NavbarBrand>
            <NavLink href="/profile" style={{marginRight:'10px'}}>Profile &nbsp;<i className="fa-solid fa-user"></i></NavLink>
            <NavbarToggler onClick={toggleNavbar} className="mr-2" />
            <Collapse isOpen={!collapsed} navbar>
              <Nav navbar>
                {!localStorage.getItem("token") ? (
                  <>
                    <NavItem>
                      <NavLink href="/register">Register</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/login">Login</NavLink>
                    </NavItem>
                  </>
                ) : (
                  <NavItem>
                    <button onClick={handleLogout} className="btn btn-primary">
                      LOGOUT
                    </button>
                  </NavItem>
                )}
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Demo(Login Not Required)
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <NavLink href="/squatsDemo">Squats</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink href="/rightHandExtensionDemo">
                        Right Hand Extension
                      </NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink href="/lungesDemo">Lunges</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Exercises
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <NavLink href="/squats">Squats</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink href="/handExtension">Hand Extension</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink href="/rightHandExtension">
                        Right Hand Extension
                      </NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink href="/lunges">Lunges</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink href="/shoulderExtension">
                        Shoulder Extension
                      </NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    AROM
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <NavLink href="/arom_flexion">AROM Flexion</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink href="/arom_lateral_flexion">
                        AROM Lateral Flexion
                      </NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};

export default NavbarComp;
