export interface TableBodyProps {
  children: JSX.Element[];
}

const TableBody = (props: TableBodyProps) => {
  const { children } = props;

  return <tbody>{children}</tbody>;
};

export default TableBody;
