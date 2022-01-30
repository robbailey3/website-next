import { ShallowWrapper, shallow } from 'enzyme';
import NavigationLink, { NavigationLinkProps } from './NavigationLink';
import * as nextRouter from 'next/router';

describe('[COMPONENT]: NavigationLink', () => {
  let wrapper: ShallowWrapper<typeof NavigationLink>;
  const createWrapper = (props: NavigationLinkProps, currentPath = '') => {
    (nextRouter as any).useRouter = jest
      .fn()
      .mockReturnValue({ pathname: currentPath });
    wrapper = shallow(<NavigationLink {...props} />);
  };

  it('should render a link with the specified text', () => {
    createWrapper({ text: 'Test', href: '/' });
    const a = wrapper.find('a');
    expect(a.text()).toBe('Test');
  });

  it('should render a link with the specified href prop', () => {
    createWrapper({ text: 'Test', href: '/' });
    const a = wrapper.find('a');
    expect(a.prop('href')).toBe('/');
  });

  it('should apply classes when the link is active', () => {
    createWrapper({ text: 'Test', href: '/' }, '/');
    const a = wrapper.find('a');
    expect(a.hasClass('bg-blue-600')).toBe(true);
  });
});
