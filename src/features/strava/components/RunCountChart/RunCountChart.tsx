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

export interface RunCountData {
  date: string;
  count: number;
}

export interface RunCountChartProps {
  chartData: RunCountData[];
}

const RunCountChart = (props: RunCountChartProps) => {
  const { chartData } = props;

  return (
    <ResponsiveContainer width={'100%'} height={500}>
      <LineChart
        width={1600}
        height={800}
        data={chartData}
        margin={{ top: 32, bottom: 32, left: 32, right: 32 }}
      >
        <Line
          type="monotone"
          dataKey="count"
          stroke="#22d3ee"
          strokeWidth={2}
          dot={false}
        />
        <XAxis
          dataKey="date"
          name="Count"
          reversed
          tickCount={5}
          tick={{ fontSize: '.75rem', fill: '#ccc' }}
          style={{
            fontSize: '0.675rem',
            fontStyle: 'italic',
          }}
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
          tick={{ fontSize: '.75rem', fill: '#aaa' }}
          style={{
            fontSize: '0.675rem',
            fontStyle: 'italic',
          }}
        >
          <Label
            value="Count"
            offset={0}
            angle={-90}
            position="left"
            style={{
              fontSize: '0.675rem',
              fontStyle: 'italic',
            }}
          />
        </YAxis>
        <Tooltip
          labelClassName="text-xs text-gray-700"
          wrapperClassName="shadow-md rounded bg-blue-200"
          contentStyle={{ color: '#111827' }}
          itemStyle={{ color: '#111827', fontSize: '0.875rem' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RunCountChart;
