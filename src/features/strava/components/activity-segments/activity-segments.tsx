import CollapsibleSection from '@/components/common/collapsible-section/collapsible-section';
import { TEffort } from '../../responses/GetActivityResponse';
import runUtilsService from '../../services/run-utils.service';

type ActivitySegmentsProps = {
  segments: TEffort[];
};

const ActivitySegments = (props: ActivitySegmentsProps) => {
  const { segments } = props;
  return (
    <div className="segments">
      <h2>Segments</h2>
      {segments.map((segment) => (
        <CollapsibleSection
          key={segment.id}
          title={segment.name}
          className="px-0"
        >
          <div>
            <div>
              {runUtilsService.convertMillisecondsToTime(segment.moving_time)}
            </div>
            <div>
              {runUtilsService.convertMetersToMiles(segment.distance)}miles
            </div>
            <pre>{JSON.stringify(segment, null, 4)}</pre>
          </div>
        </CollapsibleSection>
      ))}
    </div>
  );
};

export default ActivitySegments;
