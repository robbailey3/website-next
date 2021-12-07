import TextInput from '@/components/common/form/text-input/text-input';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  distinctUntilChanged,
  Subject,
  Subscription,
  throttleTime,
} from 'rxjs';

const SpotifySearch = () => {
  const searchValueSubject = new Subject<string>();

  const [value, setValue] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    searchValueSubject.next(e.target.value);
  };

  useEffect(() => {
    let subscription = searchValueSubject
      .pipe(throttleTime(300), distinctUntilChanged())
      .subscribe((value) => {
        setValue(value);
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
      onChange={() => {}}
      type="search"
      value={value}
    />
  );
};

export default SpotifySearch;
