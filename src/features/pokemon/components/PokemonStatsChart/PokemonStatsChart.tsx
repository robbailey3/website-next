import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Stat } from '../../models/pokemon';

export interface PokemonStatsChartProps {
  stats: Stat[];
}

const PokemonStatsChart = (props: PokemonStatsChartProps) => {
  const { stats } = props;

  const data = stats.map((stat) => {
    return {
      name: stat.stat.name,
      value: stat.base_stat,
    };
  });

  return (
    <>
      <h2>Stats</h2>
      <ResponsiveContainer width={'100%'} height={500}>
        <RadarChart
          data={data}
          margin={{ top: 0, bottom: 80, left: 80, right: 80 }}
        >
          <PolarGrid />
          <PolarAngleAxis
            dataKey="name"
            spacing={'20px'}
            tick={{
              style: {
                fontSize: '.875rem',
                fill: '#3f3f3f',
              },
            }}
          />
          <PolarRadiusAxis
            angle={65}
            domain={[0, Math.max(...data.map((d) => d.value))]}
            tick={{ style: { fontSize: '.875rem', fill: '#3f3f3f' } }}
          />
          <Radar
            dataKey={'value'}
            stroke="#E3350D"
            fill="#E3350D"
            fillOpacity={0.5}
          />
        </RadarChart>
      </ResponsiveContainer>
    </>
  );
};

export default PokemonStatsChart;
