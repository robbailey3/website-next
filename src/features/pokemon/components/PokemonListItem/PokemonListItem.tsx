import Link from 'next/link';
import { PokemonDefinition } from '../../models/PokemonDefinition';

export interface PokemonListItemProps {
  pokemon: PokemonDefinition;
}

const PokemonListItem = (props: PokemonListItemProps) => {
  const { pokemon } = props;

  return (
    <div key={pokemon.id} className="w-1/5 p-4 ">
      <div className="bg-white rounded-lg shadow-lg p-4 relative overflow-hidden">
        <span className="absolute top-0 right-0 bg-gray-200 p-1 text-black rounded-bl-xl block text-xs font-bold">
          {pokemon.id}
        </span>
        <h1 className="text-2xl font-bold text-center">
          <Link href={`/projects/pokemon/${pokemon.id}`}>
            <a>
              {pokemon.name.substring(0, 1).toUpperCase() +
                pokemon.name.substring(1)}
            </a>
          </Link>
        </h1>
        <img
          src={pokemon.sprites.front_default}
          alt={`Sprite of ${pokemon.name}`}
          className="w-full mx-auto"
        />
      </div>
    </div>
  );
};

export default PokemonListItem;
