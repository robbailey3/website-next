import Container from '@/components/common/Container/Container';
import AstronomyPictureOfTheDay from '@/features/nasa/components/AstronomyPictureOfTheDay/AstronomyPictureOfTheDay';
import NasaPageHeader from '@/features/nasa/components/NasaPageHeader/NasaPageHeader';
import Head from 'next/head';

const NasaPage = () => {
  return (
    <>
      <Head>
        <title>NASA / Projects / Rob Bailey</title>
      </Head>
      <Container>
        <section>
          <NasaPageHeader />
        </section>
        <section className="flex">
          <AstronomyPictureOfTheDay />
        </section>
      </Container>
    </>
  );
};

export default NasaPage;
``;
