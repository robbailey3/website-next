import { CV } from '@/data/cv/cv';
import React from 'react';
import { CVExperience } from 'src/data/cv/cv';
import CVExperienceItem from '../cv-experience-item/cv-experience-item';

const CVExperiencePanel = () => {
  const { experience } = CV;
  if (experience.length === 0) {
    return null;
  }
  return (
    <section>
      {experience.map((item: CVExperience, i: number) => (
        <CVExperienceItem key={`experience_${i}`} experience={item} />
      ))}
    </section>
  );
};

export default CVExperiencePanel;
