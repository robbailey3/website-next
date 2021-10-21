import { CVPanel } from '@/data/cv-panel';
import { CV } from '@/data/cv/cv';
import React from 'react';
import CVProfilePanel from '../cv-profile-panel/cv-profile-panel';

type CVContentPanelProps = {
  activePanel: string;
};

const CVContentPanel = (props: CVContentPanelProps) => {
  const { activePanel } = props;

  const getActivePanel = (): JSX.Element => {
    switch (activePanel) {
      case CVPanel.PROFILE:
        return <CVProfilePanel />;
      default:
        return <div>No panel found for {activePanel}</div>;
    }
  };

  return <>{getActivePanel()}</>;
};

export default CVContentPanel;
