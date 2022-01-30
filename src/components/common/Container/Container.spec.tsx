import { ShallowWrapper, shallow } from 'enzyme';
import Container from './Container';

describe('[COMPONENT]: Container', () => {
  let wrapper: ShallowWrapper<typeof Container>;
  const createWrapper = (children: JSX.Element | JSX.Element[]) => {
    wrapper = shallow(<Container>{children}</Container>);
  };

  it('should render children', () => {
    createWrapper(<div>Test</div>);
    expect(wrapper.contains(<div>Test</div>)).toBe(true);
  });
});
