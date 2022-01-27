import { ShallowWrapper, shallow } from 'enzyme';
import Navigation from './Navigation';

describe('[COMPONENT]: Navigation', () => {
  let wrapper: ShallowWrapper<typeof Navigation>;
  const createWrapper = () => {
    wrapper = shallow(<Navigation />);
  };

  it('should render without crashing', () => {
    createWrapper();
    expect(wrapper).toBeTruthy();
  });
});
