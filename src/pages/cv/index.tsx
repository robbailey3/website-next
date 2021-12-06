import Container from '@/components/common/layout/container/container';
import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import FlexItem from '@/components/common/layout/flex-item/flex-item';
import CVContentPanel from '@/features/cv/components/cv-content-panel/cv-content-panel';
import CVNavigation from '@/features/cv/components/cv-navigation/cv-navigation';
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
        <FlexContainer className="flex-wrap">
          <FlexItem className="w-full lg:w-1/4">
            <CVNavigation
              activePanel={activePanel}
              handlePanelChange={handlePanelChange}
            />
          </FlexItem>
          <FlexItem className="w-full lg:w-3/4">
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
