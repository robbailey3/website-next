import Card from '@/components/common/layout/card/card';
import { DateTime } from '@/utils/dateTime';
import Link from 'next/link';
import React from 'react';
import { GetActivityResponse } from '../../responses/GetActivityResponse';
import styles from './activity-list-item.module.scss';

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
    <Card className={styles.container}>
      <div className={styles.inner_wrapper}>
        <Link href={`/projects/running-tracker/${run._id}`}>
          <a className={styles.link}>
            <h2 className={styles.title}>{run.name}</h2>
          </a>
        </Link>
        <div className={styles.date}>
          {DateTime.format(new Date(run.start_date), 'en-GB', {
            dateStyle: 'medium',
            timeStyle: 'short',
          })}
        </div>
        <div className={styles.details}>
          <div className={styles.detail}>
            <div className={styles.detail_label}>Distance</div>
            <div className={styles.detail_value}>
              {convertMetersToMiles(run.distance)} miles
            </div>
          </div>
          <div className={styles.detail}>
            <div className={styles.detail_label}>Time</div>
            <div className={styles.detail_value}>
              {convertSecondsToTime(run.moving_time)}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ActivityListItem;
