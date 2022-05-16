import Image from 'next/image';
import React from 'react';
import { PictureOfTheDayReponse } from '../../models/PictureOfTheDayResponse';

const AstronomyPictureOfTheDay = () => {
  const [potd, setPotd] = React.useState<PictureOfTheDayReponse | null>(null);

  const fetchPictureOfTheDay = async () => {
    const response = await fetch('/api/projects/nasa/potd');
    const data = await response.json();
    setPotd(data.result);
  };

  React.useEffect(() => {
    fetchPictureOfTheDay();
  }, []);

  if (!potd) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full block relative">
      <Image
        src={potd.url}
        width={800}
        height={400}
        layout="responsive"
        alt={potd.title}
      ></Image>
    </div>
  );
};

export default AstronomyPictureOfTheDay;
