import Container from '@/components/common/layout/container/container';
import Head from 'next/head';
import React from 'react';

const AboutPage = () => {
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
        <div className="py-12">
          <p>Coming Soon!</p>
        </div>
      </Container>
    </>
  );
};

export default AboutPage;
