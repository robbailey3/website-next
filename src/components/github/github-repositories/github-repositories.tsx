import Container from '@/components/common/layout/container/container';
import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import FlexItem from '@/components/common/layout/flex-item/flex-item';
import { GetUserRepositoriesResponse } from '@/services/github/responses/GetUserRepositoriesResponse';
import { motion } from 'framer-motion';
import React from 'react';
import GithubRepositoryItem from '../github-repository-item/github-repository-item';
import styles from './github-repositories.module.scss';

type GithubRepositoriesProps = {
  repos: GetUserRepositoriesResponse[];
};

const GithubRepositories = (props: GithubRepositoriesProps) => {
  const { repos } = props;
  return (
    <motion.section
      data-cy="github-repositories"
      className={styles.repos}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 3 }}
    >
      <Container>
        <h2>Repositories</h2>
        <FlexContainer
          options={{
            wrap: 'wrap',
            justify: 'flex-start',
          }}
        >
          {repos.map((repo, i) => (
            <FlexItem
              key={repo.id}
              className={styles.repo}
              options={{
                basis: 'clamp(320px, 50%, 1000px)',
                grow: 0,
                shrink: 0,
              }}
            >
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className={styles.repo_item}
              >
                <GithubRepositoryItem repo={repo} />
              </motion.div>
            </FlexItem>
          ))}
        </FlexContainer>
      </Container>
    </motion.section>
  );
};

export default GithubRepositories;
