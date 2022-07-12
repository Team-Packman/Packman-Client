import React from 'react';
import styled from 'styled-components';

const Nav = () => {
  return (
    <StyledNav>
      <span>NAV</span>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  width: 100%;
  height: 4.5rem;
  background-color: grey;
`;

export default Nav;
