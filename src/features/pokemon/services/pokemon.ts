import axios, { AxiosInstance } from 'axios';
import { PokemonDefinition } from '../models/PokemonDefinition';
import { Pokemon } from '../models/pokemon';
import { Species, Variety } from '../models/species';
import { SpeciesListingResponse } from '../responses/speciesListing';

class PokemonService {
  private axios: AxiosInstance = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
  });

  public async getList(limit = 25, offset = 0): Promise<any> {
    const result = await this.axios.get<SpeciesListingResponse>(
      'pokemon-species',
      { params: { limit, offset } }
    );

    const species = await Promise.all(
      result.data.results.map(async (species) => {
        const speciesResult = await this.axios.get<Species>(species.url);

        const pokemon = await speciesResult.data.varieties
          .filter((variety: Variety) => variety.is_default)
          .map<Promise<Pokemon>>(async (variety: Variety) => {
            const pokemonResult = await this.axios.get<any>(
              variety.pokemon.url
            );
            return pokemonResult.data;
          })
          .at(0);

        return { ...speciesResult.data, ...pokemon };
      })
    );

    return { count: result.data.count, data: species };
  }

  private async getSpecies(id: string): Promise<Species> {
    const result = await this.axios.get<Species>(`pokemon-species/${id}`);
    return result.data;
  }

  private async getPokemon(name: string): Promise<any> {
    const result = await this.axios.get<Species>(`pokemon/${name}`);
    return result.data;
  }
}

export default new PokemonService();
