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
});
