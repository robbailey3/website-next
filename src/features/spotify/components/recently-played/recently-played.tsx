import Container from '@/components/common/layout/container/container';
import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import { useEffect, useState } from 'react';
import { RecentlyPlayedResponse } from '../../interfaces/RecentlyPlayedResponse';
import spotifyService from '../../services/spotify.service';
import RecentlyPlayedItem from './recently-played-item/recently-played-item';

const RecentlyPlayed = () => {
  const [recentlyPlayed, setRecentlyPlayed] =
    useState<RecentlyPlayedResponse | null>();

  useEffect(() => {
    const fetchRecentlyPlayed = async () => {
      const result = await spotifyService.getRecentlyPlayed();
      setRecentlyPlayed(result);
    };
    fetchRecentlyPlayed();
  }, []);

  return (
    <div>
      {recentlyPlayed && (
        <Container>
          <h1>Recently Played</h1>
          <FlexContainer className="flex-wrap justify-between">
            {recentlyPlayed.items.map((item) => (
              <RecentlyPlayedItem key={item.track.id} track={item.track} />
            ))}
          </FlexContainer>
        </Container>
      )}
    </div>
  );
};

export default RecentlyPlayed;
