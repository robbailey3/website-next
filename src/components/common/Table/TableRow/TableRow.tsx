export interface TableRowProps {
  children: JSX.Element[] | JSX.Element;
}

const TableRow = (props: TableRowProps) => {
  const { children } = props;

  return (
    <tr className="border-b border-gray-200 even:bg-gray-50">{children}</tr>
  );
};

export default TableRow;
