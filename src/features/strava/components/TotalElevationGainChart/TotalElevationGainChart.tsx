import Card from '@/components/common/Card/Card';
import {
  LineChart,
  Line,
  XAxis,
  Label,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export interface TotalElevationChartData {
  date: string;
  totalElevationGain: number;
}

export interface TotalElevationGainChartProps {
  chartData: TotalElevationChartData[];
}

const TotalElevationGainChart = (props: TotalElevationGainChartProps) => {
  const { chartData } = props;

  return (
    <Card className="">
      <ResponsiveContainer width={'100%'} height={500}>
        <LineChart
          data={chartData}
          margin={{ top: 32, bottom: 32, left: 32, right: 32 }}
        >
          <Line
            type="monotone"
            dataKey="totalElevationGain"
            stroke="#1d4ed8"
            dot={{ stroke: '#1d4ed8', strokeWidth: 2 }}
          />
          <XAxis
            dataKey="date"
            name="Total Elevation Gain"
            reversed
            tickCount={5}
            tick={{ fontSize: '.75rem', fill: '#111827' }}
          >
            <Label value="Date" offset={0} position="bottom" />
          </XAxis>
          <YAxis
            scale={'linear'}
            tickCount={5}
            unit="m"
            domain={[0, 'dataMax+20']}
            tick={{ fontSize: '.75rem', fill: '#111827' }}
            label={{
              value: 'Elevation Gain (m)',
              angle: -90,
              position: 'left',
            }}
          />
          <Tooltip
            formatter={(value: any) => `${value}m`}
            labelClassName="text-xs text-gray-700"
            wrapperClassName="shadow-md rounded bg-blue-200"
            contentStyle={{ color: '#111827' }}
            itemStyle={{ color: '#111827', fontSize: '0.875rem' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default TotalElevationGainChart;
