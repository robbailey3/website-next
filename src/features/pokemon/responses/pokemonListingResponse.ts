export interface PokemonListingResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
