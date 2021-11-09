import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import FlexItem from '@/components/common/layout/flex-item/flex-item';
import HomepageBanner from '@/components/homepage/homepage-banner/homepage-banner';
import HomepageContact from '@/components/homepage/homepage-contact/homepage-contact';
import HomepageInfo from '@/components/homepage/homepage-info/homepage-info';
import HomepageTech from '@/components/homepage/homepage-tech/homepage-tech';
import type { NextPage } from 'next';
import React from 'react';

const Home: NextPage = () => {
  return (
    <>
      <HomepageBanner />
      <HomepageInfo />
      <HomepageTech />
      <HomepageContact />
    </>
  );
};

export default Home;
