import Container from '@/components/common/layout/container/container';
import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import FlexItem from '@/components/common/layout/flex-item/flex-item';
import CVContentPanel from '@/components/cv/cv-content-panel/cv-content-panel';
import CVNavigation from '@/components/cv/cv-navigation/cv-navigation';
import Head from 'next/head';
import React, { useState } from 'react';
import { CVPanel } from '@/data/cv-panel';

const CVPage = () => {
  const [activePanel, setActivePanel] = useState<CVPanel>(CVPanel.PROFILE);

  const handlePanelChange = (panel: CVPanel) => {
    setActivePanel(panel);
  };

  return (
    <>
      <Head>
        <title>Rob Bailey: Software Engineer</title>
        <meta
          name="description"
          content="The portfolio site of Nottingham based Software Engineer Rob Bailey"
        />
      </Head>
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
          <FlexItem options={{ grow: 1, shrink: 1 }}>
            <div style={{ padding: '1rem' }}>
              <h1>
                {activePanel.substring(0, 1).toUpperCase() +
                  activePanel.substring(1)}
              </h1>
              <CVContentPanel activePanel={activePanel} />
            </div>
          </FlexItem>
        </FlexContainer>
      </Container>
    </>
  );
};

export default CVPage;
