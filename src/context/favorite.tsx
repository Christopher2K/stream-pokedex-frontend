import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { FavoriteService } from "services/favorite";
import { useAuthentication } from "./authentication";

type FavoriteContextData = {
  favorites: Model.Favorite[] | undefined;
  addFavorite(pokemonId: string): void;
  removeFavorite(favoriteId: string): void;
};

const FavoriteContext = createContext<FavoriteContextData | null>(null);

export const FavoriteContextProvider: FC = ({ children }) => {
  const { idToken } = useAuthentication();
  const [favorites, setFavorites] = useState<Model.Favorite[] | undefined>();

  const serviceRef = useRef<FavoriteService>();

  const addFavorite = useCallback(
    async function addFavorite(pokemonId: string) {
      if (serviceRef.current) {
        const newFav = await serviceRef.current.addFavorite(pokemonId);
        setFavorites([...(favorites ?? []), newFav]);
      }
    },
    [favorites]
  );

  const removeFavorite = useCallback(
    async function removeFavorite(favoriteId: string) {
      if (serviceRef.current) {
        await serviceRef.current.removeFavorite(favoriteId);
        setFavorites((favorites ?? []).filter((f) => f.id !== favoriteId));
      }
    },
    [favorites]
  );

  useEffect(() => {
    if (idToken) {
      serviceRef.current = new FavoriteService(idToken);
      serviceRef.current.getFavorites().then((fav) => setFavorites(fav));
    }
  }, [idToken]);

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export function useFavorites(): FavoriteContextData {
  const context = useContext(FavoriteContext);

  if (context == null) {
    throw new Error("Muse be used inside FavoriteContextProvider");
  }

  return context;
}
