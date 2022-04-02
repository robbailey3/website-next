import { DateTime } from '@/utils/dateTime';
import useRun from '../../hooks/useRun';

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
      <section>
        <h1 className="text-6xl font-bold">{run.name}</h1>
        <div className="text-gray-400 italic text-xl my-4">
          <p>{DateTime.format(new Date(run.start_date), 'en-GB')}</p>
        </div>
      </section>
      <section>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 lg:w-1/4 text-center">
            <h2 className="text-lg font-bold text-gray-700">Moving time</h2>
            <p className="text-gray-700">{getMovingTime(run.moving_time)}</p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 text-center">
            <h2 className="text-lg font-bold text-gray-700">Distance</h2>
            <p className="text-gray-700">
              {(run.distance / 1000).toFixed(2)} km
            </p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 text-center">
            <h2 className="text-lg font-bold text-gray-700">Average Speed</h2>
            <p className="text-gray-700">{run.average_speed} m/s</p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 text-center">
            <h2 className="text-lg font-bold text-gray-700">Max Speed</h2>
            <p className="text-gray-700">{run.max_speed} m/s</p>
          </div>
        </div>
      </section>
      <pre className="text-xs">{JSON.stringify(run, null, 4)}</pre>
    </div>
  );
};

export default RunDetails;
