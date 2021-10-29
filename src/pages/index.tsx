import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import FlexItem from '@/components/common/layout/flex-item/flex-item';
import HomepageBanner from '@/components/homepage/homepage-banner/homepage-banner';
import HomepageInfo from '@/components/homepage/homepage-info/homepage-info';
import HomepageTech from '@/components/homepage/homepage-tech/homepage-tech';
import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Rob Bailey: Software Engineer</title>
        <meta
          name="description"
          content="The portfolio website of the Nottingham based Software Engineer Rob Bailey"
        />
      </Head>
      <HomepageBanner />
      <HomepageInfo />
      <HomepageTech />
    </>
  );
};

export default Home;
