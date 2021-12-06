import Container from '@/components/common/layout/container/container';
import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import FlexItem from '@/components/common/layout/flex-item/flex-item';
import { GetUserRepositoriesResponse } from '@/features/github/services/responses/GetUserRepositoriesResponse';
import { motion } from 'framer-motion';
import React from 'react';
import GithubRepositoryItem from '../github-repository-item/github-repository-item';

type GithubRepositoriesProps = {
  repos: GetUserRepositoriesResponse[];
};

const GithubRepositories = (props: GithubRepositoriesProps) => {
  const { repos } = props;
  return (
    <motion.section
      data-cy="github-repositories"
      className="overflow-auto"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 3 }}
    >
      <Container>
        <h2 className="text-center">Repositories</h2>
        <FlexContainer className="flex-wrap items-stretch">
          {repos.map((repo, i) => (
            <FlexItem key={repo.id} className="w-full md:w-1/2 xl:w-1/3 p-4">
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="h-full"
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
