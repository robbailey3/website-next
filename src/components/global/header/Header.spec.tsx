import { ShallowWrapper, shallow } from 'enzyme';
import Header from './Header';

describe('[COMPONENT]: Header', () => {
  let wrapper: ShallowWrapper<typeof Header>;
  const createWrapper = () => {
    wrapper = shallow(<Header />);
  };

  it('should contain my name in a span element', () => {
    createWrapper();
    expect(wrapper.find('span').first().text()).toEqual('Rob Bailey');
  });

  it('should contain "software engineer" in another span element', () => {
    createWrapper();
    expect(wrapper.find('span').at(1).text()).toEqual('Software Engineer');
  });
});
