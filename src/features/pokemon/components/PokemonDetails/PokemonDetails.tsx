import React from 'react';
import { PokemonDefinition } from '../../models/PokemonDefinition';
import pokemon from '../../services/pokemon';
import PokemonPageNav from '../PokemonPageNav/PokemonPageNav';
import PokemonSprite from '../PokemonSprite/PokemonSprite';
import PokemonStatsChart from '../PokemonStatsChart/PokemonStatsChart';
import PokemonTypeBadge from '../PokemonTypeBadge/PokemonTypeBadge';

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
      <PokemonPageNav id={id} />
      <section className="flex flex-wrap my-4">
        <div className="w-full md:w-1/2 p-4">
          <div>
            <h1>{capitalise(pokemonDefinition.name)}</h1>
            <div></div>
            <div>
              {pokemonDefinition.types.map((type) => (
                <PokemonTypeBadge type={type.type.name} key={type.slot} />
              ))}
            </div>
            <p>{getFlavorText()}</p>
            <p>
              <span>Weight: </span>
              <span>{pokemonDefinition.weight}lbs</span>
            </p>
            <p>
              <span>Height: </span>
              <span>{pokemonDefinition.height * 10}cm</span>
            </p>
            <p>
              <span>Catch Rate: </span>
              <span>{pokemonDefinition.capture_rate}</span>
            </p>
            <p>
              <span>Base Happiness: </span>
              <span>{pokemonDefinition.base_happiness}</span>
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <PokemonSprite
            sprites={pokemonDefinition.sprites}
            pokemonName={pokemonDefinition.name}
          />
          <PokemonStatsChart stats={pokemonDefinition.stats} />
        </div>
      </section>
      <section className="w-full md:w-1/2">
        <div>
          <h3>Moves</h3>
          <table className="border shadow-sm w-full">
            <thead className="bg-teal-700 text-white text-left">
              <tr>
                <th className="p-2">Move Name</th>
              </tr>
            </thead>
            <tbody>
              {pokemonDefinition.moves.map((move) => (
                <tr key={move.move.name}>
                  <td className="p-2">{move.move.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default PokemonDetails;
