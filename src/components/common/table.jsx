import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
const Table = (props) => {
  const { sortColumn, onSort, columns, data } = props;
  return (
    <table className="table">
      <TableHeader sortColumn={sortColumn} onSort={onSort} columns={columns} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
