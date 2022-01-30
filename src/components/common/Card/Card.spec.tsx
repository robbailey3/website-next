import { ShallowWrapper, shallow } from 'enzyme';
import React from 'react';
import Card from './Card';
import { CardProps } from './Card';

describe('[COMPONENT]: Card', () => {
  let mountedComponent: ShallowWrapper<typeof Card>;
  const mountComponent = (props: CardProps) => {
    mountedComponent = shallow(<Card {...props} />);
  };

  it('should render any children within the card', () => {
    const cardContent = 'Card';
    mountComponent({ children: cardContent });

    expect(mountedComponent.text()).toEqual(cardContent);
  });

  it('should apply the className supplied in props to the element', () => {
    const className = 'test-class';
    mountComponent({ className, children: 'Card' });

    expect(mountedComponent.hasClass(className)).toBe(true);
  });

  it('should apply the header supplied in props to the element', () => {
    const header = 'Card Header';
    mountComponent({ header, children: 'Card' });

    expect(mountedComponent.find('header').text()).toEqual(header);
  });
});
