import Table from '@/components/common/Table/Table';
import TableBody from '@/components/common/Table/TableBody/TableBody';
import TableCell from '@/components/common/Table/TableCell/TableCell';
import TableHead from '@/components/common/Table/TableHead/TableHead';
import TableHeader from '@/components/common/Table/TableHeader/TableHeader';
import TableRow from '@/components/common/Table/TableRow/TableRow';
import { TEffort } from '../../responses/GetActivityResponse';
import { RunUtils } from '../../services/run-utils.service';

export interface RunSegmentsProps {
  segments: TEffort[];
}

const RunSegments = (props: RunSegmentsProps) => {
  const { segments } = props;

  if (!segments || segments.length === 0) {
    return null;
  }

  return (
    <section className="my-4">
      <h2 className="text-3xl my-2">Segments</h2>
      <Table>
        <TableHead>
          <TableHeader>Name</TableHeader>
          <TableHeader>Distance</TableHeader>
          <TableHeader>Time</TableHeader>
        </TableHead>
        <TableBody>
          {segments.map((segment, index) => (
            <TableRow key={index}>
              <TableCell>{segment.name}</TableCell>
              <TableCell>{(segment.distance / 1000).toFixed(2)}</TableCell>
              <TableCell>
                {RunUtils.convertSecondsToHoursMinutesSeconds(
                  segment.moving_time
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default RunSegments;
