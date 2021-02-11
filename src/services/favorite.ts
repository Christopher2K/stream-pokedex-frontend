import { API_ROOT } from "settings";

export class FavoriteService {
  static URL = `${API_ROOT}/favorite`;

  constructor(private idToken: string) {}

  getFavorites = async () => {
    const response = await fetch(FavoriteService.URL, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${this.idToken}`,
      }),
    });

    const data = (await response.json()) as Array<Model.Favorite>;
    return data;
  };

  addFavorite = async (pokemonId: string) => {
    const response = await fetch(FavoriteService.URL, {
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${this.idToken}`,
      }),
      body: JSON.stringify({
        pokemon_id: pokemonId,
      }),
    });

    const data = (await response.json()) as Model.Favorite;
    return data;
  };

  removeFavorite = async (favoriteId: string) => {
    await fetch(`${FavoriteService.URL}/${favoriteId}`, {
      method: "DELETE",
      headers: new Headers({
        Authorization: `Bearer ${this.idToken}`,
      }),
    });
  };
}
