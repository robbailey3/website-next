type NavigationButtonProps = {
  onClick: () => void;
  isOpen: boolean;
};

const NavigationButton = (props: NavigationButtonProps) => {
  const { onClick, isOpen } = props;
  return (
    <button
      onClick={onClick}
      className="relative py-4 px-2"
      data-cy="navigationToggle"
    >
      <p className="sr-only">Toggle Navigation</p>
      <span className="h-0.5 w-8 bg-accent-50 relative block mt-0.5"></span>
      <span className="h-0.5 w-8 bg-accent-50 relative block mt-2"></span>
      <span className="h-0.5 w-8 bg-accent-50 relative block mt-2"></span>
    </button>
  );
};

export default NavigationButton;
