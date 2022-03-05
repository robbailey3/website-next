import { UserProvider } from '@auth0/nextjs-auth0';
import { ShallowWrapper, shallow } from 'enzyme';
import Navigation from './Navigation';

describe('[COMPONENT]: Navigation', () => {
  let wrapper: ShallowWrapper<typeof Navigation>;
  const createWrapper = () => {
    wrapper = shallow(
      <UserProvider>
        <Navigation />
      </UserProvider>
    );
  };

  it('should render without crashing', () => {
    createWrapper();
    expect(wrapper).toBeTruthy();
  });
});
