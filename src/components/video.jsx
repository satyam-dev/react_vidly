import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import { cloneDeep, findIndex } from "lodash";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1,
  };
  handleDelete(movie) {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  }
  handleLike(movie) {
    const movies = cloneDeep(this.state.movies);
    const index = findIndex(movies, movie);
    movies[index] = cloneDeep(movies[index]); // doubt
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  }
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  render() {
    const { length: count } = this.state.movies;
    const { currentPage, pageSize, movies: allMovies } = this.state;
    if (count === 0) {
      return <p>There are no movies in the database</p>;
    }
    const movies = paginate(allMovies, currentPage, pageSize);
    return (
      <React.Fragment>
        <p>Showing {count} movies in the database</p>
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
                  <Like liked={m.liked} onClick={() => this.handleLike(m)} />
                </td>
                <td className="td">
                  <button
                    onClick={() => this.handleDelete(m)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
export default Movies;
