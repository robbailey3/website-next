import { CVExperience } from '@/data/cv/cv';
import { DateTime } from 'src/utils/dateTime';
import styles from './cv-experience-item.module.scss';

type CVExperienceItemProps = {
  experience: CVExperience;
};

const CVExperienceItem = (props: CVExperienceItemProps) => {
  const { experience } = props;

  const dateToString = (date: Date): string => {
    if (DateTime.isToday(date)) {
      return 'Present';
    }
    return DateTime.format(date, 'en-GB');
  };

  return (
    <div>
      <h3 className={styles.heading}>
        <span className={styles.heading__job_title}>{experience.jobTitle}</span>
        <span className={styles.heading__separator}>{'//'}</span>
        <span className={styles.heading__company}>{experience.company}</span>
      </h3>
      <div>
        <span className={styles.date}>
          {dateToString(experience.dateFrom)} -{' '}
          {dateToString(experience.dateTo)}
        </span>
      </div>
      <p>{experience.summary}</p>
      <ul>
        {experience.highlights.map((highlight, i) => (
          <li key={`${experience.jobTitle}_hightlight_${i}`}>{highlight}</li>
        ))}
      </ul>
    </div>
  );
};

export default CVExperienceItem;
