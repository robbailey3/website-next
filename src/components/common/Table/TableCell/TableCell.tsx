export interface TableCell {
  children: JSX.Element | string | JSX.Element[] | string[];
}

const TableCell = (props: TableCell) => {
  const { children } = props;

  return <td className="p-2">{children}</td>;
};

export default TableCell;
