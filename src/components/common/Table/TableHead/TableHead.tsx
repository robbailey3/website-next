export interface TableHeadProps {
  children: JSX.Element[] | JSX.Element;
}

const TableHead = (props: TableHeadProps) => {
  const { children } = props;

  return <thead className="bg-teal-900 text-white">{children}</thead>;
};

export default TableHead;
