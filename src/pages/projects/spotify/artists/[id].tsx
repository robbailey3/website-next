import { useSpotify } from '@/features/spotify/context/spotify.context';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Container from '@/components/common/layout/container/container';

const ArtistPage = () => {
  const { spotify } = useSpotify();
  const router = useRouter();

  const { id } = router.query;

  const [artist, setArtist] = useState<any>(null);

  useEffect(() => {
    const getArtist = async () => {
      if (id !== null) {
        const response = await spotify.getArtist(id as string);
        setArtist(response);
      }
    };
    getArtist();
  }, [id, spotify]);

  if (!artist) {
    return null;
  }

  return (
    <Container>
      <h1>{artist.name}</h1>
      <Image
        src={artist.images[0].url}
        width={600}
        height={600}
        alt={`${artist.name}`}
      />
      <pre>{JSON.stringify(artist, null, 2)}</pre>
    </Container>
  );
};

export default ArtistPage;
