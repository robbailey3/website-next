import Image from 'next/image';

const NasaPageHeader = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src="/NASA_logo.svg"
        alt="NASA Logo"
        width={128}
        height={128}
      ></Image>
    </div>
  );
};

export default NasaPageHeader;
