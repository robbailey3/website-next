import Container from '@/components/common/Container/Container';
import PokemonList from '@/features/pokemon/components/PokemonList/PokemonList';
import { Species } from '@/features/pokemon/models/species';
import { SpeciesListing } from '@/features/pokemon/models/speciesListing';
import Head from 'next/head';
import React from 'react';

const PokemonPage = () => {
  return (
    <>
      <Head>
        <title>Pokemon App / Projects / Rob Bailey</title>
      </Head>
      <Container>
        <h1>Pokemon Page</h1>
        <p>This is the pokemon page.</p>
        <PokemonList />
      </Container>
    </>
  );
};

export default PokemonPage;
