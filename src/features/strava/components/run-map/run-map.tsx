type RunMapProps = {
  polyline?: string;
  points?: number[][];
  width: number;
  height: number;
};

const RunMap = (props: RunMapProps) => {
  const { polyline, width, height, points } = props;

  const getRunMapSrc = () => {
    if (polyline) {
      return `https://maps.googleapis.com/maps/api/staticmap?size=${width}x${height}&maptype=satellite&path=color:0xc57b57CC|enc:${polyline}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
    } else if (points) {
      return `https://maps.googleapis.com/maps/api/staticmap?size=${width}x${height}&maptype=satellite&path=weight:2|color:0xc57b57CC|${points
        .map((point) => point.join(','))
        .join('|')}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
    }
  };

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={getRunMapSrc()} alt="Map of run" className="w-full block" />;
};

export default RunMap;
