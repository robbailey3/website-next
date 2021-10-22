import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import { CV } from '@/data/cv/cv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React from 'react';
import styles from './cv-profile-panel.module.scss';

const CVProfilePanel = () => {
  const { profile } = CV;

  return (
    <section className={styles.profile}>
      <h2 className={styles.name}>
        {profile.firstName} {profile.lastName}
      </h2>
      <div className={styles.location}>
        <p>
          {profile.location.city}, {profile.location.country}
        </p>
      </div>
      <p>{profile.profile}</p>
      <FlexContainer>
        {profile.socialMedia.map((social, i) => (
          <motion.div
            className={styles.social__link}
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
      </FlexContainer>
    </section>
  );
};

export default CVProfilePanel;
