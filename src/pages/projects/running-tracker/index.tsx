import Container from '@/components/common/layout/container/container';
import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import ActivityList from '@/features/strava/components/activity-list/activity-list';
import { GetActivityResponse } from '@/features/strava/responses/GetActivityResponse';
import stravaService from '@/features/strava/services/strava.service';
import databaseService from '@/services/database/database.service';
import { NextPageContext } from 'next';
import React from 'react';

type RunningTrackerPageProps = {
  runs: GetActivityResponse[];
};

export async function getServerSideProps(_: NextPageContext) {
  await databaseService.connect();
  const runs = await stravaService.getActivities();
  return {
    props: {
      runs: JSON.parse(JSON.stringify(runs)),
    },
  };
}

const RunningTrackerPage = (props: RunningTrackerPageProps) => {
  const { runs } = props;
  return (
    <Container>
      <FlexContainer>
        <ActivityList runs={runs} />
      </FlexContainer>
    </Container>
  );
};

export default RunningTrackerPage;
