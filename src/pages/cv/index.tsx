import Container from '@/components/common/layout/container/container';
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
      <Container>
        <FlexContainer options={{ wrap: 'wrap' }}>
          <FlexItem
            options={{ grow: 0, shrink: 0, basis: 'clamp(300px, 15vw, 500px)' }}
          >
            <CVNavigation
              activePanel={activePanel}
              handlePanelChange={handlePanelChange}
            />
          </FlexItem>
          <FlexItem options={{ grow: 1 }}>
            <h1>
              {activePanel.substring(0, 1).toUpperCase() +
                activePanel.substring(1)}
            </h1>
            <CVContentPanel activePanel={activePanel} />
          </FlexItem>
        </FlexContainer>
      </Container>
    </>
  );
};

export default CVPage;
