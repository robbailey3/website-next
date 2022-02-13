import { CVEducation } from '@/data/cv/cv';
import { motion } from 'framer-motion';

export interface CvEducationProps {
  education: CVEducation[];
}

const CvEducation = (props: CvEducationProps) => {
  const { education } = props;

  return (
    <section>
      <h2 className="my-2 text-gray-700 text-4xl">Education</h2>
      <div>
        {education.map((edu, i) => (
          <motion.div
            key={`${edu.institution}__${i}`}
            className="mb-8"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: i * 0.5,
              duration: 1,
              type: 'spring',
              bounce: 0.4,
            }}
          >
            <h3 className="text-gray-700 text-2xl mb-4">
              <span className="text-gray-800">{edu.qualification}</span>{' '}
              <span className="mx-1 font-bold text-blue-600">{'//'}</span>{' '}
              <span className="text-gray-500">{edu.institution}</span>
            </h3>
            <p className="text-gray-500 italic">
              {edu.dateFrom.getFullYear()} - {edu.dateTo.getFullYear()}
            </p>
            <p className="text-gray-900">{edu.summary}</p>
            <div className="my-4">
              <ul className="list-disc ml-4 text-gray-900">
                {edu.highlights.map((highlight, i) => (
                  <li key={`${highlight}__${i}`}>{highlight}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CvEducation;
