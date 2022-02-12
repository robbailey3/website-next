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
      <h2 className="my-2 text-gray-700 text-4xl">
        {profile.firstName} {profile.lastName}
      </h2>
      <p className="italic text-sm text-gray-800">{profile.profile}</p>
      <p className="my-2">
        {profile.location.city}, {profile.location.country}
        {profile.location.remote && (
          <span className="ml-2">
            <Tag variant="primary">Remote</Tag>
          </span>
        )}
      </p>
      <div className="my-4">
        {profile.socialMedia.map((social, i) => (
          <span
            key={`${social.name}__${i}`}
            className="text-3xl mr-2 text-gray-800 hover:text-blue-900"
          >
            <a href={social.url.toString()}>
              <FontAwesomeIcon icon={social.icon} />
              <span className="sr-only">{social.name}</span>
            </a>
          </span>
        ))}
      </div>
    </section>
  );
};

export default CvProfile;
