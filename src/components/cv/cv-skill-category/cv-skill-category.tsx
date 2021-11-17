import { CVSkillGroup } from '@/data/cv/cv';
import { motion } from 'framer-motion';
import styles from './cv-skill-category.module.scss';

type CvSkillCategoryProps = {
  category: CVSkillGroup;
};

const CvSkillCategory = (props: CvSkillCategoryProps) => {
  const { category } = props;

  return (
    <div className={styles.category}>
      <h3 className={styles.category__title}>{category.title}</h3>
      <ul className={styles.category__list}>
        {category.skills.map((skill, index) => (
          <li
            key={`${category.title}_${index}`}
            className={styles.category__list_item}
          >
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
