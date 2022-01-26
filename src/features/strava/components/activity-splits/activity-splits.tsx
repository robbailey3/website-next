import CollapsibleSection from '@/components/common/collapsible-section/collapsible-section';
import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import FlexItem from '@/components/common/layout/flex-item/flex-item';
import React from 'react';
import { Splits } from '../../responses/GetActivityResponse';
import runUtilsService from '../../services/run-utils.service';

type ActivitySplitsProps = {
  splits: Splits[];
};

const ActivitySplits = (props: ActivitySplitsProps) => {
  const { splits } = props;

  return (
    <div className="splits">
      <h2 className="text-lg">Splits</h2>
      {splits.map((split) => (
        <CollapsibleSection
          key={split.split}
          title={`Mile ${split.split}`}
          className="bg-background-100 my-4 rounded-sm"
        >
          <FlexContainer className="flex-wrap">
            <FlexItem className="w-full md:w-1/2 my-2">
              <span className="block text-background-400 text-sm">Time</span>
              <span className="block">
                {runUtilsService.convertMillisecondsToTime(split.moving_time)}
              </span>
            </FlexItem>
            <FlexItem className="w-full md:w-1/2 my-2">
              <span className="block text-background-400 text-sm">Pace</span>
              <span className="block">
                {runUtilsService.convertMetersPerSecondToMinutesPerMile(
                  split.average_speed
                )}
                /mile
              </span>
            </FlexItem>
            <FlexItem className="w-full md:w-1/2 my-2">
              <span className="block text-background-400 text-sm">
                Elevation Change
              </span>
              <span className="block">{split.elevation_difference}m</span>
            </FlexItem>
          </FlexContainer>
        </CollapsibleSection>
      ))}
    </div>
  );
};

export default ActivitySplits;
