import { useState } from 'react';
import { CVPanel } from 'src/data/cv-panel';

type CVNavigationProps = {
  activePanel: string;
  handlePanelChange: (panel: CVPanel) => void;
};

const CVNavigation = (props: CVNavigationProps) => {
  const { activePanel, handlePanelChange } = props;

  return (
    <aside>
      <h2>Navigation</h2>
      <ul>
        <li>
          <button onClick={() => handlePanelChange(CVPanel.PROFILE)}>
            Profile
          </button>
        </li>
        <li>
          <button onClick={() => handlePanelChange(CVPanel.EXPERIENCE)}>
            Experience
          </button>
        </li>
        <li>
          <button onClick={() => handlePanelChange(CVPanel.EDUCATION)}>
            Education
          </button>
        </li>
        <li>
          <button onClick={() => handlePanelChange(CVPanel.SKILLS)}>
            Skills
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default CVNavigation;
