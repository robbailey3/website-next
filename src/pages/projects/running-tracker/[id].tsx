import Container from '@/components/common/layout/container/container';
import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import ActivityDetail from '@/features/strava/components/activity-detail/activity-detail';
import { GetActivityResponse } from '@/features/strava/responses/GetActivityResponse';
import stravaService from '@/features/strava/services/strava.service';
import databaseService from '@/services/database/database.service';
import { NextPageContext } from 'next';
import React from 'react';

type RunActivityPageProps = {
  run: GetActivityResponse;
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;
  await databaseService.connect();
  const run = await stravaService.getActivityById(id as string);
  return {
    props: { run: JSON.parse(JSON.stringify(run)) },
  };
}

const RunActivityPage = (props: RunActivityPageProps) => {
  const { run } = props;

  if (!run) {
    return <Container>Loading...</Container>;
  }

  return <ActivityDetail run={run}></ActivityDetail>;
};

export default RunActivityPage;
