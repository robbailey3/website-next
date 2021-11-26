import React, { FocusEvent, useState } from 'react';
import { GetActivityResponse } from '../../responses/GetActivityResponse';
import ActivityListItem from '../activity-list-item/activity-list-item';
import ActivityListSort, {
  ActivityListSortDirection,
} from '../activity-list-sort/activity-list-sort';

type ActivityListProps = {
  runs: GetActivityResponse[];
};

const ActivityList = (props: ActivityListProps) => {
  const { runs } = props;

  const [runState, setRunState] = useState<GetActivityResponse[]>(runs);

  const [sortOption, setSortOption] =
    useState<keyof GetActivityResponse>('start_date');

  const [sortDirection, setSortDirection] =
    useState<ActivityListSortDirection>('desc');

  const handleSort = ($event: FocusEvent<HTMLSelectElement>) => {
    setSortOption($event.target.value as keyof GetActivityResponse);
    sortRuns();
  };

  const handleSortDirectionChange = ($event: FocusEvent<HTMLSelectElement>) => {
    setSortDirection($event.target.value as ActivityListSortDirection);
    sortRuns();
  };

  const sortRuns = () => {
    setRunState(
      runs.sort((a, b) => {
        console.log(`Sorting by ${sortOption} ${sortDirection}`);
        if (!a[sortOption] || !b[sortOption]) {
          return 0;
        }
        if (sortDirection === 'desc') {
          return (a[sortOption] as any)! - (b[sortOption] as any)!;
        }
        return (b[sortOption] as any)! - (a[sortOption] as any)!;
      })
    );
  };

  return (
    <div>
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
      <ActivityListSort
        handleSortChange={handleSort}
        value={sortOption}
        handleSortDirectionChange={handleSortDirectionChange}
        direction={sortDirection}
      />
      {runState.map((run) => (
        <ActivityListItem run={run} key={run._id} />
      ))}
    </div>
  );
};

export default ActivityList;
