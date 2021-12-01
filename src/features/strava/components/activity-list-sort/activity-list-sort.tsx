import Select from '@/components/common/form/select/select';
import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import React, { FocusEventHandler } from 'react';
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
  handleSortChange: (
    event:
      | React.FocusEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  handleSortDirectionChange: (
    event:
      | React.FocusEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  value: string;
  direction: ActivityListSortDirection;
};

const ActivityListSort = (props: ActivityListSortProps) => {
  const { handleSortChange, handleSortDirectionChange, value, direction } =
    props;

  return (
    <FlexContainer className="gap-4 my-4">
      <Select
        onBlur={handleSortChange}
        onChange={handleSortChange}
        label="Sort by"
        value={value}
        options={ActivityListSortOptions}
        name="Sort Field"
        id="sort-field"
        className="flex-grow"
      ></Select>
      <Select
        onBlur={handleSortDirectionChange}
        onChange={handleSortDirectionChange}
        label="Direction"
        value={direction}
        options={[
          { label: 'Ascending', value: 'asc' },
          { label: 'Descending', value: 'desc' },
        ]}
        name="Sort Direction"
        id="sort-direction"
        className="flex-initial"
      ></Select>
    </FlexContainer>
  );
};

export default ActivityListSort;
