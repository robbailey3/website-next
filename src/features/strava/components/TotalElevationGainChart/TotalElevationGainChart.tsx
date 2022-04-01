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
    <ResponsiveContainer width={'100%'} height={500}>
      <LineChart
        data={chartData}
        margin={{ top: 32, bottom: 32, left: 32, right: 32 }}
      >
        <Line
          type="monotone"
          dataKey="totalElevationGain"
          stroke="#22d3ee"
          strokeWidth={2}
          dot={false}
        />
        <XAxis
          dataKey="date"
          name="Total Elevation Gain"
          reversed
          tickCount={5}
          axisLine={{ stroke: '#ccc' }}
          tick={{ fontSize: '.75rem', fill: '#aaa' }}
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
          unit="m"
          domain={[0, 'dataMax+20']}
          axisLine={{ stroke: '#ccc' }}
          tick={{ fontSize: '.75rem', fill: '#aaa' }}
          style={{
            fontSize: '0.675rem',
            fontStyle: 'italic',
          }}
        >
          <Label
            value="Elevation Gain (m)"
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
          formatter={(value: any) => `${value}m`}
          labelClassName="text-xs text-gray-700"
          wrapperClassName="shadow-md rounded bg-blue-200"
          contentStyle={{ color: '#111827' }}
          itemStyle={{ color: '#111827', fontSize: '0.875rem' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TotalElevationGainChart;
