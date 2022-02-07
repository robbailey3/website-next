import { ShallowWrapper, shallow } from 'enzyme';
import projects from '../../data/projects';
import ProjectList from './ProjectList';

describe('[COMPONENT]: ProjectList', () => {
  let wrapper: ShallowWrapper<typeof ProjectList>;
  const createWrapper = () => {
    wrapper = shallow(<ProjectList />);
  };

  beforeEach(() => {
    createWrapper();
  });

  it('should render a ProjectListItem for each project in the data', () => {
    expect(wrapper.find('ProjectListItem').length).toBe(projects.length);
  });
});
