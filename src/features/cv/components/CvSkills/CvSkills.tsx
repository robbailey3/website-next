import { CVSkill, CVSkillGroup } from '@/data/cv/cv';
import { motion } from 'framer-motion';

export interface CvSkillsProps {
  skills: CVSkillGroup[];
}

const CvSkills = (props: CvSkillsProps) => {
  const { skills } = props;

  return (
    <section>
      <h2 className="my-2 text-gray-700 text-4xl">Skills</h2>
      <div>
        {skills.map((skillGroup, i) => (
          <motion.div
            key={`${skillGroup.title}__${i}`}
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
              <span className="text-gray-800">{skillGroup.title}</span>
            </h3>
            <ul className="list-disc ml-4 text-gray-900">
              {skillGroup.skills.map((skill, i) => (
                <li key={`${skill.name}__${i}`}>{skill.name}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CvSkills;
