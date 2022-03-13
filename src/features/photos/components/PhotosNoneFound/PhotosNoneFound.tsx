export interface PhotosNotFoundProps {
  type: 'albums' | 'photos';
}

const PhotosNotFound = (props: PhotosNotFoundProps) => {
  const { type } = props;

  return (
    <>
      <div className="flex gap-4 justify-center items-center py-56">
        <div className="text-6xl">
          <span role="img">📷</span>
        </div>
        <h1 className="text-4xl">No {type} found</h1>
      </div>
    </>
  );
};

export default PhotosNotFound;
