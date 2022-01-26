import Card from '@/components/common/layout/card/card';
import Container from '@/components/common/layout/container/container';
import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import Link from 'next/link';
import React from 'react';

const ProjectsPage = () => {
  const projects = [
    {
      id: 1,
      name: 'Running Tracker',
      route: '/projects/running-tracker',
      description:
        'A running tracker app that tracks my running activities and provides a visual representation of my progress.',
    },
    // {
    //   id: 2,
    //   name: 'Spotify Player',
    //   route: '/projects/spotify',
    //   description:
    //     'A spotify player app that allows you to play music from your spotify account.',
    // },
  ];

  return (
    <Container>
      <h1>Projects</h1>
      <p>Some of the fun things I&apos;ve been working on lately.</p>
      <FlexContainer className="flex-wrap">
        {projects.map((project) => (
          <Card key={project.id} className="w-full p-4 my-4">
            <h2>
              <Link href={project.route}>
                <a>{project.name}</a>
              </Link>
            </h2>
            <p>{project.description}</p>
          </Card>
        ))}
      </FlexContainer>
    </Container>
  );
};

export default ProjectsPage;
