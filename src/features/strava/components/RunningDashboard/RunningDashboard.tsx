import useTotals from '../../hooks/useTotals';
import { TotalsData } from '../../models/TotalsData';
import DistanceTotalChart from '../DistanceTotalChart/DistanceTotalChart';
import TotalElevationGainChart from '../TotalElevationGainChart/TotalElevationGainChart';

const RunningDashboard = () => {
  const { totals, isLoading, error } = useTotals();

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error :(</p>;

  const getDistanceChartData = () => {
    return totals.map((total: TotalsData) => ({
      date: `${total._id.year}-${total._id.month}`,
      totalDistance: parseInt((total.totalDistance / 1000).toFixed(1), 10),
    }));
  };

  const getElevationChartData = () => {
    return totals.map((total: TotalsData) => ({
      date: `${total._id.year}-${total._id.month}`,
      totalElevation: parseInt(total.totalElevationGain.toFixed(1), 10),
    }));
  };

  return (
    <>
      <div className="flex">
        <div className="w-full lg:w-1/3">
          <DistanceTotalChart chartData={getDistanceChartData()} />
          <TotalElevationGainChart chartData={getElevationChartData()} />
        </div>
      </div>
    </>
  );
};

export default RunningDashboard;
