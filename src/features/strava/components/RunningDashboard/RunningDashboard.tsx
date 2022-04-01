import { useRouter } from 'next/router';
import useRuns from '../../hooks/useRuns';
import useRunStats from '../../hooks/useRunStats';
import useStats from '../../hooks/useRunStats';
import { RunStats } from '../../models/StatsData';
import { TotalsData } from '../../models/TotalsData';
import DistanceTotalChart from '../DistanceTotalChart/DistanceTotalChart';
import RunCountChart from '../RunCountChart/RunCountChart';
import RunStatsChart from '../RunStatsChart/RunStatsChart';
import TotalElevationGainChart from '../TotalElevationGainChart/TotalElevationGainChart';

const RunningDashboard = () => {
  const router = useRouter();

  const { limit, skip } = router.query;

  const { data, isLoading, error } = useRunStats();

  const runData = useRuns(
    parseInt(limit as string, 10) || 25,
    parseInt(skip as string, 10) || 0
  );

  console.log(runData);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error :(</p>;

  const getDistanceChartData = () => {
    return data.totals.map((total: TotalsData) => ({
      date: `${total._id.year}-${total._id.month}`,
      totalDistance: parseInt((total.totalDistance / 1000).toFixed(1), 10),
    }));
  };

  const getElevationChartData = () => {
    return data.totals.map((total: TotalsData) => ({
      date: `${total._id.year}-${total._id.month}`,
      totalElevationGain: parseInt(total.totalElevationGain.toFixed(1), 10),
    }));
  };

  const getCountChartData = () => {
    return data.totals.map((total: TotalsData) => ({
      date: `${total._id.year}-${total._id.month}`,
      count: Number(total.count),
    }));
  };

  const getStatsChartData = () => {
    return data.stats.map((stat: RunStats) => ({
      date: new Date(stat.start_date),
      averageSpeed: parseFloat((stat.average_speed * 3.6).toFixed(3)),
      distance: parseFloat((stat.distance / 1000).toFixed(1)),
      maxSpeed: parseFloat((stat.max_speed * 3.6).toFixed(3)),
    }));
  };

  return (
    <>
      <div className="my-4">
        <h1 className="text-6xl font-bold text-center">Running Tracker</h1>
        <section>
          <div className="flex">
            <div className="w-full p-4 text-center">
              <h2 className="text-lg font-bold text-gray-700">
                Distance &amp; Average Speed / Run
              </h2>
              <RunStatsChart chartData={getStatsChartData()} />
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/3 p-4 text-center">
              <h2 className="text-lg font-bold text-gray-700">
                Distance / Month
              </h2>
              <DistanceTotalChart chartData={getDistanceChartData()} />
            </div>
            <div className="w-full lg:w-1/3 p-4 text-center">
              <h2 className="text-lg font-bold text-gray-700">
                Elevation Gain / Month
              </h2>
              <TotalElevationGainChart chartData={getElevationChartData()} />
            </div>
            <div className="w-full lg:w-1/3 p-4 text-center">
              <h2 className="text-lg font-bold text-gray-700">
                Number of Runs / Month
              </h2>
              <RunCountChart chartData={getCountChartData()} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default RunningDashboard;
