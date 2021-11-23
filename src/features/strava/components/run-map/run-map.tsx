type RunMapProps = {
  polyline: string;
  width: number;
  height: number;
};

const RunMap = (props: RunMapProps) => {
  const { polyline, width, height } = props;

  const getRunMapSrc = () => {
    return `https://maps.googleapis.com/maps/api/staticmap?size=${width}x${height}&maptype=satellite&path=enc:${polyline}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
  };

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={getRunMapSrc()} alt="Map of run" />;
};

export default RunMap;
