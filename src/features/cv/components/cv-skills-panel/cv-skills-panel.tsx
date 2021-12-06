import { CV } from '@/data/cv/cv';
import React from 'react';
import CvSkillCategory from '../cv-skill-category/cv-skill-category';

const CVSkillsPanel = () => {
  const { skills } = CV;
  return (
    <section>
      {skills.map((skillCategory, index) => (
        <CvSkillCategory category={skillCategory} key={`skill_${index}`} />
      ))}
    </section>
  );
};
export default CVSkillsPanel;
