import { API_ROOT } from "settings";

export async function searchPokemonsByName(
  pattern: string
): Promise<Model.Pokemon[]> {
  const url = `${API_ROOT}/pokemon?query=${encodeURIComponent(pattern)}`;
  const response = await fetch(url);
  const data = await (response.json() as Promise<Model.Pokemon[]>);
  return data;
}
