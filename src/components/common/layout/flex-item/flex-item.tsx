type FlexItemProps = {
  className?: string;
  children: JSX.Element | JSX.Element[];
};

const FlexItem = (props: FlexItemProps) => {
  const { children, className } = props;

  return (
    <>
      <div className={className}>{children}</div>
    </>
  );
};

export default FlexItem;
