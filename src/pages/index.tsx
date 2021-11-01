import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import FlexItem from '@/components/common/layout/flex-item/flex-item';
import HomepageBanner from '@/components/homepage/homepage-banner/homepage-banner';
import HomepageInfo from '@/components/homepage/homepage-info/homepage-info';
import HomepageTech from '@/components/homepage/homepage-tech/homepage-tech';
import PageMeta from '@/components/page-meta/page-meta';
import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

const Home: NextPage = () => {
  return (
    <>
      <PageMeta
        title="Rob Bailey: Software Engineer"
        description="Software Engineer based in Nottingham, UK focused on creating all sorts of interesting tech things."
      />
      <HomepageBanner />
      <HomepageInfo />
      <HomepageTech />
    </>
  );
};

export default Home;
