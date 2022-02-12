import Tag from '@/components/common/Tag/Tag';
import { CVExperience } from '@/data/cv/cv';
import { motion } from 'framer-motion';

export interface CvExperienceProps {
  experience: CVExperience[];
}

const CvExperience = (props: CvExperienceProps) => {
  const { experience } = props;
  return (
    <section>
      <h2 className="my-2 text-gray-700 text-4xl">Experience</h2>
      <div>
        {experience.map((exp, i) => (
          <motion.div
            key={`${exp.company}__${i}`}
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
              <span className="text-gray-800">{exp.jobTitle}</span>{' '}
              <span className="mx-1 font-bold text-blue-600">{'//'}</span>{' '}
              <span className="text-gray-500">{exp.company}</span>
            </h3>
            <p className="text-gray-900">{exp.summary}</p>
            {exp.highlights && exp.highlights.length && (
              <div className="my-4">
                <ul className="list-disc ml-4 text-gray-900">
                  {exp.highlights.map((highlight, i) => (
                    <li key={`${highlight}__${i}`}>{highlight}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-wrap space-x-2 my-2">
              {exp.keywords.map((keyword, i) => (
                <span key={`${i}_${keyword}`}>
                  <Tag variant="primary">{keyword}</Tag>
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CvExperience;
