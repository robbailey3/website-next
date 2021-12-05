import Container from '@/components/common/layout/container/container';
import Pagination from '@/components/common/pagination/pagination';
import ActivityList from '@/features/strava/components/activity-list/activity-list';
import { GetActivityResponse } from '@/features/strava/responses/GetActivityResponse';
import stravaService from '@/features/strava/services/strava.service';
import databaseService from '@/services/database/database.service';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

type RunningTrackerPageProps = {
  runs: GetActivityResponse[];
  count: number;
};

export async function getServerSideProps(context: NextPageContext) {
  const page = parseInt(context.query.page as string, 10) || 1;

  await databaseService.connect();
  const { activities, count } = await stravaService.getActivities(25, page);
  return {
    props: {
      runs: JSON.parse(JSON.stringify(activities)),
      count,
    },
  };
}

const RunningTrackerPage = (props: RunningTrackerPageProps) => {
  const { runs, count } = props;

  const router = useRouter();

  const page = parseInt(router.query.page as string, 10) || 1;

  const handlePageChange = (page: number) => {
    router.push(`/projects/running-tracker?page=${page}`);
  };

  return (
    <Container>
      <ActivityList runs={runs} />
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(count / 25)}
        handlePageChange={handlePageChange}
      ></Pagination>
    </Container>
  );
};

export default RunningTrackerPage;
