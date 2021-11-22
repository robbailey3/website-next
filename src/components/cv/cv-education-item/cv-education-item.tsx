import { CVEducation } from '@/data/cv/cv';
import React from 'react';
import { DateTime } from '@/utils/dateTime';
import styles from './cv-education-item.module.scss';

type CVEducationItemProps = {
  education: CVEducation;
};

const CVEducationItem = (props: CVEducationItemProps) => {
  const { education } = props;

  const dateToString = (date: Date): string => {
    if (DateTime.isToday(date)) {
      return 'Present';
    }
    return DateTime.format(date, 'en-GB');
  };

  return (
    <div className={styles.item}>
      <h3 className={styles.heading}>
        <span className={styles.heading__qualification}>
          {education.qualification}
        </span>
        <span className={styles.heading__separator}>{'//'}</span>
        <span className={styles.heading__institution}>
          {education.institution}
        </span>
      </h3>
      <div>
        <span className={styles.date}>
          {dateToString(education.dateFrom)} - {dateToString(education.dateTo)}
        </span>
      </div>
      <p>{education.summary}</p>
      {education.highlights && education.highlights.length > 0 && (
        <>
          <h4 className={styles.highlights__title}>Highlights</h4>
          <ul>
            {education.highlights.map((highlight, i) => (
              <li key={`${education.qualification}_highlight_${i}`}>
                {highlight}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default CVEducationItem;
