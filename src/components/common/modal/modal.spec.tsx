import { shallow } from 'enzyme';
import React from 'react';
import Modal from './modal';

describe('[COMPONENT]: Modal', () => {
  const createWrapper = (props: any) => {
    return shallow(<Modal {...props} />);
  };
  it('should display the backdrop when the modal state is "open"', () => {
    const wrapper = createWrapper({
      state: 'open',
    });
    expect(wrapper.find('[data-test="modal-backdrop"]')).toHaveLength(1);
  });

  it('should render nothing when the state is "closed"', () => {
    const wrapper = createWrapper({
      state: 'closed',
    });
    expect(wrapper.html()).toEqual(null);
  });

  it('should render the title in a H2 element in the modal', () => {
    const wrapper = createWrapper({
      state: 'open',
      title: 'Test title',
    });
    expect(wrapper.find('h2').text()).toBe('Test title');
  });

  it('should call the "onClose" prop method when the backdrop is clicked', () => {
    const onClose = jest.fn();
    const wrapper = createWrapper({
      state: 'open',
      onClose,
    });
    wrapper.find('[data-test="modal-backdrop"]').simulate('click');
    expect(onClose).toHaveBeenCalled();
  });
});
