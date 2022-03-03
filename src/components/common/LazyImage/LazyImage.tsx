/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx';
import React from 'react';

export interface LazyImageProps {
  src: string;
  thumbnailSrc: string;
  alt?: string;
  className?: string;
}

const LazyImage = (props: LazyImageProps) => {
  const { src, thumbnailSrc, alt, className } = props;

  const imageEl = React.useRef<HTMLImageElement>(null);

  const [imageSrc, setImageSrc] = React.useState<string>(thumbnailSrc);

  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  const loadImage = React.useCallback(() => {
    const img = new Image();
    img.src = src;
  }, [src]);

  React.useEffect(() => {
    loadImage();
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setImageSrc(src);
          setIsLoaded(true);
          intersectionObserver.disconnect();
        }
      });
    });

    if (imageEl.current) {
      intersectionObserver.observe(imageEl.current);
    }

    return () => {
      intersectionObserver.disconnect();
    };
  }, [loadImage, src]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      ref={imageEl}
      className={clsx(
        className,
        {
          'filter blur-xl': !isLoaded,
        },
        'duration-1000'
      )}
    />
  );
};

export default LazyImage;
