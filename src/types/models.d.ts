declare namespace Model {
  enum PokemonType {
    Bug = "Bug",
    Fire = "Fire",
    Normal = "Normal",
    Dark = "Dark",
    Flying = "Flying",
    Poison = "Poison",
    Dragon = "Dragon",
    Ghost = "Ghost",
    Psychic = "Psychic",
    Electric = "Electric",
    Grass = "Grass",
    Rock = "Rock",
    Fairy = "Fairy",
    Ground = "Ground",
    Steel = "Steel",
    Fighting = "Fighting",
    Ice = "Ice",
    Water = "Water",
  }

  type Pokemon = {
    id: string;
    name: string;
    number: number;
    main_type: PokemonType;
    secondary_type?: PokemonType;
    hp: number;
    atk: number;
    defense: number;
    spe_atk: number;
    spe_def: number;
    speed: number;
    generation: number;
    legendary: boolean;
  };

  type UserProfile = {
    id: string;
    username: string;
  };

  type AuthenticatedUser = UserProfile & {
    firebaseId: string;
  };
}
