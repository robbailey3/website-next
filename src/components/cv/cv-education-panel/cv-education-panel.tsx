import { CV, CVEducation } from '@/data/cv/cv';
import { motion } from 'framer-motion';
import CVEducationItem from '../cv-education-item/cv-education-item';

const CVEducationPanel = () => {
  const { education } = CV;
  if (education.length === 0) {
    return null;
  }
  return (
    <section>
      {education.map((item: CVEducation, i: number) => (
        <motion.div
          key={`experience_${i}`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: i * 0.2, duration: 0.4 }}
        >
          <CVEducationItem education={item} />
        </motion.div>
      ))}
    </section>
  );
};

export default CVEducationPanel;
