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
    <div className="flex flex-wrap border rounded my-8">
      <div className="w-full flex">
        <button
          onClick={() => selectVariant('default')}
          className="grow py-2 bg-slate-100 border-r border-b"
        >
          Default
        </button>
        <button
          onClick={() => selectVariant('shiny')}
          className="grow py-2 bg-slate-100 border-b"
        >
          Shiny
        </button>
      </div>
      <div className="flex w-full">
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
