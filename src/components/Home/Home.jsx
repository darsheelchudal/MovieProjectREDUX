import React, { useEffect } from "react";
import "./Home.scss";
import MovieListing from "../MovieListing/MovieListing";
import movieApi from "../../common/apis/movieApi";
import { ApiKey } from "../../common/apis/movieApiKey";

function Home() {
  useEffect(() => {
    const fetchMovies = async () => {
      const movieText = "Harry";
      const response = await movieApi
        .get(`?apiKey=${ApiKey}&s=${movieText}&type=movie`)
        .catch((err) => {
          console.log("Error", err.message);
        });
      console.log("The response from the API is :", response);
    };
    fetchMovies();
  }, []);
  return (
    <>
      <div>
        <div className="banner-img"></div>
        <MovieListing />
      </div>
    </>
  );
}

export default Home;
