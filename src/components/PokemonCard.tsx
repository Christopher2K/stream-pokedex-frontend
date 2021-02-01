import { FC, useMemo } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { colors } from "style/primitive";

import { Button } from "components";

const centeredStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  border: 2px solid ${colors.ming};
  border-radius: 4px;
`;

const Header = styled.header`
  ${centeredStyle};
  width: 100%;
  margin-bottom: 20px;

  h2 {
    margin-bottom: 5px;
    text-align: center;
    line-height: 35px;
  }

  p {
    font-size: 11px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;

  img {
    margin-bottom: 20px;
    width: 30px;
    height: auto;

    &:last-of-type {
      margin-left: 10px;
    }
  }
`;

const Footer = styled.header`
  ${centeredStyle};
  width: 100%;
`;

export type PokemonCardProps = {
  pokemon: Model.Pokemon;
};

export const PokemonCard: FC<PokemonCardProps> = ({ pokemon }) => {
  const { name, generation, main_type, secondary_type } = pokemon;
  const imageUrl = useMemo(
    () =>
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.number}.png`,
    [pokemon.number]
  );

  return (
    <Root>
      <Header>
        <img src={imageUrl} alt={pokemon.name} />
        <h2>{name}</h2>
        <p>Generation: {generation}</p>
      </Header>
      <Content>
        <img src={`/type_icons/Icon_${main_type}.webp`} alt={main_type} />
        {secondary_type && (
          <img
            src={`/type_icons/Icon_${secondary_type}.webp`}
            alt={secondary_type}
          />
        )}
      </Content>
      <Footer>
        <Button>Show me more</Button>
      </Footer>
    </Root>
  );
};
