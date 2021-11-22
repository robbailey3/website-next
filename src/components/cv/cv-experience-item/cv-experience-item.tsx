import Chip from '@/components/common/chip/chip';
import { CVExperience } from '@/data/cv/cv';
import React from 'react';
import { DateTime } from '@/utils/dateTime';
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
    <div className={styles.item}>
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
      <h4 className={styles.highlights__title}>Highlights</h4>
      <ul>
        {experience.highlights.map((highlight, i) => (
          <li key={`${experience.jobTitle}_hightlight_${i}`}>{highlight}</li>
        ))}
      </ul>
      <div className={styles.keywords}>
        {experience.keywords.map((keyword, i) => (
          <Chip key={`${experience.jobTitle}_keyword_${i}`}>{keyword}</Chip>
        ))}
      </div>
    </div>
  );
};

export default CVExperienceItem;
