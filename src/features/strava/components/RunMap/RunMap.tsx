/* eslint-disable @next/next/no-img-element */
export interface RunMapProps {
  polyline: string;
  width: number;
  height: number;
}

const RunMap = (props: RunMapProps) => {
  const { polyline, width, height } = props;

  const getRunMapSrc = () => {
    return `https://maps.googleapis.com/maps/api/staticmap?size=${width}x${height}&maptype=satellite&path=color:0xc57b57CC|enc:${polyline}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
  };

  return (
    <img src={getRunMapSrc()} alt="Map of run" className="block max-w-full" />
  );
};

export default RunMap;
