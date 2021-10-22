import { CVPanel } from '@/data/cv-panel';
import { motion, Variants } from 'framer-motion';
import styles from './cv-navigation.module.scss';

type CVNavigationProps = {
  activePanel: string;
  handlePanelChange: (panel: CVPanel) => void;
};

const CVNavigation = (props: CVNavigationProps) => {
  const { activePanel, handlePanelChange } = props;

  const variants: Variants = {
    active: {
      opacity: 1,
      color: '#fff',
    },
    inactive: {
      opacity: 0.65,
      color: '#c57b57',
    },
    hover: {
      scale: 1.1,
    },
  };

  return (
    <aside className={styles.nav}>
      <nav>
        <ul>
          <li>
            <motion.button
              animate={activePanel === CVPanel.PROFILE ? 'active' : 'inactive'}
              whileHover="hover"
              variants={variants}
              onClick={() => handlePanelChange(CVPanel.PROFILE)}
              className={styles.btn}
            >
              Profile
            </motion.button>
          </li>
          <li>
            <motion.button
              animate={
                activePanel === CVPanel.EXPERIENCE ? 'active' : 'inactive'
              }
              whileHover="hover"
              variants={variants}
              onClick={() => handlePanelChange(CVPanel.EXPERIENCE)}
              className={styles.btn}
            >
              Experience
            </motion.button>
          </li>
          <li>
            <motion.button
              animate={
                activePanel === CVPanel.EDUCATION ? 'active' : 'inactive'
              }
              whileHover="hover"
              variants={variants}
              onClick={() => handlePanelChange(CVPanel.EDUCATION)}
              className={styles.btn}
            >
              Education
            </motion.button>
          </li>
          <li>
            <motion.button
              animate={activePanel === CVPanel.SKILLS ? 'active' : 'inactive'}
              whileHover="hover"
              variants={variants}
              onClick={() => handlePanelChange(CVPanel.SKILLS)}
              className={styles.btn}
            >
              Skills
            </motion.button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default CVNavigation;
