import { useEffect, useState } from 'react';
import spotifyService from '../../services/spotify.service';

const RecentlyPlayed = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState<any>(null);

  useEffect(() => {
    const fetchRecentlyPlayed = async () => {
      const result = await spotifyService.getRecentlyPlayed();
      setRecentlyPlayed(result);
      console.log({ result });
    };
    fetchRecentlyPlayed();
  }, []);

  return (
    <pre className="whitespace-pre-wrap">
      {JSON.stringify(recentlyPlayed, null, 2)}
    </pre>
  );
};

export default RecentlyPlayed;
