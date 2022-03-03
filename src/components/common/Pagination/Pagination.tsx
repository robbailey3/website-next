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

  return (
    <div className="my-8">
      <ul className="flex justify-center space-x-4">
        <li>
          <button
            className="py-1 px-2 rounded bg-gray-50"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {pages.map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={clsx('py-1 px-2 rounded-full', {
                'bg-blue-500 text-white': currentPage === page,
                'bg-gray-50': currentPage !== page,
              })}
            >
              {page}
            </button>
          </li>
        ))}
        <button
          className="py-1 px-2 rounded bg-gray-50"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </ul>
    </div>
  );
};

export default Pagination;
