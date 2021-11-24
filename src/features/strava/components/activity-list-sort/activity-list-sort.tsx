import { FocusEventHandler } from 'react';
import { GetActivityResponse } from '../../responses/GetActivityResponse';

export interface ActivityListSortOption {
  label: string;
  value: keyof GetActivityResponse;
}

export type ActivityListSortDirection = 'asc' | 'desc';

export const ActivityListSortOptions: ActivityListSortOption[] = [
  {
    label: 'Date',
    value: 'start_date',
  },
  {
    label: 'Pace',
    value: 'average_speed',
  },
  {
    label: 'Distance',
    value: 'distance',
  },
  {
    label: 'Elevation',
    value: 'total_elevation_gain',
  },
];

type ActivityListSortProps = {
  handleSortChange: FocusEventHandler<HTMLSelectElement>;
  handleSortDirectionChange: FocusEventHandler<HTMLSelectElement>;
  value: string;
  direction: ActivityListSortDirection;
};

const ActivityListSort = (props: ActivityListSortProps) => {
  const { handleSortChange, handleSortDirectionChange, value, direction } =
    props;
  const sortOptions = Object.entries(ActivityListSortOptions);
  return (
    <>
      <select
        onBlur={handleSortChange}
        onChange={handleSortChange}
        value={value}
      >
        {sortOptions.map(([key, value]) => (
          <option key={key} value={value.value}>
            {value.label}
          </option>
        ))}
      </select>
      <select
        onBlur={handleSortDirectionChange}
        onChange={handleSortDirectionChange}
        value={direction}
      >
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>
    </>
  );
};

export default ActivityListSort;
