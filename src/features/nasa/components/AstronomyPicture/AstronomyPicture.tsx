/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/common/Buttons';
import { faCompress, faExpand } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React from 'react';
import { fromEvent } from 'rxjs';

export interface AstronomyPictureProps {
  imageSrc: string;
  alt: string;
  description: string;
}

const AstronomyPicture = (props: AstronomyPictureProps) => {
  const { imageSrc, alt, description } = props;

  const [isFullScreen, setIsFullScreen] = React.useState(false);

  const toggleFullscreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  React.useEffect(() => {
    const $keyboardSubscription = fromEvent<KeyboardEvent>(
      window,
      'keydown'
    ).subscribe({
      next: (evt) => {
        if (evt.key === 'Escape') {
          setIsFullScreen(false);
        }
      },
    });

    return () => {
      $keyboardSubscription?.unsubscribe();
    };
  });

  return (
    <div className={'flex flex-col items-center justify-center'}>
      {isFullScreen && (
        <div className="z-40 fixed top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>
      )}
      <div
        className={clsx({
          relative: !isFullScreen,
          'fixed w-full h-full top-0 left-0 z-50 flex justify-center items-center':
            isFullScreen,
        })}
      >
        <div className="controls absolute flex justify-end top-0 left-0 w-full p-4">
          <button
            onClick={toggleFullscreen}
            className="rounded-full text-white bg-gray-400 hover:bg-gray-800 duration-300 p-2 leading-none"
          >
            <FontAwesomeIcon
              icon={isFullScreen ? faCompress : faExpand}
            ></FontAwesomeIcon>
            <span className="sr-only">Fullscreen</span>
          </button>
        </div>
        <img src={imageSrc} alt={alt} className="block w-full" />
        {!isFullScreen && (
          <div className="p-4">
            <p>{description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AstronomyPicture;
