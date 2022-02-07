import { ShallowWrapper, shallow, CommonWrapper } from 'enzyme';
import projects from '../../data/projects';
import { Project } from '../../models/Project';
import ProjectListItem from '../ProjectListItem/ProjectListItem';
import ProjectList from './ProjectList';

jest.mock(
  '../../data/projects',
  () =>
    [
      {
        id: '1',
      },
    ] as Project[]
);

describe('[COMPONENT]: ProjectList', () => {
  let wrapper: ShallowWrapper<typeof ProjectList>;
  const createWrapper = () => {
    wrapper = shallow(<ProjectList />);
  };

  beforeEach(() => {
    createWrapper();
  });

  it('should contain a heading with "Projects" in it', () => {
    expect(wrapper.find('h1').render().text()).toEqual('Projects');
  });

  it('should render a ProjectListItem for each project in the data', () => {
    expect(wrapper.find('ProjectListItem').length).toBe(projects.length);
  });

  it('should pass the project into the project list item as props', () => {
    const project = projects[0];
    expect(
      (wrapper.find('ProjectListItem').at(0) as any).props().project
    ).toEqual(project);
  });
});
