import React, { KeyboardEvent } from 'react';

type CollapsibleSectionProps = {
  title: string;
  children: JSX.Element | JSX.Element[];
};

const CollapsibleSection = (props: CollapsibleSectionProps) => {
  const { title, children } = props;
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleKeypress = ($event: KeyboardEvent<HTMLDivElement>) => {
    if ($event.key === 'Enter') {
      toggleOpen();
    }
  };

  return (
    <div className="collapsible-section">
      <div
        className="collapsible-section__header"
        onClick={toggleOpen}
        role="button"
        tabIndex={0}
        onKeyPress={handleKeypress}
      >
        <div className="collapsible-section__header-title">{title}</div>
        <div className="collapsible-section__header-icon">
          <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`} />
        </div>
      </div>
      <div
        className={`collapsible-section__content ${
          isOpen ? 'collapsible-section__content--open' : ''
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default CollapsibleSection;
