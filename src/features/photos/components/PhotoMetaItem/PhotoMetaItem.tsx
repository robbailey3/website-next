export interface PhotoMetaItemProps {
  icon: JSX.Element;
  values: { [key: string]: string | undefined };
}

const PhotoMetaItem = (props: PhotoMetaItemProps) => {
  const { icon, values } = props;

  const hasAnyValue = () => {
    return Object.values(values).some((value) => value !== undefined);
  };

  if (!hasAnyValue()) {
    return null;
  }
  return (
    <div className="text-white mb-4 flex items-start">
      <div className="px-4">{icon}</div>
      <div className="grow">
        {Object.entries(values).map(([key, value]) => {
          if (!value) {
            return null;
          }
          return (
            <div key={key} className="flex items-center mb-2">
              <span className="w-2/5 text-xs opacity-80">{key}</span>
              <span className="w-3/5 text-sm">{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PhotoMetaItem;
