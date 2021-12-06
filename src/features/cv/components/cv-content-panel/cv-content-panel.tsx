import { CVPanel } from '@/data/cv-panel';
import { CV } from '@/data/cv/cv';
import { motion } from 'framer-motion';
import React from 'react';
import CVEducationPanel from '../cv-education-panel/cv-education-panel';
import CVExperiencePanel from '../cv-experience-panel/cv-experience-panel';
import CVProfilePanel from '../cv-profile-panel/cv-profile-panel';
import CVSkillsPanel from '../cv-skills-panel/cv-skills-panel';

type CVContentPanelProps = {
  activePanel: string;
};

const CVContentPanel = (props: CVContentPanelProps) => {
  const { activePanel } = props;

  const CVComponents: { [key: string]: JSX.Element } = {
    profile: <CVProfilePanel />,
    experience: <CVExperiencePanel />,
    education: <CVEducationPanel />,
    skills: <CVSkillsPanel />,
  };

  const animate = { y: 0, opacity: 1 };
  const initial = { y: -100, opacity: 0 };
  const transition = { duration: 0.5 };

  return <>{CVComponents[activePanel]}</>;
};

export default CVContentPanel;
