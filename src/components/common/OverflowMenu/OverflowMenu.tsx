/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import React from 'react';
import { IconButton } from '../Buttons';
import OverflowMenuItem from './OverflowMenuItem';

export interface OverflowMenuProps {
  className?: string;
  actions: {
    clickHandler: () => any;
    label: string;
  }[];
}

const OverflowMenu = (props: OverflowMenuProps) => {
  const { className, actions } = props;

  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = async (clickHandler: () => any) => {
    await clickHandler();
    setIsOpen(false);
  };

  return (
    <div className={clsx('relative', className)}>
      <IconButton
        onClick={handleClick}
        className="shadow-none hover:bg-black hover:bg-opacity-20 focus:bg-black focus:bg-opacity-20 bg-transparent"
        icon={faEllipsisVertical}
        label="Toggle menu"
      />
      {isOpen && (
        <>
          <div
            onClick={handleClick}
            className="fixed top-0 left-0 w-full h-full"
          ></div>
          <div
            className="absolute rounded bg-white shadow-xl right-0 overflow-hidden"
            style={{ top: 'calc(100% + 4px)' }}
          >
            {actions.map((action, i) => (
              <OverflowMenuItem
                onClick={() => handleMenuItemClick(action.clickHandler)}
                key={`action_${i}`}
              >
                {action.label}
              </OverflowMenuItem>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default OverflowMenu;
