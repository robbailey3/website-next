import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './github-user-item.module.scss';

type GithubUserItemProps = {
  icon: IconProp;
  text: string;
};

const GithubUserItem = (props: GithubUserItemProps) => {
  const { icon, text } = props;

  if (!icon || !text) {
    return null;
  }
  return (
    <div className="flex items-center p-2 m-4">
      <FontAwesomeIcon icon={icon} className="mr-4" />
      <span>{text}</span>
    </div>
  );
};

export default GithubUserItem;
