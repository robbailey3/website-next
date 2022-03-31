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

export interface DistanceChartData {
  date: string;
  totalDistance: number;
}

export interface DistanceTotalChartProps {
  chartData: DistanceChartData[];
}

const DistanceTotalChart = (props: DistanceTotalChartProps) => {
  const { chartData } = props;

  return (
    <Card className="">
      <ResponsiveContainer width={'100%'} height={500}>
        <LineChart
          width={1600}
          height={800}
          data={chartData}
          margin={{ top: 32, bottom: 32, left: 32, right: 32 }}
        >
          <Line
            type="monotone"
            dataKey="totalDistance"
            stroke="#1d4ed8"
            dot={{ stroke: '#1d4ed8', strokeWidth: 2 }}
          />
          <XAxis
            dataKey="date"
            name="Total Distance"
            reversed
            tickCount={5}
            tick={{ fontSize: '.75rem', fill: '#111827' }}
          >
            <Label value="Date" offset={0} position="bottom" />
          </XAxis>
          <YAxis
            scale={'linear'}
            tickCount={5}
            unit="km"
            domain={[0, 'dataMax+20']}
            tick={{ fontSize: '.75rem', fill: '#111827' }}
            label={{
              value: 'Distance (KM)',
              angle: -90,
              position: 'left',
            }}
          />
          <Tooltip
            formatter={(value: any) => `${value}KM`}
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

export default DistanceTotalChart;
