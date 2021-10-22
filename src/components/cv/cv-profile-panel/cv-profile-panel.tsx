import { CV } from '@/data/cv/cv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React from 'react';

const CVProfilePanel = () => {
  const { profile } = CV;

  return (
    <section>
      <h2>
        {profile.firstName} {profile.lastName}
      </h2>
      <div>
        <p>
          {profile.location.city}, {profile.location.country}
        </p>
      </div>
      <p>{profile.profile}</p>
      <div>
        {profile.socialMedia.map((social, i) => (
          <motion.div
            key={social.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
          >
            <FontAwesomeIcon icon={social.icon} />
            <a
              href={social.url.toString()}
              target="_blank"
              rel="noopener noreferrer"
            >
              {social.name}
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CVProfilePanel;
