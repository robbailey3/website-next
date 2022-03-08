/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/img-redundant-alt */
export interface PhotoLocationProps {
  location: { lat: number; lng: number };
}

const PhotoLocation = (props: PhotoLocationProps) => {
  const { location } = props;

  return (
    <div className="flex">
      <img
        src={`https://maps.googleapis.com/maps/api/staticmap?size=300x300&zoom=10&markers=color:red|${location.lng},${location.lat}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
        alt="Map of photo location"
      />
    </div>
  );
};

export default PhotoLocation;
