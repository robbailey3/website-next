import Card from '@/components/common/Card/Card';
import { DateTime } from '@/utils/dateTime';
import {
  LineChart,
  Line,
  XAxis,
  Label,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export interface RunStatsChartData {
  date: Date;
  distance: number;
  average_speed: number;
}

export interface RunStatsChartProps {
  chartData: RunStatsChartData[];
}

const RunStatsChart = (props: RunStatsChartProps) => {
  const { chartData } = props;

  return (
    <ResponsiveContainer width={'100%'} height={500}>
      <LineChart
        width={1600}
        height={800}
        data={chartData}
        margin={{ top: 32, bottom: 32, left: 32, right: 32 }}
      >
        <Legend
          verticalAlign="top"
          wrapperStyle={{ fontSize: '0.75rem' }}
          iconType="square"
          iconSize={8}
        />
        <Line
          type="monotone"
          dataKey="distance"
          stroke="#22d3ee"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="averageSpeed"
          stroke="#34d399"
          dot={false}
        />
        <XAxis
          dataKey="date"
          reversed
          tickCount={5}
          axisLine={{ stroke: '#ccc' }}
          tick={{ fontSize: '.75rem', fill: '#aaa' }}
          tickFormatter={(tick: Date) => DateTime.format(tick, 'en-GB')}
        >
          <Label
            value="Date"
            offset={0}
            position="bottom"
            style={{
              fontSize: '0.675rem',
              fontStyle: 'italic',
            }}
          />
        </XAxis>
        <YAxis
          scale={'linear'}
          tickCount={5}
          axisLine={{ stroke: '#ccc' }}
          tick={{ fontSize: '.75rem', fill: '#aaa' }}
        />
        <Tooltip
          labelFormatter={(tick: Date) => DateTime.format(tick, 'en-GB')}
          labelClassName="text-xs text-gray-700"
          wrapperClassName="shadow-md rounded bg-blue-200"
          contentStyle={{ color: '#111827' }}
          itemStyle={{ color: '#111827', fontSize: '0.875rem' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RunStatsChart;
