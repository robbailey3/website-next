import Container from '@/components/common/Container/Container';
import RunningDashboard from '@/features/strava/components/RunningDashboard/RunningDashboard';
import Head from 'next/head';

const RunningTrackerPage = () => {
  return (
    <>
      <Head>
        <title>Running Tracker / Projects / Rob Bailey</title>
        <meta
          name="description"
          content="A project using Strava webhooks to track running activities"
        />
      </Head>
      <Container>
        <RunningDashboard />
      </Container>
    </>
  );
};

export default RunningTrackerPage;
