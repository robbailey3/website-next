import Container from '@/components/common/layout/container/container';
import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import FlexItem from '@/components/common/layout/flex-item/flex-item';
import Image from 'next/image';
import React from 'react';
import styles from './homepage-tech.module.scss';

const HomepageTech = () => {
  const techItems = [
    {
      image: '/tech-icons/react-original.svg',
      title: 'React',
    },
    {
      image: '/tech-icons/angularjs-plain.svg',
      title: 'Angular',
    },
    {
      image: '/tech-icons/vuejs-original.svg',
      title: 'Vue',
    },
    {
      image: '/tech-icons/nodejs-original.svg',
      title: 'NodeJS',
    },
    {
      image: '/tech-icons/azure-original.svg',
      title: 'Azure',
    },
    {
      image: '/tech-icons/docker-plain.svg',
      title: 'Docker',
    },
    {
      image: '/tech-icons/csharp-plain.svg',
      title: 'C#',
    },
    {
      image: '/tech-icons/typescript-original.svg',
      title: 'TypeScript',
    },
    {
      image: '/tech-icons/css3-plain.svg',
      title: 'CSS',
    },
    {
      image: '/tech-icons/jest-plain.svg',
      title: 'Jest',
    },
    {
      image: '/tech-icons/mongodb-original.svg',
      title: 'MongoDB',
    },
    {
      image: '/tech-icons/nestjs-plain.svg',
      title: 'NestJS',
    },
    {
      image: '/tech-icons/go-original.svg',
      title: 'Go',
    },
  ];
  return (
    <section className={styles.section}>
      <Container>
        <FlexContainer options={{ justify: 'space-around' }}>
          {techItems
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((item, index) => (
              <FlexItem key={index} className={styles.tech_item}>
                <Image
                  src={item.image}
                  alt={item.title}
                  layout="fill"
                  title={item.title}
                />
              </FlexItem>
            ))}
        </FlexContainer>
      </Container>
    </section>
  );
};

export default HomepageTech;
