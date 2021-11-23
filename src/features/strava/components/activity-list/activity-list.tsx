import React from 'react';
import { GetActivityResponse } from '../../responses/GetActivityResponse';
import ActivityListItem from '../activity-list-item/activity-list-item';
import styles from './activity-list.module.scss';

type ActivityListProps = {
  runs: GetActivityResponse[];
};

const ActivityList = (props: ActivityListProps) => {
  const { runs } = props;
  return (
    <div className={styles.container}>
      <h1>
        <span role="img" aria-label="Running Emoji">
          🏃
        </span>{' '}
        Rob&apos;s Runs
      </h1>
      <p>
        I&apos;m certainly not the best runner in the world but it&apos;s given
        me some interesting data to play with.
      </p>
      {runs.map((run) => (
        <ActivityListItem run={run} key={run._id} />
      ))}
    </div>
  );
};

export default ActivityList;
