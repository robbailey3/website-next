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
		<div className={styles.item}>
			<FontAwesomeIcon icon={icon} className={styles.icon} />
			<span className={styles.text}>{text}</span>
		</div>
	);
};

export default GithubUserItem;
