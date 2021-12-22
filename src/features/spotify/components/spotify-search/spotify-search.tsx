import TextInput from '@/components/common/form/text-input/text-input';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  distinctUntilChanged,
  Subject,
  Subscription,
  throttleTime,
} from 'rxjs';
import spotifyService from '../../services/spotify.service';

const SpotifySearch = () => {
  const searchValueSubject = new Subject<string>();

  const [value, setValue] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    searchValueSubject.next(e.target.value);
  };

  useEffect(() => {
    let subscription = searchValueSubject
      .pipe(throttleTime(300), distinctUntilChanged())
      .subscribe(async (value) => {
        const result = await spotifyService.search(value);
      });
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <TextInput
      label="Search"
      id="spotify-search"
      name="spotify-search"
      onChange={(evt) => handleChange(evt)}
      type="search"
      value={value}
    />
  );
};

export default SpotifySearch;
