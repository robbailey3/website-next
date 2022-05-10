import Container from '@/components/common/Container/Container';
import PokemonDetails from '@/features/pokemon/components/PokemonDetails/PokemonDetails';
import { useRouter } from 'next/router';

const PokemonDetailsPage = () => {
  const router = useRouter();

  const { id } = router.query;

  if (Array.isArray(id)) {
    return <div>Multiple pokemon</div>;
  }

  if (!id) {
    return <div>No pokemon</div>;
  }

  return (
    <Container>
      <PokemonDetails id={id} />
    </Container>
  );
};

export default PokemonDetailsPage;
