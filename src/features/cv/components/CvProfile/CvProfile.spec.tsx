import { CVProfile } from '@/data/cv/cv';
import { ShallowWrapper, shallow } from 'enzyme';
import CvProfile from './CvProfile';

const mockProfile: CVProfile = {
  firstName: 'John',
  lastName: 'Doe',
  location: {
    city: 'London',
    country: 'United Kingdom',
    remote: true,
  },
  socialMedia: [
    { name: 'Facebook', url: 'https://www.facebook.com/', icon: 'facebook' },
  ],
  profile:
    "I'm a full-stack developer with a passion for building web applications. I'm currently working at <a href='https://www.google.com/'>Google</a> as a Software Engineer.",
};

describe('[COMPONENT]: CvProfile', () => {
  let wrapper: ShallowWrapper<typeof CvProfile>;
  const createWrapper = () => {
    wrapper = shallow(<CvProfile profile={mockProfile} />);
  };

  beforeEach(() => {
    createWrapper();
  });

  it('should contain the first name and last name in a h2 element', () => {
    expect(wrapper.find('h2').text()).toEqual(
      `${mockProfile.firstName} ${mockProfile.lastName}`
    );
  });

  it('should contain the profile in a p element', () => {
    expect(wrapper.find('p[data-test="profile"]').text()).toEqual(
      mockProfile.profile
    );
  });

  it('should contain the city and country in a p element', () => {
    expect(wrapper.find('p[data-test="location"]').text()).toContain(
      `${mockProfile.location.city}, ${mockProfile.location.country}`
    );
  });

  it('should contain a link for each social media', () => {
    expect(wrapper.find('a[data-test="social"]').length).toEqual(
      mockProfile.socialMedia.length
    );
  });
});
