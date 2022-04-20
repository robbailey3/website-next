import { mount } from 'enzyme';
import Breadcrumbs from './Breadcrumbs';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({}),
}));

describe('[COMPONENT]: Breadcrumbs', () => {
  const createWrapper = (routerPathname?: string) => {
    (useRouter as any).mockReturnValue({
      asPath: routerPathname || '/',
    });
    return mount(<Breadcrumbs />);
  };

  it('should render without crashing', () => {
    const wrapper = createWrapper();
    expect(wrapper).toBeTruthy();
  });

  it('should split the pathname into segments', () => {
    const wrapper = createWrapper('/foo/bar/baz');
    expect(wrapper.find('a').length).toBe(3);

    const firstSegment = wrapper.find('a').at(0);
    expect(firstSegment.text()).toBe('foo');
    expect(firstSegment.prop('href')).toBe('/foo');

    const secondSegment = wrapper.find('a').at(1);
    expect(secondSegment.text()).toBe('bar');
    expect(secondSegment.prop('href')).toBe('/foo/bar');

    const thirdSegment = wrapper.find('a').at(2);
    expect(thirdSegment.text()).toBe('baz');
    expect(thirdSegment.prop('href')).toBe('/foo/bar/baz');
  });

  it('should not render a link if the pathname is empty', () => {
    const wrapper = createWrapper('/');
    expect(wrapper.find('a').length).toBe(0);
  });
});
