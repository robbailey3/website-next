import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import { Sprites } from '../../models/pokemon';

export interface PokemonSpriteProps {
  sprites: Sprites;
  pokemonName: string;
}

const PokemonSprite = (props: PokemonSpriteProps) => {
  const { sprites, pokemonName } = props;

  const [selectedVariant, setSelectedVariant] =
    React.useState<string>('default');

  const selectVariant = (variant: string) => {
    setSelectedVariant(variant);
  };

  return (
    <div className="flex flex-wrap rounded my-8">
      <div className="w-full flex">
        <button
          onClick={() => selectVariant('default')}
          className={clsx(
            'w-1/2 py-2 focus:outline-none rounded-t-lg border-transparent',
            {
              'bg-slate-50 text-slate-800 shadow-lg font-bold':
                selectedVariant === 'default',
              'bg-gray-600 text-gray-400': selectedVariant !== 'default',
            }
          )}
        >
          Default
        </button>
        <button
          onClick={() => selectVariant('shiny')}
          className={clsx('w-1/2 py-2 focus:outline-none rounded-t-lg', {
            'bg-slate-50 text-slate-800 shadow-lg font-bold':
              selectedVariant === 'shiny',
            'bg-gray-600 text-gray-400': selectedVariant !== 'shiny',
          })}
        >
          Shiny
        </button>
      </div>
      <div className="flex w-full shadow bg-slate-50 rounded-b-lg">
        <div className="grow text-center">
          <Image
            src={sprites[`front_${selectedVariant}` as keyof Sprites] as string}
            alt={`Front sprite of ${pokemonName}`}
            width={240}
            height={240}
          />
        </div>
        <div className="grow text-center">
          <Image
            src={sprites[`back_${selectedVariant}` as keyof Sprites] as string}
            alt={`Back sprite of ${pokemonName}`}
            width={240}
            height={240}
          />
        </div>
      </div>
    </div>
  );
};

export default PokemonSprite;
