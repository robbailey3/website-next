import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import FlexItem from '@/components/common/layout/flex-item/flex-item';
import CVContentPanel from '@/components/cv/cv-content-panel/cv-content-panel';
import CVNavigation from '@/components/cv/cv-navigation/cv-navigation';
import React, { useState } from 'react';
import { CVPanel } from 'src/data/cv-panel';

const CVPage = () => {
  const [activePanel, setActivePanel] = useState<CVPanel>(CVPanel.PROFILE);

  const handlePanelChange = (panel: CVPanel) => {
    setActivePanel(panel);
  };

  return (
    <>
      <FlexContainer>
        <FlexItem options={{ grow: 0, shrink: 0, basis: '25vw' }}>
          <CVNavigation
            activePanel={activePanel}
            handlePanelChange={handlePanelChange}
          />
        </FlexItem>
        <FlexItem options={{ grow: 1 }}>
          <CVContentPanel activePanel={activePanel} />
        </FlexItem>
      </FlexContainer>
    </>
  );
};

export default CVPage;
