import Link from 'next/link';
import React from 'react';
import { GetActivityResponse } from '../../responses/GetActivityResponse';

type ActivityListProps = {
  runs: GetActivityResponse[];
};

const ActivityList = (props: ActivityListProps) => {
  const { runs } = props;
  return (
    <div>
      <h1>Activity List</h1>
      <ul>
        {runs.map((run) => (
          <li key={run.id}>
            <Link href={`/projects/running-tracker/${run._id}`}>
              <a>{run.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityList;
