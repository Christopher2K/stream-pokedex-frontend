import { FC } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Color from "color";

import { ReactComponent as PokeballsIcon } from "assets/icon/pokeballs.svg";
import { colors, keySizes } from "style/primitive";
import { useAuthentication } from "context/authentication";

const Root = styled.nav`
  width: 100%;
  height: 70px;
  background-color: ${colors.ming};
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  max-width: ${keySizes.maxWidth};
  height: 100%;
  margin: 0 auto;
`;

const HomeIcon = styled(PokeballsIcon)`
  height: 80%;
  width: auto;
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  color: white;
  font-weight: bold;

  height: 100%;
  width: auto;
  padding: 0 10px;
  &:hover {
    background-color: ${Color(colors.ming).darken(0.3).hex()};
  }
`;

const MenuItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
`;

export const Navbar: FC = () => {
  const { user } = useAuthentication();

  return (
    <Root>
      <Content>
        <StyledLink to="/">
          <HomeIcon />
        </StyledLink>
        <MenuItemsContainer>
          {!user ? (
            <>
              <StyledLink to="/signup">Signup</StyledLink>
              <StyledLink to="/signin">Signin</StyledLink>
            </>
          ) : (
            <>
              <StyledLink to="/favorites">Favorites</StyledLink>
              <StyledLink to="/logout">Logout</StyledLink>
            </>
          )}
        </MenuItemsContainer>
      </Content>
    </Root>
  );
};
