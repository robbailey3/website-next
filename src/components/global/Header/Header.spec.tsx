import { ShallowWrapper, shallow } from 'enzyme';
import Header from './Header';

describe('[COMPONENT]: Header', () => {
  let wrapper: ShallowWrapper<typeof Header>;
  const createWrapper = () => {
    wrapper = shallow(<Header />);
  };

  beforeEach(() => {
    createWrapper();
  });

  it('should contain a link back to the homepage', () => {
    console.log(wrapper.debug());
    expect(wrapper.find('Link').prop('href')).toBe('/');
  });

  it('should contain my name in a span element', () => {
    expect(wrapper.find('span').first().text()).toEqual('Rob Bailey');
  });

  it('should contain "software engineer" in another span element', () => {
    expect(wrapper.find('span').at(1).text()).toEqual('Software Engineer');
  });
});
