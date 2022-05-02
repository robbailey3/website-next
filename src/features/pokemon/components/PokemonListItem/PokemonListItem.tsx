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
        <span className="absolute top-0 right-0 bg-blue-600 p-2 text-white rounded-bl-xl block ">
          {pokemon.id}
        </span>
        <h1 className="text-2xl font-bold">
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
          className="w-1/2 mx-auto"
        />
      </div>
    </div>
  );
};

export default PokemonListItem;
