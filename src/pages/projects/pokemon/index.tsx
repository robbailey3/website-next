import Container from '@/components/common/Container/Container';
import PokemonList from '@/features/pokemon/components/PokemonList/PokemonList';
import { Species } from '@/features/pokemon/models/species';
import { SpeciesListing } from '@/features/pokemon/models/speciesListing';
import React from 'react';

const PokemonPage = () => {
  return (
    <Container>
      <h1>Pokemon Page</h1>
      <p>This is the pokemon page.</p>
      <PokemonList />
    </Container>
  );
};

export default PokemonPage;
