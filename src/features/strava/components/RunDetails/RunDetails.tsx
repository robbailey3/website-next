import Loader from '@/components/common/Loaders/Loader/Loader';
import { DateTime } from '@/utils/dateTime';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import useRun from '../../hooks/useRun';
import { RunUtils } from '../../services/run-utils.service';
import RunMap from '../RunMap/RunMap';
import RunSegments from '../RunSegments/RunSegments';
import RunSplits from '../RunSplits/RunSplits';

export interface RunDetailsProps {
  id: string;
}

const RunDetails = (props: RunDetailsProps) => {
  const { id } = props;

  const { run, isLoading, error } = useRun(id);

  if (isLoading) {
    return (
      <div className="text-center my-16">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="my-4 px-4">
        <Link href="/projects/running-tracker">
          <a className="text-blue-500 font-bold">
            <FontAwesomeIcon icon={faArrowCircleLeft} /> Back to runs
          </a>
        </Link>
      </div>
      <section className="my-4">
        <div className="flex flex-wrap">
          <div className="px-4 lg:basis-2/3 basis-full">
            <div>
              <div>
                <h1 className="text-6xl font-bold">{run.name}</h1>
                <div className="text-gray-400 italic text-xl my-4">
                  <p>{DateTime.format(new Date(run.start_date), 'en-GB')}</p>
                </div>
                {run.description && (
                  <div>
                    <p>{run.description}</p>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 lg:w-1/4 mb-4">
                  <h2 className="text-lg font-bold text-gray-700">
                    Moving time
                  </h2>
                  <p className="text-gray-700">
                    {RunUtils.convertSecondsToHoursMinutesSeconds(
                      run.moving_time
                    )}
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
                  <h2 className="text-lg font-bold text-gray-700">
                    Average Speed
                  </h2>
                  <p className="text-gray-700">
                    {RunUtils.convertMetersPerSecondToMinutesPerKm(
                      run.average_speed
                    )}
                    <span className="text-xs text-gray-400"> /km</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="basis-full lg:basis-1/3">
            <div className="inline-block mx-auto rounded shadow-lg overflow-hidden">
              <RunMap
                polyline={run.map.summary_polyline}
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>
      <RunSplits splits={run.splits_metric} />
      <RunSegments segments={run.segment_efforts} />
    </div>
  );
};

export default RunDetails;
