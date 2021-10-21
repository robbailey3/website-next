import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import FlexItem from '@/components/common/layout/flex-item/flex-item';
import { GetUserRepositoriesResponse } from '@/services/github/responses/GetUserRepositoriesResponse';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Image from 'next/image';
import styles from './github-repository-item.module.scss';

type GithubRepositoryItemProps = {
	repo: GetUserRepositoriesResponse;
};

const GithubRepositoryItem = (props: GithubRepositoryItemProps) => {
	const { repo } = props;

	const getLanguageIcon = (): string | null => {
		switch (repo.language) {
			case 'TypeScript':
				return '/tech-icons/typescript-original.svg';
			case 'Go':
				return '/tech-icons/go-original.svg';
			case 'JavaScript':
				return '/tech-icons/javascript-original.svg';
			case 'HTML':
				return '/tech-icons/html5-original.svg';
			case 'Python':
				return '/tech-icons/python-original.svg';
			case 'C++':
				return '/tech-icons/cplusplus-original.svg';
			case 'C#':
				return '/tech-icons/csharp-original.svg';
			case 'C':
				return '/tech-icons/c-original.svg';
			case 'Java':
				return '/tech-icons/java-original.svg';
			case 'Ruby':
				return '/tech-icons/ruby-original.svg';
			case 'Rust':
				return '/tech-icons/rust-plain.svg';
			case 'Swift':
				return '/tech-icons/swift-original.svg';
			case 'Kotlin':
				return '/tech-icons/kotlin-original.svg';
			default:
				return null;
		}
	};

	return (
		<div className={styles.repo}>
			<div className={styles.repo__info}>
				<div className={styles.repo__name}>
					<a href={repo.html_url} target="_blank" rel="noopener noreferrer">
						{repo.name}
					</a>
				</div>
				{repo.description && <div className={styles.repo__description}>{repo.description}</div>}
			</div>
			<FlexContainer options={{ align: 'center' }}>
				<FlexItem options={{ grow: 1 }}>
					<div className={styles.repo__language}>
						{getLanguageIcon() && getLanguageIcon() !== null && (
							<Image src={getLanguageIcon() as string} alt={repo.language || ''} width={25} height={25} className={styles.repo__language__icon}/>
						)}
						<span className={styles.repo__language__span}>{repo.language}</span>
					</div>
				</FlexItem>
				<FlexItem>
					<div className={styles.repo_info_item}>
						<FontAwesomeIcon icon={faCodeBranch} />
						<span>{repo.forks}</span>
					</div>
				</FlexItem>
				<FlexItem>
					<div className={styles.repo_info_item}>
						<span>{repo.size}kB</span>
					</div>
				</FlexItem>
			</FlexContainer>
		</div>
	);
};

export default GithubRepositoryItem;
