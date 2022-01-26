import Container from '@/components/common/layout/container/container';
import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import { useEffect, useState } from 'react';
import { useSpotify } from '../../context/spotify.context';
import UserPlaylistItem from './user-playlist-item/user-playlist-item';

const UserPlaylists = () => {
  const { spotify } = useSpotify();

  const [playlists, setPlaylists] = useState<any>(null);

  useEffect(() => {
    const getCategories = async () => {
      const response = await spotify.getPlaylists();
      setPlaylists(response.items);
    };

    getCategories();
  }, [spotify]);

  if (!playlists) {
    return null;
  }

  return (
    <Container>
      <h2>Playlists</h2>
      <FlexContainer className="flex-wrap">
        {playlists.map((playlist: any) => {
          return <UserPlaylistItem playlist={playlist} key={playlist.id} />;
        })}
      </FlexContainer>
    </Container>
  );
};

export default UserPlaylists;
