import Table from '@/components/common/Table/Table';
import TableBody from '@/components/common/Table/TableBody/TableBody';
import TableCell from '@/components/common/Table/TableCell/TableCell';
import TableHead from '@/components/common/Table/TableHead/TableHead';
import TableHeader from '@/components/common/Table/TableHeader/TableHeader';
import TableRow from '@/components/common/Table/TableRow/TableRow';
import { Splits } from '../../responses/GetActivityResponse';
import { RunUtils } from '../../services/run-utils.service';

export interface RunSplitsProps {
  splits: Splits[];
}

const RunSplits = (props: RunSplitsProps) => {
  const { splits } = props;

  if (!splits || splits.length === 0) {
    return null;
  }

  return (
    <section className="my-4">
      <h2 className="text-3xl my-2">Splits</h2>
      <Table>
        <TableHead>
          <TableHeader>Km</TableHeader>
          <TableHeader>Time</TableHeader>
          <TableHeader>Pace</TableHeader>
        </TableHead>
        <TableBody>
          {splits.map((split, index) => (
            <TableRow key={index}>
              <TableCell>
                {Math.abs(split.distance - 1000) > 50
                  ? (split.distance / 1000).toFixed(2)
                  : (index + 1).toString()}
              </TableCell>
              <TableCell>
                {RunUtils.convertSecondsToHoursMinutesSeconds(
                  split.moving_time
                )}
              </TableCell>
              <TableCell>
                {RunUtils.convertMetersPerSecondToMinutesPerKm(
                  split.average_speed
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default RunSplits;
