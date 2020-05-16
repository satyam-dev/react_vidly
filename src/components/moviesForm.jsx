import React from "react";
const MoviesForm = ({
  match: {
    params: { id },
  },
  history,
}) => {
  return (
    <div>
      <div>Movie{id}</div>
      <button
        className="btn btn-primary"
        onClick={() => history.replace("/movies")}
      >
        Save
      </button>
    </div>
  );
};

export default MoviesForm;
