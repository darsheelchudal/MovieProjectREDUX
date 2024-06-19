import React from "react";
import { useSelector } from "react-redux";
import { getAllMovies } from "../../features/movies/movieSlice";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieListing.scss";

function MovieListing() {
  const movies = useSelector(getAllMovies);

  let renderMovies = "";

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

  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h2>Movies</h2>
        <div className="movie-container">{renderMovies}</div>
      </div>
    </div>
  );
}

export default MovieListing;
