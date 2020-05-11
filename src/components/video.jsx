import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import { cloneDeep, findIndex } from "lodash";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
  };
  componentDidMount() {
    const genres = [{ name: "All Genres", _id: "all_genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }
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
  handleItemSelect = (item) => {
    this.setState({ selectedGenre: item, currentPage: 1 });
  };
  render() {
    const { length: count } = this.state.movies;
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      genres,
      selectedGenre,
    } = this.state;
    if (count === 0) {
      return <p>There are no movies in the database</p>;
    }
    const filteredMovies =
      selectedGenre && selectedGenre._id !== "all_genres"
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;
    const movies = paginate(filteredMovies, currentPage, pageSize);
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            selectedItem={selectedGenre}
            items={genres}
            onItemSelect={this.handleItemSelect}
          />
        </div>
        <div className="col">
          <p>Showing {filteredMovies.length} movies in the database</p>
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
            itemsCount={filteredMovies.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
// ListGroup.propTypes = {
//   items: PropTypes.array.isRequired,
//   onItemSelect: PropTypes.func.isRequired,
//   // selectedItem: PropTypes.object
// };
export default Movies;
