import { ShallowWrapper, shallow } from 'enzyme';
import ProjectListItem from './ProjectListItem';

const mockProject = {
  id: '1',
  title: 'Project 1',
  slug: 'project-1',
  description: 'Description 1',
  keywords: ['keyword1', 'keyword2'],
};

describe('[COMPONENT]: ProjectListItem', () => {
  let wrapper: ShallowWrapper<typeof ProjectListItem>;
  const createWrapper = () => {
    wrapper = shallow(<ProjectListItem project={mockProject} />);
  };

  beforeEach(() => {
    createWrapper();
  });

  it('should render the project title in a h2 element', () => {
    expect(wrapper.find('h2').render().text()).toEqual(mockProject.title);
  });

  it('should render the project description in a p element', () => {
    expect(wrapper.find('p').render().text()).toEqual(mockProject.description);
  });

  it('should render the project keywords in a div element', () => {
    expect(
      wrapper.find('[data-test="project-keywords"]').render().text()
    ).toEqual(mockProject.keywords.join(''));
  });

  it('should contain a link to the project', () => {
    expect(wrapper.find('a').props().href).toEqual(
      `/projects/${mockProject.slug}`
    );
  });
});
