import React from "react";
import Like from "./common/like";
const MoviesTable = (props) => {
  const { movies, onDelete, onLike } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          <th className="th">Title</th>
          <th className="th">Genre</th>
          <th className="th">Stock</th>
          <th className="th">Rate</th>
          <th className="th"></th>
          <th className="th"></th>
        </tr>
      </thead>
      <tbody>
        {movies.map((m) => (
          <tr key={m._id}>
            <td className="td">{m.title}</td>
            <td className="td">{m.genre.name}</td>
            <td className="td">{m.numberInStock}</td>
            <td className="td">{m.dailyRentalRate}</td>
            <td className="td">
              <Like liked={m.liked} onClick={() => onLike(m)} />
            </td>
            <td className="td">
              <button
                onClick={() => onDelete(m)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;
