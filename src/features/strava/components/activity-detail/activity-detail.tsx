import Container from '@/components/common/layout/container/container';
import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import FlexItem from '@/components/common/layout/flex-item/flex-item';
import { DateTime } from '@/utils/dateTime';
import React from 'react';
import { GetActivityResponse } from '../../responses/GetActivityResponse';
import RunMap from '../run-map/run-map';
import styles from './activity-detail.module.scss';

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
      <h1 className={styles.title}>{run.name}</h1>
      <div className={styles.date}>
        {DateTime.format(new Date(run.start_date_local), 'en-GB', {
          dateStyle: 'medium',
          timeStyle: 'medium',
        })}
      </div>
      <FlexContainer
        className={styles.basics}
        options={{ wrap: 'wrap', align: 'center', justify: 'space-around' }}
      >
        <FlexItem className={styles.basics_item}>
          <div className={styles.label}>Distance</div>
          <div className={styles.value}>
            {convertMetersToMiles(run.distance)} miles
          </div>
        </FlexItem>
        <FlexItem className={styles.basics_item}>
          <div className={styles.label}>Moving Time</div>
          <div className={styles.value}>
            {convertSecondsToTime(run.moving_time)}
          </div>
        </FlexItem>
        <FlexItem className={styles.basics_item}>
          <div className={styles.label}>Pace</div>
          <div className={styles.value}>
            {convertMetersPerSecondToMinutesPerMile(run.average_speed)}m/s
          </div>
        </FlexItem>
      </FlexContainer>
      <section className={styles.segments}>
        <h2 className={styles.segments_title}>Segments</h2>
        <ul className={styles.segments_list}>
          {run.segment_efforts.map((segment) => (
            <li key={segment.id} className={styles.segments_list_item}>
              <div className={styles.segments_list_item_name}>
                {segment.name}
              </div>
              <div className={styles.segments_list_item_distance}>
                {convertMetersToMiles(segment.distance)} miles
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.splits}>
        <h2 className={styles.splits_title}>Splits</h2>
        <ul className={styles.splits_list}>
          {run.splits_standard.map((split) => (
            <li key={split.moving_time} className={styles.splits_list_item}>
              <div className={styles.splits_list_item_name}>{split.name}</div>
              <div className={styles.splits_list_item_distance}>
                {convertMetersToMiles(split.distance)} miles
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.map}>
        <RunMap polyline={run.map.polyline} width={768} height={400}></RunMap>
      </section>
      <section>
        <pre>{JSON.stringify(run, null, 2)}</pre>
      </section>
    </Container>
  );
};

export default ActivityDetail;
