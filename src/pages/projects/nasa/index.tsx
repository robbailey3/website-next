import Container from '@/components/common/Container/Container';
import AstronomyPictureOfTheDay from '@/features/nasa/components/AstronomyPictureOfTheDay/AstronomyPictureOfTheDay';

const NasaPage = () => {
  return (
    <Container>
      <h1>Nasa</h1>
      <AstronomyPictureOfTheDay />
    </Container>
  );
};

export default NasaPage;
