import { FC, useCallback } from "react";
import styled from "@emotion/styled";

import { Loading, PageContainer, PokemonCard } from "components";
import { colors, fontSize } from "style/primitive";
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

export const Favorite: FC = () => {
  const { user } = useAuthentication();
  const { favorites, removeFavorite, addFavorite } = useFavorites();
  const favoritePokemonsIds = (favorites ?? []).map((f) => f.pokemon.id);

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
        <Title>This is your TEAM !!!</Title>
      </Wrapper>
      {!favorites && (
        <SingleComponentWrapper>
          <Loading />
        </SingleComponentWrapper>
      )}
      {favorites && (
        <ResultsWrapper>
          {favorites.map((fav) => (
            <PokemonCard
              key={fav.id}
              pokemon={fav.pokemon}
              showFavoriteButton={Boolean(user)}
              onFavoriteClicked={onFavoriteClicked}
              inUserFavList={favoritePokemonsIds.includes(fav.pokemon.id)}
            />
          ))}
        </ResultsWrapper>
      )}
      {favorites && favorites.length === 0 && (
        <SingleComponentWrapper>
          <p className="not-found">You don't have any favs !!!!! Add one :)</p>
        </SingleComponentWrapper>
      )}
    </PageContainer>
  );
};
