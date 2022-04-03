import * as objectHash from 'object-hash';

export interface TableColumn {
  title: string;
  key: string;
}

export interface TableProps {
  children: JSX.Element[];
}

const Table = (props: TableProps) => {
  const { children } = props;

  return (
    <table className="rounded shadow overflow-hidden w-full">{children}</table>
  );
};

export default Table;
