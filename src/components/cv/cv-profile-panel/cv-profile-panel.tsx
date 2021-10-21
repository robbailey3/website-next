import { CV } from '@/data/cv/cv';

const CVProfilePanel = () => {
  const { profile } = CV;

  return <pre>{JSON.stringify(profile, null, 4)}</pre>;
};

export default CVProfilePanel;
