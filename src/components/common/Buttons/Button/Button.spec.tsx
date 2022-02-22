import { ShallowWrapper, shallow } from 'enzyme';
import Button, { ButtonProps } from './Button';

describe('[COMPONENT]: Button', () => {
  let wrapper: ShallowWrapper<typeof Button>;
  const createWrapper = (props: Partial<ButtonProps>) => {
    const defaultProps = {
      type: 'button',
      variant: 'primary',
      size: 'medium',
      onClick: jest.fn(),
      disabled: false,
      className: '',
      children: 'Hello',
    } as ButtonProps;
    wrapper = shallow(<Button {...{ ...defaultProps, ...props }} />);
  };

  describe('[PROP]: type', () => {
    it('should render a button with type="button" by default', () => {
      createWrapper({});
      expect(wrapper.prop('type')).toBe('button');
    });

    it('should render a button with type="submit" when type="submit" is passed', () => {
      createWrapper({ type: 'submit' });
      expect(wrapper.prop('type')).toBe('submit');
    });

    it('should render a button with type="reset" when type="reset" is passed', () => {
      createWrapper({ type: 'reset' });
      expect(wrapper.prop('type')).toBe('reset');
    });

    it('should render a button with type="button" when type="button" is passed', () => {
      createWrapper({ type: 'button' });
      expect(wrapper.prop('type')).toBe('button');
    });
  });

  describe('[PROP]: variant', () => {
    test.each([
      {
        variant: 'primary',
        expectedClassName:
          'bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600',
      },
      {
        variant: 'secondary',
        expectedClassName:
          'bg-emerald-600 text-white hover:bg-emerald-700 focus:bg-emerald-700',
      },
      {
        variant: 'tertiary',
        expectedClassName:
          'bg-teal-700 text-white hover:bg-teal-800 focus:bg-teal-800',
      },
      {
        variant: 'danger',
        expectedClassName:
          'bg-red-900 text-white hover:bg-red-800 focus:bg-red-800',
      },
      {
        variant: 'link',
        expectedClassName:
          'text-blue-500 hover:text-blue-600 hover:bg-gray-50 focus:text-blue-600 focus:bg-gray-50',
      },
      {
        variant: null,
        expectedClassName:
          'bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600',
      },
    ])(
      'should render a button with variant="%s"',
      ({ variant, expectedClassName }) => {
        createWrapper({ variant } as ButtonProps);
        expect(wrapper.prop('className')).toContain(expectedClassName);
      }
    );
  });

  describe('[PROP]: size', () => {
    test.each([
      {
        size: 'small',
        expectedClassName: 'px-2 py-1 text-sm',
      },
      {
        size: 'medium',
        expectedClassName: 'px-4 py-2 text-base',
      },
      {
        size: 'large',
        expectedClassName: 'px-6 py-3 text-lg',
      },
    ])(
      'should render a button with size="%s"',
      ({ size, expectedClassName }) => {
        createWrapper({ size } as ButtonProps);
        expect(wrapper.prop('className')).toContain(expectedClassName);
      }
    );
  });

  describe('[PROP]: disabled', () => {
    it('should render a button with disabled="true" when disabled=true is passed', () => {
      createWrapper({ disabled: true });
      expect(wrapper.prop('disabled')).toBe(true);
    });

    it('should render a button with disabled="false" when disabled=false is passed', () => {
      createWrapper({ disabled: false });
      expect(wrapper.prop('disabled')).toBe(false);
    });
  });

  describe('[PROP]: className', () => {
    it('should render a button with className="test" when className="test" is passed', () => {
      createWrapper({ className: 'test' });
      expect(wrapper.prop('className')).toContain('test');
    });
  });

  describe('[PROP]: onClick', () => {
    it('should call onClick when button is clicked', () => {
      createWrapper({ onClick: jest.fn() });
      wrapper.simulate('click');
      expect(wrapper.prop('onClick')).toHaveBeenCalled();
    });
  });

  describe('[PROP]: children', () => {
    it('should render a button with children="Hello" when children="Hello" is passed', () => {
      createWrapper({ children: 'Hello' });
      expect(wrapper.prop('children')).toBe('Hello');
    });
  });
});
