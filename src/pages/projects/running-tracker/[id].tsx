import Container from '@/components/common/layout/container/container';
import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import RunMap from '@/features/strava/components/run-map/run-map';
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
  console.log({ id });
  const run = await stravaService.getActivityById(id as string);
  console.log(run);
  return {
    props: { run: JSON.parse(JSON.stringify(run)) },
  };
}

const RunActivityPage = (props: RunActivityPageProps) => {
  const { run } = props;

  if (!run) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <h1>{run.name}</h1>
      <FlexContainer>
        <RunMap polyline={run.map.polyline} width={768} height={500}></RunMap>
      </FlexContainer>
    </Container>
  );
};

export default RunActivityPage;
