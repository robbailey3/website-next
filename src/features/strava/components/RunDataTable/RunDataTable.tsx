import Pagination from '@/components/common/Pagination/Pagination';
import { DateTime } from '@/utils/dateTime';
import React from 'react';
import useRuns from '../../hooks/useRuns';

const RunDataTable = () => {
  const [page, setPage] = React.useState(1);

  const perPage = 25;

  const { runs, isLoading, error } = useRuns(perPage, (page - 1) * perPage);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <table className="w-full rounded shadow overflow-hidden">
        <thead className="bg-blue-200">
          <tr>
            <th className="text-left p-2">Date</th>
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Distance</th>
          </tr>
        </thead>
        <tbody>
          {runs.activities.map((run: any) => (
            <tr key={run.id}>
              <td className="p-2 border-b border-gray-200">
                {DateTime.format(new Date(run.start_date), 'en-GB')}
              </td>
              <td className="p-2 border-b border-gray-200">{run.name}</td>
              <td className="p-2 border-b border-gray-200">
                {(run.distance / 1000).toPrecision(3)}km
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={perPage}
        currentPage={page}
        onPageChange={handlePageChange}
        totalItems={runs.count}
      />
    </>
  );
};

export default RunDataTable;
