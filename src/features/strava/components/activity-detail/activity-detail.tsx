import Container from '@/components/common/layout/container/container';
import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import FlexItem from '@/components/common/layout/flex-item/flex-item';
import { DateTime } from '@/utils/dateTime';
import React from 'react';
import { GetActivityResponse } from '../../responses/GetActivityResponse';
import ActivitySegments from '../activity-segments/activity-segments';
import ActivitySplits from '../activity-splits/activity-splits';
import RunMap from '../run-map/run-map';

type ActivityDetailProps = {
  run: GetActivityResponse;
};

const ActivityDetail = (props: ActivityDetailProps) => {
  const { run } = props;

  const convertMetersToMiles = (meters: number) => {
    return (meters * 0.000621371).toFixed(2);
  };

  const convertMetersPerSecondToMinutesPerMile = (metersPerSecond: number) => {
    const d = new Date((26.8224 / metersPerSecond) * 1000 * 60);
    return `${d.getMinutes()}:${d.getSeconds()}`;
  };

  const convertSecondsToTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <Container>
      <h1>{run.name}</h1>
      <div>
        {DateTime.format(new Date(run.start_date_local), 'en-GB', {
          dateStyle: 'medium',
          timeStyle: 'medium',
        })}
      </div>
      <FlexContainer className="flex-wrap items-center justify-between text-xl">
        <FlexItem>
          <div>Distance</div>
          <div>{convertMetersToMiles(run.distance)} miles</div>
        </FlexItem>
        <FlexItem>
          <div>Moving Time</div>
          <div>{convertSecondsToTime(run.moving_time)}</div>
        </FlexItem>
        <FlexItem>
          <div>Pace</div>
          <div>
            {convertMetersPerSecondToMinutesPerMile(run.average_speed)}m/s
          </div>
        </FlexItem>
      </FlexContainer>
      <section></section>
      <section>
        <FlexContainer className="gap-4">
          <FlexItem className="w-full md:w-1/2">
            <ActivitySplits splits={run.splits_standard} />
          </FlexItem>
          <FlexItem className="w-full md:w-1/2">
            <ActivitySegments segments={run.segment_efforts} />
          </FlexItem>
        </FlexContainer>
      </section>
      <section>
        <RunMap polyline={run.map.polyline} width={768} height={400}></RunMap>
      </section>
      <section>
        <pre>{JSON.stringify(run, null, 2)}</pre>
      </section>
    </Container>
  );
};

export default ActivityDetail;
