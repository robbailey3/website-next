import Container from '@/components/common/Container/Container';
import { CV } from '@/data/cv/cv';
import CvEducation from '@/features/cv/components/CvEducation/CvEducation';
import CvExperience from '@/features/cv/components/CvExperience/CvExperience';
import CvProfile from '@/features/cv/components/CvProfile/CvProfile';
import CvSkills from '@/features/cv/components/CvSkills/CvSkills';
import Head from 'next/head';

const CVPage = () => {
  return (
    <>
      <Head>
        <title>CV / Rob Bailey</title>
        <meta name="description" content="The online CV of Rob Bailey" />
      </Head>
      <Container>
        <div className="py-8">
          <h1 className="text-blue-400 text-4xl">CV</h1>
          <CvProfile profile={CV.profile} />
          <CvExperience experience={CV.experience} />
          <CvEducation education={CV.education} />
          <CvSkills skills={CV.skills} />
        </div>
      </Container>
    </>
  );
};

export default CVPage;
