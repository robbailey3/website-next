import { CV } from '@/data/cv/cv';
import { motion } from 'framer-motion';
import React from 'react';
import { CVExperience } from '@/data/cv/cv';
import CVExperienceItem from '../cv-experience-item/cv-experience-item';

const CVExperiencePanel = () => {
  const { experience } = CV;
  if (experience.length === 0) {
    return null;
  }
  return (
    <section>
      {experience.map((item: CVExperience, i: number) => (
        <motion.div
          key={`experience_${i}`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: i * 0.2, duration: 0.4 }}
        >
          <CVExperienceItem experience={item} />
        </motion.div>
      ))}
    </section>
  );
};

export default CVExperiencePanel;
