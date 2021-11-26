import { CVEducation } from '@/data/cv/cv';
import React from 'react';
import { DateTime } from '@/utils/dateTime';

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
    <div className="mt-8 mb-16">
      <h3 className="text-lg">
        <span>{education.qualification}</span>
        <span className="mx-2 opacity-50 text-sm">{'//'}</span>
        <span>{education.institution}</span>
      </h3>
      <div>
        <span className="italic opacity-50 text-sm">
          {dateToString(education.dateFrom)} - {dateToString(education.dateTo)}
        </span>
      </div>
      <p>{education.summary}</p>
      {education.highlights && education.highlights.length > 0 && (
        <>
          <h4 className="text-lg my-2 text-tertiary">Highlights</h4>
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
