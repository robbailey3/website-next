import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
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
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" spacing={'20px'} />
          <PolarRadiusAxis
            angle={90}
            domain={[0, Math.max(...data.map((d) => d.value))]}
          />
          {data.map((stat) => (
            <Radar
              key={stat.name}
              name={stat.name}
              dataKey={'value'}
              stroke="#E3350D"
              fill="#E3350D"
              fillOpacity={0.1}
            />
          ))}
        </RadarChart>
      </ResponsiveContainer>
    </>
  );
};

export default PokemonStatsChart;
