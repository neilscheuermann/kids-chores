import React, { useContext } from "react";
import { AuthContext } from "../../util/context";
import AuthNav from "./AuthNav";
import { NavBar, NavLink } from "./NavStyledComponents";

const Nav = () => {
  const { token } = useContext(AuthContext);

  return (
    <>
      <NavBar>
        <NavLink to="/" role="button">
          KidChores
        </NavLink>

        {token ? (
          <AuthNav />
        ) : (
          <NavLink to="/login" role="button">
            Login
          </NavLink>
        )}
      </NavBar>
    </>
  );
};

export default Nav;
