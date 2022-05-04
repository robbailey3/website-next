import React from 'react';
import { PokemonDefinition } from '../../models/PokemonDefinition';
import pokemon from '../../services/pokemon';
import PokemonSprite from '../PokemonSprite/PokemonSprite';

export interface PokemonDetailsProps {
  id: string;
}

const PokemonDetails = (props: PokemonDetailsProps) => {
  const { id } = props;

  const [pokemonDefinition, setPokemonDefinition] =
    React.useState<PokemonDefinition>();

  const getPokemonDefinition = React.useCallback(async () => {
    const definition = await pokemon.getPokemonById(id);

    setPokemonDefinition(definition);
  }, [id]);

  React.useEffect(() => {
    getPokemonDefinition();
  }, [getPokemonDefinition]);

  if (!pokemonDefinition) {
    return null;
  }

  return (
    <>
      <PokemonSprite sprites={pokemonDefinition.sprites} />
      <pre>{JSON.stringify(pokemonDefinition, null, 4)}</pre>
    </>
  );
};

export default PokemonDetails;
