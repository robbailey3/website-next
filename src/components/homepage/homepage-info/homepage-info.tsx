import Container from '@/components/common/layout/container/container';
import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import FlexItem from '@/components/common/layout/flex-item/flex-item';
import React from 'react';
import Image from 'next/image';
import meImage from '/public/me.png';

const HomepageInfo = () => {
  return (
    <section className="bg-light text-font-dark">
      <Container>
        <FlexContainer className="flex-wrap items-center">
          <FlexItem className="w-full md:w-1/2 py-16 px-8">
            <p>
              I am a Software Engineer working for a company called Netcall.
            </p>
            <p>I mainly work with Vue.js but I also do some work in C#.</p>
            <p>
              My favourite front-end framework is Angular but I&apos;ve also
              used React. I also like to build apps with Node.js.
            </p>
            <p>
              I&apos;m always wanting to learn something new and I&apos;m
              currently learning Go.
            </p>
          </FlexItem>
          <FlexItem className="w-full md:w-1/2 flex items-end justify-center">
            <Image
              src={meImage}
              width={270}
              height={405}
              alt="Rob Bailey"
              className="mx-auto block"
              placeholder="blur"
            ></Image>
          </FlexItem>
        </FlexContainer>
      </Container>
    </section>
  );
};

export default HomepageInfo;
