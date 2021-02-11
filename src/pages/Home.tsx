import { FC, useCallback, useState } from "react";
import styled from "@emotion/styled";

import { Loading, PageContainer, Search, PokemonCard } from "components";
import { colors, fontSize } from "style/primitive";
import { searchPokemonsByName } from "services/pokemon";
import { useAuthentication } from "context/authentication";
import { useFavorites } from "context/favorite";

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

const SingleComponentWrapper = styled(Wrapper)`
  margin: 40px 0;

  .not-found {
    font-size: ${fontSize.bigBody};
    font-weight: bold;
    color: ${colors.danger};
  }
`;

const ResultsWrapper = styled(SingleComponentWrapper)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 40px;
  row-gap: 60px;
`;

export const Home: FC = () => {
  const { user } = useAuthentication();
  const { favorites, removeFavorite, addFavorite } = useFavorites();
  const [searchResults, setSearchResults] = useState<Model.Pokemon[]>();
  const [loadingResults, setLoadingResults] = useState(false);

  const searchHasResults =
    !loadingResults && searchResults && searchResults.length > 0;
  const searchHasZeroResults =
    !loadingResults && searchResults && searchResults.length === 0;

  const favoritePokemonsIds = (favorites ?? []).map((f) => f.pokemon.id);

  const triggerSearch = useCallback(async function triggerSearch(
    pattern: string
  ) {
    setLoadingResults(true);
    const results = await searchPokemonsByName(pattern);
    setLoadingResults(false);
    setSearchResults(results);
  },
  []);

  const onFavoriteClicked = useCallback(
    function onFavoriteClicked(pokemonId: string) {
      if (favoritePokemonsIds.includes(pokemonId)) {
        const correspondingFav = (favorites ?? []).find(
          (f) => f.pokemon.id === pokemonId
        );

        if (correspondingFav) {
          removeFavorite(correspondingFav.id);
        }
      } else {
        addFavorite(pokemonId);
      }
    },
    [favoritePokemonsIds, addFavorite, removeFavorite, favorites]
  );

  return (
    <PageContainer>
      <Wrapper>
        <Title>Find your favorite Pokemon !</Title>
        <Search onSearch={triggerSearch} />
      </Wrapper>
      {loadingResults && (
        <SingleComponentWrapper>
          <Loading />
        </SingleComponentWrapper>
      )}
      {searchHasResults && (
        <ResultsWrapper>
          {searchResults?.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              showFavoriteButton={Boolean(user)}
              onFavoriteClicked={onFavoriteClicked}
              inUserFavList={favoritePokemonsIds.includes(pokemon.id)}
            />
          ))}
        </ResultsWrapper>
      )}
      {searchHasZeroResults && (
        <SingleComponentWrapper>
          <p className="not-found">I can't find any pokemons !!!!!</p>
        </SingleComponentWrapper>
      )}
    </PageContainer>
  );
};
