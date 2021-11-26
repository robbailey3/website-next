import Container from '@/components/common/layout/container/container';
import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import FlexItem from '@/components/common/layout/flex-item/flex-item';
import { GetUserResponse } from '@/services/github/responses/GetUserResponse';
import {
  faBriefcase,
  faCalendar,
  faFolder,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import React from 'react';
import { DateTime } from '@/utils/dateTime';
import GithubUserItem from '../github-user-item/github-user-item';

type GithubUserDetailsProps = {
  user: GetUserResponse;
};

const GithubUserDetails = (props: GithubUserDetailsProps) => {
  const { user } = props;

  return (
    <section
      data-cy="github-user-details"
      className="text-center bg-background-400"
    >
      <Container className="inline-block">
        <div className="rounded-full border-2 border-accent w-48 block mt-8 mx-auto overflow-hidden">
          <Image
            src={user.avatar_url}
            alt={user.login}
            width={250}
            height={250}
          />
        </div>
        <h2>{user.name}</h2>
        <p>{user.bio}</p>
        <FlexContainer className="flex-wrap justify-center">
          <FlexItem>
            <GithubUserItem icon={faBriefcase} text={user.company} />
          </FlexItem>
          <FlexItem>
            <GithubUserItem icon={faMapMarkerAlt} text={user.location} />
          </FlexItem>
          <FlexItem>
            <GithubUserItem
              icon={faCalendar}
              text={DateTime.format(new Date(user.created_at), 'en-GB')}
            />
          </FlexItem>
          <FlexItem>
            <GithubUserItem
              icon={faFolder}
              text={`${user.public_repos} repositories`}
            />
          </FlexItem>
        </FlexContainer>
      </Container>
    </section>
  );
};

export default GithubUserDetails;
