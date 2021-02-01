import { FC } from "react";
import styled from "@emotion/styled";
import { colors } from "style/primitive";

const Root = styled.div`
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  border: 2px solid ${colors.ming};
  border-radius: 4px;
`;

const Header = styled.header`
  width: 100%;
`;

const Content = styled.div`
  width: 100%;
`;

const Footer = styled.header`
  width: 100%;
`;

export type PokemonCardProps = {
  pokemon: Model.Pokemon;
};

export const PokemonCard: FC<PokemonCardProps> = ({ pokemon }) => {
  const { name, generation, main_type, secondary_type } = pokemon;
  return (
    <Root>
      <Header>
        <h2>{name}</h2>
        <p>Generation: {generation}</p>
      </Header>
      <Content>
        {main_type} {secondary_type}
      </Content>
      <Footer>
        <button>Show me more</button>
      </Footer>
    </Root>
  );
};
