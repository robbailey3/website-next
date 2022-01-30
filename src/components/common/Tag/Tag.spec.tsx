import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import Tag, { TagProps } from './Tag';

describe('[COMPONENT]: Tag', () => {
  let wrapper: ShallowWrapper<typeof Tag>;
  const createWrapper = (props: TagProps) => {
    wrapper = shallow(<Tag {...props} />);
  };

  it('should render any children in the span', () => {
    createWrapper({ children: 'Hello World', variant: 'primary' });
    expect(wrapper.find('span').text()).toBe('Hello World');
  });

  it('should render a button if the dismissable prop is true', () => {
    createWrapper({
      children: 'Hello World',
      variant: 'primary',
      dismissible: true,
    });
    expect(wrapper.find('button').length).toBe(1);
  });

  it('should call the onDismiss prop when the dismiss button is clicked', () => {
    const onDismiss = jest.fn();
    createWrapper({
      children: 'Hello World',
      variant: 'primary',
      dismissible: true,
      onDismiss,
    });
    wrapper.find('button').simulate('click');
    expect(onDismiss).toHaveBeenCalled();
  });

  test.each([
    ['primary', 'bg-blue-100 text-black'],
    ['default', 'bg-gray-100 text-black'],
  ])(
    'should render the correct colours for the variant %s',
    (variant, expected) => {
      createWrapper({ children: 'Hello World', variant } as any);
      expect(wrapper.find('span').prop('className')).toContain(expected);
    }
  );
});
