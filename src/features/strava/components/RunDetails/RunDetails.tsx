import { DateTime } from '@/utils/dateTime';
import useRun from '../../hooks/useRun';
import runUtilsService, { RunUtils } from '../../services/run-utils.service';
import RunMap from '../RunMap/RunMap';
import RunSplits from '../RunSplits/RunSplits';

export interface RunDetailsProps {
  id: string;
}

const RunDetails = (props: RunDetailsProps) => {
  const { id } = props;

  const { run, isLoading, error } = useRun(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Converts moving time in seconds to HH:MM:SS format
  const getMovingTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes}:${secondsLeft}`;
  };

  return (
    <div>
      <section className="my-4">
        <h1 className="text-6xl font-bold">{run.name}</h1>
        <div className="text-gray-400 italic text-xl my-4">
          <p>{DateTime.format(new Date(run.start_date), 'en-GB')}</p>
        </div>
      </section>
      <section>
        <div className="flex flex-wrap">
          <div>
            <RunMap
              polyline={run.map.summary_polyline}
              width={400}
              height={400}
            />
          </div>
          <div className="w-1/2 flex flex-wrap px-4 content-start flex-1">
            <div className="w-full md:w-1/2 lg:w-1/4 mb-4">
              <h2 className="text-lg font-bold text-gray-700">Moving time</h2>
              <p className="text-gray-700">
                {RunUtils.convertSecondsToHoursMinutesSeconds(run.moving_time)}
              </p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 mb-4">
              <h2 className="text-lg font-bold text-gray-700">Distance</h2>
              <p className="text-gray-700">
                {(run.distance / 1000).toFixed(2)}
                <span className="text-xs text-gray-400"> km</span>
              </p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 mb-4">
              <h2 className="text-lg font-bold text-gray-700">Average Speed</h2>
              <p className="text-gray-700">
                {RunUtils.convertMetersPerSecondToMinutesPerKm(
                  run.average_speed
                )}
                <span className="text-xs text-gray-400"> /km</span>
              </p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 mb-4">
              <h2 className="text-lg font-bold text-gray-700">Max Speed</h2>
              <p className="text-gray-700">
                {RunUtils.convertMetersPerSecondToMinutesPerKm(run.max_speed)}
                <span className="text-xs text-gray-400"> /km</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <RunSplits splits={run.splits_metric} />
      <pre className="text-xs bg-gray-100 p-4 rounded shadow whitespace-pre-wrap">
        {JSON.stringify(run, null, 4)}
      </pre>
    </div>
  );
};

export default RunDetails;
