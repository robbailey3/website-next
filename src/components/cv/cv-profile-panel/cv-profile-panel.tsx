import { CV } from '@/data/cv/cv';

const CVProfilePanel = () => {
  const { profile } = CV;

  return (
    <section>
      <h2>
        {profile.firstName} {profile.lastName}
      </h2>
      <p>{profile.profile}</p>
    </section>
  );
};

export default CVProfilePanel;
