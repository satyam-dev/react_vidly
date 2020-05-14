import React, { Component } from "react";
class TableHeader extends Component {
  raiseSort = (path) => {
    const { sortColumn, onSort } = this.props;
    if (path === sortColumn.path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    onSort(sortColumn);
  };
  getSortIcon = (column) => {
    const {
      sortColumn: { order, path },
    } = this.props;
    if (path !== column.path) return null;
    if (order === "asc") return <i className="fa fa-sort-asc ml-2"></i>;
    return <i className="fa fa-sort-desc ml-2"></i>;
  };
  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map((c) => (
            <th
              key={c.path || c.key}
              onClick={() => this.raiseSort(c.path)}
              className="th active-link"
            >
              {c.label} {this.getSortIcon(c)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
