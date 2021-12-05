import clsx from 'clsx';
import Button from '../button/button';
import FlexContainer from '../layout/flex-container/flex-container';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
};

const Pagination = (props: PaginationProps) => {
  const maxPageButtons = 6;

  const { currentPage, totalPages, handlePageChange } = props;

  let pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <FlexContainer className="gap-4 justify-evenly">
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant={'ghost'}
        round
      >
        Prev
      </Button>
      <>
        {pages.map((page) => (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage}
            className={clsx({
              'text-accent border border-accent': page === currentPage,
            })}
            variant={'ghost'}
            round
          >
            {page.toString()}
          </Button>
        ))}
      </>
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant={'ghost'}
        round
      >
        Next
      </Button>
    </FlexContainer>
  );
};

export default Pagination;
