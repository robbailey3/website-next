import Container from '@/components/common/layout/container/container';
import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import FlexItem from '@/components/common/layout/flex-item/flex-item';
import { GetUserResponse } from '@/services/github/responses/GetUserResponse';
import { faBriefcase, faCalendar, faFolder, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import React from 'react';
import { DateTime } from 'src/utils/dateTime';
import GithubUserItem from '../github-user-item/github-user-item';
import styles from './github-user-details.module.scss';

type GithubUserDetailsProps = {
	user: GetUserResponse;
};

const GithubUserDetails = (props: GithubUserDetailsProps) => {
	const { user } = props;

	return (
		<section data-cy="github-user-details" className={styles.user_details}>
			<Container>
				<div className={styles.avatar}>
					<Image src={user.avatar_url} alt={user.login} width={250} height={250} />
				</div>
				<h2 className={styles.user_name}>{user.name}</h2>
				<p className={styles.user_bio}>{user.bio}</p>
				<FlexContainer options={{ wrap: 'wrap', justify: 'center' }}>
					<FlexItem>
						<GithubUserItem icon={faBriefcase} text={user.company} />
					</FlexItem>
					<FlexItem>
						<GithubUserItem icon={faMapMarkerAlt} text={user.location} />
					</FlexItem>
					<FlexItem>
						<GithubUserItem icon={faCalendar} text={DateTime.format(new Date(user.created_at), 'en-GB')} />
					</FlexItem>
					<FlexItem>
						<GithubUserItem icon={faFolder} text={`${user.public_repos} repositories`} />
					</FlexItem>
				</FlexContainer>
			</Container>
		</section>
	);
};

export default GithubUserDetails;
