import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import { cloneDeep, findIndex } from "lodash";
class Movies extends Component {
  state = {
    movies: getMovies(),
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
  render() {
    if (this.state.movies.length === 0) {
      return <p>There are no movies in the database</p>;
    }
    return (
      <React.Fragment>
        <p>Showing {this.state.movies.length} movies in the database</p>
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
            {}
            {this.state.movies.map((m) => (
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
      </React.Fragment>
    );
  }
}

export default Movies;
