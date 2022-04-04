import Container from '@/components/common/Container/Container';
import RunDetails from '@/features/strava/components/RunDetails/RunDetails';
import { useRouter } from 'next/router';

const RunDetailsPage = () => {
  const router = useRouter();

  const { id } = router.query;

  if (!id) {
    return <div>No id</div>;
  }

  if (Array.isArray(id)) {
    return <div>Multiple ids</div>;
  }

  return (
    <Container>
      <RunDetails id={id} />
    </Container>
  );
};

export default RunDetailsPage;
