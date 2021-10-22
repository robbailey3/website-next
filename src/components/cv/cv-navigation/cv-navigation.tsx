import { CVPanel } from '@/data/cv-panel';
import clsx from 'clsx';
import styles from './cv-navigation.module.scss';

type CVNavigationProps = {
  activePanel: string;
  handlePanelChange: (panel: CVPanel) => void;
};

const CVNavigation = (props: CVNavigationProps) => {
  const { activePanel, handlePanelChange } = props;

  return (
    <aside className={styles.nav}>
      <h2>Navigation</h2>
      <nav>
        <ul>
          <li>
            <button
              onClick={() => handlePanelChange(CVPanel.PROFILE)}
              className={clsx(styles.btn, {
                [styles.btn__active]: activePanel === CVPanel.PROFILE,
              })}
            >
              Profile
            </button>
          </li>
          <li>
            <button
              onClick={() => handlePanelChange(CVPanel.EXPERIENCE)}
              className={clsx(styles.btn, {
                [styles.btn__active]: activePanel === CVPanel.EXPERIENCE,
              })}
            >
              Experience
            </button>
          </li>
          <li>
            <button
              onClick={() => handlePanelChange(CVPanel.EDUCATION)}
              className={clsx(styles.btn, {
                [styles.btn__active]: activePanel === CVPanel.EDUCATION,
              })}
            >
              Education
            </button>
          </li>
          <li>
            <button
              onClick={() => handlePanelChange(CVPanel.SKILLS)}
              className={clsx(styles.btn, {
                [styles.btn__active]: activePanel === CVPanel.SKILLS,
              })}
            >
              Skills
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default CVNavigation;
