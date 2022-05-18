import Card from '@/components/common/Card/Card';
import Loader from '@/components/common/Loaders/Loader/Loader';
import Image from 'next/image';
import React from 'react';
import { PictureOfTheDayReponse } from '../../models/PictureOfTheDayResponse';
import AstronomyPicture from '../AstronomyPicture/AstronomyPicture';

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
    return (
      <div className="flex justify-center my-8">
        <Loader />
      </div>
    );
  }

  return (
    <div className="block relative w-full">
      <Card className="rounded p-4">
        <h2 className="text-2xl my-2 text-center">
          Astronomy Picture of the Day
        </h2>
        <AstronomyPicture
          imageSrc={potd.url}
          description={potd.explanation}
          alt={potd.title}
        />
      </Card>
    </div>
  );
};

export default AstronomyPictureOfTheDay;
