import Container from '@/components/common/layout/container/container';
import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import FlexItem from '@/components/common/layout/flex-item/flex-item';
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
    {
      id: 2,
      name: 'Spotify Player',
      route: '/projects/spotify',
      description:
        'A spotify player app that allows you to play music from your spotify account.',
    },
  ];

  return (
    <Container>
      <FlexContainer>
        {projects.map((project) => (
          <FlexItem key={project.id}>
            <h2>
              <Link href={project.route}>
                <a>{project.name}</a>
              </Link>
            </h2>
            <p>{project.description}</p>
          </FlexItem>
        ))}
      </FlexContainer>
    </Container>
  );
};

export default ProjectsPage;
