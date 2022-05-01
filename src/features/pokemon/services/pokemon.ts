import axios, { AxiosInstance } from 'axios';
import { Species } from '../models/species';
import { SpeciesListing } from '../models/speciesListing';
import { SpeciesListingResponse } from '../responses/speciesListing';

class PokemonService {
  private axios: AxiosInstance = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
  });

  public async getSpeciesList(limit = 25, offset = 0): Promise<Species[]> {
    const result = await this.axios.get<SpeciesListingResponse>(
      'pokemon-species',
      { params: { limit, offset } }
    );

    const species = result.data.results.map(async (species) => {
      const speciesResult = await this.axios.get<Species>(species.url);
      return speciesResult.data;
    });

    return Promise.all(species);
  }

  private async getSpecies(id: string): Promise<Species> {
    const result = await this.axios.get<Species>(`pokemon-species/${id}`);
    return result.data;
  }
}

export default new PokemonService();
