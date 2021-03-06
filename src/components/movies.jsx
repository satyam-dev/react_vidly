import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { cloneDeep, findIndex } from "lodash";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };
  componentDidMount() {
    const genres = [{ name: "All Genres", _id: "all_genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };
  handleLike = (movie) => {
    const movies = cloneDeep(this.state.movies);
    const index = findIndex(movies, movie);
    movies[index] = cloneDeep(movies[index]); // doubt
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleItemSelect = (item) => {
    this.setState({ selectedGenre: item, searchQuery: "", currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };
  getPagedData = () => {
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;
    let filteredMovies = allMovies;
    if (searchQuery) {
      filteredMovies = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id !== "all_genres")
      filteredMovies = allMovies.filter(
        (m) => m.genre._id === selectedGenre._id
      );
    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      sortColumn.order
    );
    const movies = paginate(sortedMovies, currentPage, pageSize);

    return { movies, totalCount: filteredMovies.length };
  };
  render() {
    const { length: count } = this.state.movies;
    const {
      currentPage,
      pageSize,
      genres,
      selectedGenre,
      sortColumn,
    } = this.state;
    if (count === 0) {
      return <p>There are no movies in the database</p>;
    }
    const { movies, totalCount } = this.getPagedData();

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
          <Link to="/movies/new" className="btn btn-primary mb-2">
            New Movie
          </Link>
          <p>Showing {totalCount} movies in the database</p>
          <SearchBox
            placeholder="Search for movies..."
            value={this.state.searchQuery}
            onChange={this.handleSearch}
            style={{ maxWidth: "400px" }}
          />
          <MoviesTable
            sortColumn={sortColumn}
            movies={movies}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
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
