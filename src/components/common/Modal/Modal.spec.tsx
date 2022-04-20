import { shallow } from 'enzyme';
import Modal, { ModalProps } from './Modal';

describe('[COMPONENT]: Modal', () => {
  const createWrapper = (props: ModalProps) => {
    return shallow(<Modal {...props} />);
  };

  it('should render without crashing', () => {
    const wrapper = createWrapper({
      onClose: jest.fn(),
      children: <div />,
    });
    expect(wrapper).toBeTruthy();
  });

  it('should call onClose when the background is clicked', () => {
    const onClose = jest.fn();
    const wrapper = createWrapper({
      onClose,
      children: <div />,
    });
    wrapper.find('[data-test="modal-background"]').simulate('click');
    expect(onClose).toHaveBeenCalled();
  });

  it('should call onClose when the close button is clicked', () => {
    const onClose = jest.fn();
    const wrapper = createWrapper({
      onClose,
      children: <div />,
    });
    wrapper.find('[data-test="close-button"]').simulate('click');
    expect(onClose).toHaveBeenCalled();
  });
});
