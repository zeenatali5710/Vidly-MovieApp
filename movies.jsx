import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./like";
import Pagination from "./Common/pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1,
  };
  handleDeleteMovie = (id) => {
    console.log(id);
    const movies = this.state.movies.filter((m) => m._id !== id);
    this.setState({ movies });
  };

  handleLikeClicked = (movie) => {
    console.log("like clicked", movie);
    const movies = [...this.state.movies]; // cloning array of movies object in this state
    const index = movies.indexOf(movie); // assigning 'index of movie object (each) in the cloned object movies' to constant index
    movie[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    console.log(page);
    this.setState({ currentPage: page });
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies } = this.state;

    const movies = paginate(allMovies, currentPage, pageSize);
    if (count === 0) return <p>There are no movies in database.</p>;
    return (
      <React.Fragment>
        <label className="label"> Showing {count} movies in the database</label>
        <table className="table">
          <thead>
            <tr>
              <td>
                <b>Title</b>
              </td>
              <td>
                <b>Genre</b>
              </td>
              <td>
                <b>Stock</b>
              </td>
              <td>
                <b>Rate</b>
              </td>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td> {movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie.liked}
                    likeClicked={() => this.handleLikeClicked(movie)}
                  ></Like>
                </td>
                <td>
                  <button
                    onClick={() => this.handleDeleteMovie(movie._id)}
                    className="button"
                  >
                    {" "}
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        ></Pagination>
      </React.Fragment>
    );
  }
}

export default Movies;
