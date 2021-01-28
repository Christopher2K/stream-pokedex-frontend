import { FC, useCallback, useState } from "react";
import styled from "@emotion/styled";

import { PageContainer, Search } from "components";
import { colors, fontSize } from "style/primitive";
import { searchPokemonsByName } from "services/pokemon";

const Title = styled.h1`
  color: ${colors.ming};
  font-size: ${fontSize.bigTitle};
  text-align: center;
  margin-bottom: 50px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const Home: FC = () => {
  const [searchResults, setSearchResults] = useState<Model.Pokemon[]>([]);

  const triggerSearch = useCallback(async function triggerSearch(
    pattern: string
  ) {
    const results = await searchPokemonsByName(pattern);
    setSearchResults(results);
  },
  []);

  return (
    <PageContainer>
      <Wrapper>
        <Title>Find your favorite Pokemon !</Title>
        <Search onSearch={triggerSearch} />
      </Wrapper>

      {searchResults.map((pokemon) => (
        <div key={pokemon.id}>{pokemon.name}</div>
      ))}
    </PageContainer>
  );
};
