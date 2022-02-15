import Container from '@/components/common/Container/Container';
import ProjectList from '@/features/projects/components/ProjectList/ProjectList';
import Head from 'next/head';

const ProjectsPage = () => {
  return (
    <>
      <Head>
        <title>Projects / Rob Bailey</title>
        <meta name="description" content="A list of projects by Rob Bailey" />
      </Head>
      <Container>
        <ProjectList />
      </Container>
    </>
  );
};

export default ProjectsPage;
