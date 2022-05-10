import Container from '@/components/common/Container/Container';
import PokemonList from '@/features/pokemon/components/PokemonList/PokemonList';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

const PokemonPage = () => {
  return (
    <>
      <Head>
        <title>Pokemon App / Projects / Rob Bailey</title>
      </Head>
      <Container>
        <div className="my-8 text-center">
          <Image
            src={'/pokemon_logo.svg'}
            alt="Pokemon Logo"
            width={269}
            height={99}
          />
        </div>
        <PokemonList />
      </Container>
    </>
  );
};

export default PokemonPage;
