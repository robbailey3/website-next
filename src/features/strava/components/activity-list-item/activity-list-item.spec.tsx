import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import ActivityListItem from './activity-list-item';

describe('[COMPONENT]: ActivityListItem', () => {
  let run: any = {
    id: 1,
    name: 'Run 1',
    distance: 1000,
    moving_time: 60,
    elapsed_time: 60,
    start_date: '2019-01-01T00:00:00Z',
  };
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow(<ActivityListItem run={run} />);
  });

  it('should render the nme in a h2 element', () => {
    expect(wrapper.find('h2').text()).toEqual('Run 1');
  });
});
