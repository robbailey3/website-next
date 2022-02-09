import Container from '@/components/common/Container/Container';
import { CV } from '@/data/cv/cv';
import CvProfile from '@/features/cv/components/CvProfile/CvProfile';

const CVPage = () => {
  return (
    <Container>
      <div className="py-8">
        <h1 className="text-blue-400 text-4xl">CV</h1>
        <CvProfile profile={CV.profile} />
      </div>
    </Container>
  );
};

export default CVPage;
