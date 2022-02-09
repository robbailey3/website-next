import Tag from '@/components/common/Tag/Tag';
import { CVProfile } from '@/data/cv/cv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface CvProfileProps {
  profile: CVProfile;
}

const CvProfile = (props: CvProfileProps) => {
  const { profile } = props;

  return (
    <section>
      <h2>Profile</h2>
      <p>
        {profile.firstName} {profile.lastName}
      </p>
      <p>{profile.profile}</p>
      <p>
        {profile.location.remote && (
          <span className="mr-2">
            <Tag variant="primary">Remote</Tag>
          </span>
        )}
        {profile.location.city}, {profile.location.country}
      </p>
      <p>
        {profile.socialMedia.map((social, i) => (
          <span key={`${social.name}__${i}`}>
            <a href={social.url.toString()}>
              <FontAwesomeIcon icon={social.icon} className="text-2xl mr-2" />
              <span className="sr-only">{social.name}</span>
            </a>
          </span>
        ))}
      </p>
      <pre>{JSON.stringify(profile, null, 4)}</pre>
    </section>
  );
};

export default CvProfile;
