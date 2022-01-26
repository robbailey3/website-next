import Container from '@/components/common/layout/container/container';
import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import meInWoods from '../../../public/about/me-in-woods.jpg';

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
      <Container className="text-center">
        <h1>About Me</h1>
        <p>Hi! I&apos;m Rob.</p>
        <p>
          I&apos;m currently a software engineer at a place called Netcall where
          I create things using Vue.JS and C#.
        </p>
        <FlexContainer className="flex-wrap py-8 items-center space-x-4 space-y-4">
          <div className="flex-1 p-8 rounded-lg">
            <p>This is me here in some woods with my camera.</p>
          </div>
          <div className="w-96 max-w-full">
            <Image
              src={meInWoods}
              alt="Me in some woods"
              layout="responsive"
              className="rounded-lg overflow-hidden"
            ></Image>
          </div>
        </FlexContainer>
        <div>
          <p>
            I&apos;m a self-taught developer with a passion for learning and
            building things.
          </p>
          <p>
            I started making things whilst working as a software tester after I
            left university where I studied Physics with Philosophy
          </p>
        </div>
      </Container>
    </>
  );
};

export default AboutPage;
