import TypeColours from '../../utils/pokemonTypeColours';

export interface PokemonTypeBadgeProps {
  type: string;
}

const PokemonTypeBadge = (props: PokemonTypeBadgeProps) => {
  const { type } = props;

  return (
    <span
      style={{ backgroundColor: TypeColours.getTypeColour(type) }}
      className="p-1 rounded-lg text-white mr-2 select-none"
    >
      {type}
    </span>
  );
};

export default PokemonTypeBadge;
