import { shallow } from 'enzyme';
import React from 'react';
import Modal from './modal';
import styles from './modal.module.scss';

describe('[COMPONENT]: Modal', () => {
  const createWrapper = (props: any) => {
    return shallow(<Modal {...props} />);
  };
  it('should display the backdrop when the modal state is "open"', () => {
    const wrapper = createWrapper({
      state: 'open',
    });
    expect(wrapper.find(`.${styles.modal__backdrop}`)).toHaveLength(1);
  });

  it('should apply the "open" attribute to the HTML Dialog element when the state is "open"', () => {
    const wrapper = createWrapper({
      state: 'open',
    });
    expect(wrapper.find(`.${styles.modal__dialog}`).prop('open')).toBe(true);
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
    wrapper.find(`.${styles.modal__backdrop}`).simulate('click');
    expect(onClose).toHaveBeenCalled();
  });

  it('should call the "onClose" prop method when the close button is clicked', () => {
    const onClose = jest.fn();
    const wrapper = createWrapper({
      state: 'open',
      onClose,
    });
    wrapper.find(`.${styles.modal__close}`).simulate('click');
    expect(onClose).toHaveBeenCalled();
  });
});
