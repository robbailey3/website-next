import Card from '@/components/common/layout/card/card';
import { DateTime } from '@/utils/dateTime';
import Link from 'next/link';
import React from 'react';
import { GetActivityResponse } from '../../responses/GetActivityResponse';

type ActivityListItemProps = {
  run: GetActivityResponse;
};

const ActivityListItem = (props: ActivityListItemProps) => {
  const { run } = props;

  const convertMetersToMiles = (meters: number) => {
    return (meters / 1609.344).toFixed(2);
  };

  const convertSecondsToTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <Card className="p-4 mb-4">
      <div>
        <Link href={`/projects/running-tracker/${run._id}`}>
          <a>
            <h2>{run.name}</h2>
          </a>
        </Link>
        <div>
          {DateTime.format(new Date(run.start_date), 'en-GB', {
            dateStyle: 'medium',
            timeStyle: 'short',
          })}
        </div>
        <div>
          <div>
            <div>Distance</div>
            <div>{convertMetersToMiles(run.distance)} miles</div>
          </div>
          <div>
            <div>Time</div>
            <div>{convertSecondsToTime(run.moving_time)}</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ActivityListItem;
