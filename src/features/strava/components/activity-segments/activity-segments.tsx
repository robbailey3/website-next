import CollapsibleSection from '@/components/common/collapsible-section/collapsible-section';
import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import FlexItem from '@/components/common/layout/flex-item/flex-item';
import React from 'react';
import { TEffort } from '../../responses/GetActivityResponse';
import runUtilsService from '../../services/run-utils.service';
import RunMap from '../run-map/run-map';

type ActivitySegmentsProps = {
  segments: TEffort[];
};

const ActivitySegments = (props: ActivitySegmentsProps) => {
  const { segments } = props;
  return (
    <div className="segments">
      <h2 className="text-lg">Segments</h2>
      {segments.map((segment) => (
        <CollapsibleSection
          key={segment.id}
          title={segment.name}
          className="bg-background-100 my-4 rounded-sm"
        >
          <FlexContainer className="flex-wrap">
            <FlexItem className="w-full md:w-1/2 my-2">
              <span className="block text-background-50 text-sm">Time</span>
              <span className="block">
                {runUtilsService.convertMillisecondsToTime(segment.moving_time)}
              </span>
            </FlexItem>
            {segment.segment ? (
              <>
                <FlexItem className="w-full md:w-1/2 my-2">
                  <span className="block text-background-50 text-sm">
                    Distance
                  </span>
                  <span className="block">
                    {runUtilsService.convertMetersToMiles(
                      segment.segment.distance
                    )}
                    miles
                  </span>
                </FlexItem>
                <FlexItem className="w-full md:w-1/2 my-2">
                  <span className="block text-background-50 text-sm">
                    Elevation High
                  </span>
                  <span className="block">
                    {segment.segment.elevation_high}m
                  </span>
                </FlexItem>
                <FlexItem className="w-full md:w-1/2 my-2">
                  <span className="block text-background-50 text-sm">
                    Elevation Low
                  </span>
                  <span className="block">
                    {segment.segment.elevation_low}m
                  </span>
                </FlexItem>
                {segment.segment.start_latlng && (
                  <FlexItem className="w-full">
                    <span className="block text-background-50 text-sm">
                      Map
                    </span>
                    <RunMap
                      width={200}
                      height={150}
                      points={[
                        segment.segment.start_latlng,
                        segment.segment.end_latlng,
                      ]}
                    ></RunMap>
                  </FlexItem>
                )}
              </>
            ) : (
              <></>
            )}
          </FlexContainer>
        </CollapsibleSection>
      ))}
    </div>
  );
};

export default ActivitySegments;
