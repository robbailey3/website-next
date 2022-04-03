export interface TableHeaderProps {
  children: JSX.Element | string;
}

const TableHeader = (props: TableHeaderProps) => {
  const { children } = props;

  return <th className="p-2 text-left">{children}</th>;
};

export default TableHeader;
