import { CVPanel } from '@/data/cv-panel';
import { motion, Variants } from 'framer-motion';

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
    <aside className="p-4 pt-16 md:sticky top-0 left-0">
      <nav>
        <ul className="border-l border-tertiary">
          <li>
            <motion.button
              animate={activePanel === CVPanel.PROFILE ? 'active' : 'inactive'}
              whileHover="hover"
              variants={variants}
              onClick={() => handlePanelChange(CVPanel.PROFILE)}
              className="p-4"
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
              className="p-4"
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
              className="p-4"
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
              className="p-4"
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
