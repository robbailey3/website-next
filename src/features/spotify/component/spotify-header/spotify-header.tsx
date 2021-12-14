import Container from '@/components/common/layout/container/container';
import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import React, { useEffect, useState } from 'react';
import { CurrentUser } from '../../interfaces/CurrentUser';
import spotifyService from '../../services/spotify.service';
import SpotifySearch from '../spotify-search/spotify-search';

const SpotifyHeader = () => {
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const response = await spotifyService.getCurrentUser();
      setUser(response);
    };
    getUser();
  }, []);

  return (
    <section className="absolute top-0 w-full bg-background-600 shadow-xl z-10">
      <Container>
        <FlexContainer className="py-8">
          <nav>
            <ul className="flex">
              <li className="mr-4">
                <a href="#" className="text-white">
                  Dashboard
                </a>
              </li>
              <li className="mr-4">
                <a href="#" className="text-white">
                  Library
                </a>
              </li>
            </ul>
          </nav>
          <div className="flex items-center ml-auto">
            <SpotifySearch />
            <h1 className="text-2xl text-white">{user?.display_name}</h1>
            <img
              className="rounded-full w-8 h-8 ml-4"
              src={user?.images[0].url}
              alt="user"
            />
          </div>
        </FlexContainer>
      </Container>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </section>
  );
};

export default SpotifyHeader;
