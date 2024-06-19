import React from "react";
import { useSelector } from "react-redux";
import { getAllMovies, getAllShows } from "../../features/movies/movieSlice";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieListing.scss";

function MovieListing() {
  const movies = useSelector(getAllMovies);
  const shows = useSelector(getAllShows);

  let renderMovies,
    renderShows = "";

  if (movies.Response === "True") {
    renderMovies = movies.Search.map((movie, index) => (
      <MovieCard key={index} data={movie} />
    ));
  } else {
    renderMovies = (
      <div className="movies-error">
        <h3>{movies.Error}</h3>
      </div>
    );
  }
  if (shows.Response === "True") {
    renderShows = shows.Search.map((movie, index) => (
      <MovieCard key={index} data={movie} />
    ));
  } else {
    renderShows = (
      <div className="shows-error">
        <h3>{shows.Error}</h3>
      </div>
    );
  }

  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h2>Movies</h2>
        <div className="movie-container">{renderMovies}</div>
      </div>
      <div className="movie-list">
        <h2>Shows</h2>
        <div className="movie-container">{renderShows}</div>
      </div>
    </div>
  );
}

export default MovieListing;
