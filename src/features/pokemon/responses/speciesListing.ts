import { SpeciesListing } from '../models/speciesListing';
import { PokemonListingResponse } from './pokemonListingResponse';

export type SpeciesListingResponse = PokemonListingResponse<SpeciesListing>;
