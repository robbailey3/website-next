import { shallow, ShallowWrapper } from 'enzyme';
import { ObjectId } from 'mongodb';
import { GetActivityResponse } from '../../responses/GetActivityResponse';
import ActivityListItem from '../activity-list-item/activity-list-item';
import ActivityList from './activity-list';

describe('[COMPONENT]: ActivityList', () => {
  let wrapper: ShallowWrapper;
  let runs: GetActivityResponse[] = [
    { id: 1, _id: '123', name: 'run 1' },
    { id: 2, _id: '456', name: 'run 2' },
  ] as any;

  beforeEach(() => {
    wrapper = shallow(<ActivityList runs={runs} />);
  });

  it('should render an instance of ActivityListItem for each run', () => {
    expect(wrapper.find(ActivityListItem).length).toEqual(2);
  });
});
