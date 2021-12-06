import { CVSkillGroup } from '@/data/cv/cv';
import { motion } from 'framer-motion';

type CvSkillCategoryProps = {
  category: CVSkillGroup;
};

const CvSkillCategory = (props: CvSkillCategoryProps) => {
  const { category } = props;

  return (
    <div className="mb-8">
      <h3 className="mb-8 text-2xl">{category.title}</h3>
      <ul>
        {category.skills.map((skill, index) => (
          <li key={`${category.title}_${index}`}>
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              {skill.name}
            </motion.span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CvSkillCategory;
