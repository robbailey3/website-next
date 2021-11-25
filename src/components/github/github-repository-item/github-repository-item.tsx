import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import FlexItem from '@/components/common/layout/flex-item/flex-item';
import { GetUserRepositoriesResponse } from '@/services/github/responses/GetUserRepositoriesResponse';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Image from 'next/image';
import styles from './github-repository-item.module.scss';
import Card from '@/components/common/layout/card/card';

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
    <Card className="h-full w-full flex flex-col p-4">
      <div className="flex-grow">
        <div className="text-xl mb-4">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline"
          >
            {repo.name}
          </a>
        </div>
        {repo.description && <div className="mb-4">{repo.description}</div>}
      </div>
      <FlexContainer className="items-center">
        <FlexItem className="flex-grow">
          <div className="text-lg text-font-light">
            {getLanguageIcon() && getLanguageIcon() !== null && (
              <Image
                src={getLanguageIcon() as string}
                alt={repo.language || ''}
                width={25}
                height={25}
              />
            )}
            <span className="mx-2">{repo.language}</span>
          </div>
        </FlexItem>
        <FlexItem>
          <div className="mx-2">
            <FontAwesomeIcon icon={faCodeBranch} />
            <span>{repo.forks}</span>
          </div>
        </FlexItem>
        <FlexItem>
          <div className="mx-2">
            <span>{repo.size}kB</span>
          </div>
        </FlexItem>
      </FlexContainer>
    </Card>
  );
};

export default GithubRepositoryItem;
