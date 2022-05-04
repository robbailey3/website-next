import React from 'react';
import { Sprites } from '../../models/pokemon';

export interface PokemonSpriteProps {
  sprites: Sprites;
}

export interface SpriteGroup {
  title: string;
  sprites: SpriteModel;
}

export interface SpriteModel {
  front: string;
  back: string;
}

const getSpriteGroups = (sprite: any): SpriteGroup | null => {
  if (!sprite) {
    return null;
  }
  const result: SpriteGroup = {};
  Object.entries(sprite).forEach(([key, value]) => {
    if (!value) {
      return;
    }
    if (typeof value === 'object') {
      const sg = getSpriteGroups(value);
      if (sg) {
        result[key] = sg;
      }
    } else {
      const frontOrBack = key.split('_')[0];
      const resultKey = key.split('_')[1];
      if (!result[resultKey]) {
        result[resultKey] = {};
      }
      result[resultKey as string] = value;
    }
  });

  return result;
};

const PokemonSprite = (props: PokemonSpriteProps) => {
  const { sprites } = props;

  const calculateSpriteGroups = React.useCallback(() => {
    const sg = getSpriteGroups(sprites);
    console.log(sg);
  }, [sprites]);

  React.useEffect(() => {
    calculateSpriteGroups();
  }, [sprites]);

  return (
    <div>
      <pre>{JSON.stringify(sprites, null, 4)}</pre>
      <div>
        <button>Default</button>
      </div>
      <div>
        <img
          src={sprites.versions?.['generation-ii'].gold.front_default}
          alt=""
        />
        <img src={sprites.back_default} alt="" />
      </div>
    </div>
  );
};

export default PokemonSprite;
