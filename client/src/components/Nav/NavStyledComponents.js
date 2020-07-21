import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
`;

export const AuthNavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const NavItem = styled.div`
  padding: 10px;
`;

export const NavLink = styled(Link)`
  padding: 10px;
`;
