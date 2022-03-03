import { KeyboardEvent } from 'react';

export interface OverflowMenuItemProps {
  children: JSX.Element | string;
  onClick: () => any;
}

const OverflowMenuItem = (props: OverflowMenuItemProps) => {
  const { children, onClick } = props;

  const handleKeypress = ($event: KeyboardEvent<HTMLAnchorElement>) => {
    if ($event.key === 'Enter') {
      onClick();
    }
  };

  return (
    <a
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyUp={handleKeypress}
      className="border-none outline-none focus:outline-none text-left hover:bg-gray-100 block p-2 w-full whitespace-nowrap"
    >
      {children}
    </a>
  );
};

export default OverflowMenuItem;
