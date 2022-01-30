import { ShallowWrapper, shallow } from 'enzyme';
import HomepageBanner from './HomepageBanner';

describe('[COMPONENT]: HomepageBanner', () => {
  let wrapper: ShallowWrapper<typeof HomepageBanner>;
  const createWrapper = () => {
    wrapper = shallow(<HomepageBanner />);
  };

  it('should have a h1 element saying "Hello!"', () => {
    // TODO: Add tests
    createWrapper();
    expect(wrapper).toBeTruthy();
  });
});
