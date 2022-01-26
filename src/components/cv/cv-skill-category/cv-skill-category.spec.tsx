import { CVSkillGroup } from '@/data/cv/cv';
import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import CvSkillCategory from './cv-skill-category';

describe('[COMPONENT]: CvSkillCategory', () => {
  const category: CVSkillGroup = {
    title: 'Category',
    skills: [{ name: 'Skill1' }, { name: 'Skill2' }, { name: 'Skill3' }],
  };
  const createWrapper = () => {
    return shallow(<CvSkillCategory category={category} />);
  };
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = createWrapper();
  });

  it('should render the title of the skill group in a h3 element', () => {
    expect(wrapper.find('h3').text()).toEqual(category.title);
  });

  it('should render each skill as a list item', () => {
    expect(wrapper.find('li').length).toEqual(category.skills.length);
  });

  it('should render each skill name within each list item', () => {
    expect(wrapper.find('li').map((node) => node.text())).toEqual(
      category.skills.map((skill) => skill.name)
    );
  });
});
