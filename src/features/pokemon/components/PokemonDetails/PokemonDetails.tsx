import React from 'react';
import { PokemonDefinition } from '../../models/PokemonDefinition';
import pokemon from '../../services/pokemon';
import PokemonSprite from '../PokemonSprite/PokemonSprite';
import PokemonStatsChart from '../PokemonStatsChart/PokemonStatsChart';

export interface PokemonDetailsProps {
  id: string;
}

const PokemonDetails = (props: PokemonDetailsProps) => {
  const { id } = props;

  const [pokemonDefinition, setPokemonDefinition] =
    React.useState<PokemonDefinition>();

  const capitalise = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getFlavorText = (): string => {
    if (!pokemonDefinition) {
      return '';
    }
    const flavorText = pokemonDefinition.flavor_text_entries.find(
      (fl) => fl.language.name === 'en'
    );
    if (!flavorText) {
      return '';
    }
    return flavorText.flavor_text;
  };

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
      <section className="flex flex-wrap my-4">
        <div className="w-full md:w-1/2 p-4">
          <h1>{capitalise(pokemonDefinition.name)}</h1>
          <p>{getFlavorText()}</p>
          <p>
            <span>Weight: </span>
            <span>{pokemonDefinition.weight}lbs</span>
          </p>
          <p>
            <span>Height: </span>
            <span>{pokemonDefinition.height * 10}cm</span>
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <PokemonSprite
            sprites={pokemonDefinition.sprites}
            pokemonName={pokemonDefinition.name}
          />
        </div>
      </section>
      <section>
        <PokemonStatsChart stats={pokemonDefinition.stats} />
      </section>
      <pre>{JSON.stringify(pokemonDefinition, null, 4)}</pre>
    </>
  );
};

export default PokemonDetails;
