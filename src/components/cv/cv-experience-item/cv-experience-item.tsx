import Chip from '@/components/common/chip/chip';
import { CVExperience } from '@/data/cv/cv';
import React from 'react';
import { DateTime } from '@/utils/dateTime';

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
    <div className="mt-8 mb-16">
      <h3 className="text-lg">
        <span>{experience.jobTitle}</span>
        <span className="mx-2 opacity-50 text-sm">{'//'}</span>
        <span>{experience.company}</span>
      </h3>
      <div>
        <span className="italic opacity-50 text-sm">
          {dateToString(experience.dateFrom)} -{' '}
          {dateToString(experience.dateTo)}
        </span>
      </div>
      <p>{experience.summary}</p>
      <h4 className="text-lg my-2 text-tertiary">Highlights</h4>
      <ul>
        {experience.highlights.map((highlight, i) => (
          <li key={`${experience.jobTitle}_hightlight_${i}`}>{highlight}</li>
        ))}
      </ul>
      <div>
        {experience.keywords.map((keyword, i) => (
          <Chip key={`${experience.jobTitle}_keyword_${i}`}>{keyword}</Chip>
        ))}
      </div>
    </div>
  );
};

export default CVExperienceItem;
