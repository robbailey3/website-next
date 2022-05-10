import clsx from 'clsx';

export interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = (props: PaginationProps) => {
  const { totalItems, itemsPerPage, currentPage, onPageChange } = props;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pages = [...Array.from({ length: totalPages }, (v, i) => i + 1)];

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="my-8">
      <ul className="flex justify-center space-x-4">
        {totalPages > 1 && (
          <>
            <li>
              <button
                className="py-1 px-2 rounded bg-gray-50"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            <li>
              <button
                className={clsx(
                  'py-1 px-2 rounded bg-gray-50',
                  currentPage === 1 && 'bg-blue-600 text-white'
                )}
                onClick={() => onPageChange(1)}
                disabled={currentPage === totalPages}
              >
                1
              </button>
            </li>
          </>
        )}

        {currentPage > 2 && <li>...</li>}
        {currentPage > 2 && currentPage === totalPages && totalPages > 3 && (
          <li>
            <button
              className="py-1 px-2 rounded bg-gray-50"
              onClick={() => onPageChange(currentPage - 2)}
            >
              {currentPage - 2}
            </button>
          </li>
        )}
        {currentPage > 2 && (
          <li>
            <button
              className="py-1 px-2 rounded bg-gray-50"
              onClick={() => onPageChange(currentPage - 1)}
            >
              {currentPage - 1}
            </button>
          </li>
        )}
        {currentPage !== 1 && currentPage !== totalPages && (
          <li>
            <button
              className={clsx(
                'py-1 px-2 rounded bg-gray-50',
                currentPage === currentPage && 'bg-blue-600 text-white'
              )}
              onClick={() => onPageChange(currentPage)}
            >
              {currentPage}
            </button>
          </li>
        )}
        {currentPage < totalPages - 1 && (
          <li>
            <button
              className="py-1 px-2 rounded bg-gray-50"
              onClick={() => onPageChange(currentPage + 1)}
            >
              {currentPage + 1}
            </button>
          </li>
        )}
        {currentPage < totalPages - 1 && totalPages > 3 && (
          <li>
            <button
              className="py-1 px-2 rounded bg-gray-50"
              onClick={() => onPageChange(currentPage + 2)}
            >
              {currentPage + 2}
            </button>
          </li>
        )}
        {currentPage < totalPages - 1 && <li>...</li>}
        <li>
          <button
            className={clsx(
              'py-1 px-2 rounded bg-gray-50',
              currentPage === totalPages && 'bg-blue-600 text-white'
            )}
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            {totalPages}
          </button>
        </li>
        {currentPage < totalPages && (
          <li>
            <button
              className="py-1 px-2 rounded bg-gray-50"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
