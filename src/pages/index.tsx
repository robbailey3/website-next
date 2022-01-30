import Container from '@/components/common/Container/Container';
import HomepageBanner from '@/features/homepage/components/HomepageBanner/HomepageBanner';
import HomepageSocial from '@/features/homepage/components/HomepageSocial/HomepageSocial';
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
          content="The portfolio site of Nottingham based Software Engineer Rob Bailey"
        />
      </Head>
      <Container>
        <HomepageBanner />
        <HomepageSocial />
      </Container>
    </>
  );
};

export default Home;
