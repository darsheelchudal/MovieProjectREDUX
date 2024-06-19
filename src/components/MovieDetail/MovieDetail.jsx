import { useEffect } from "react";
import "./MovieDetail.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncMovieOrShowDetail,
  removeSelectedMovieOrShow,
  getSelectedMovieOrShow,
} from "../../features/movies/movieSlice";
import { FaStar, FaThumbsUp, FaFilm, FaCalendar } from "react-icons/fa";

const MovieDetail = () => {
  const { imdbID } = useParams();
  const dispatch = useDispatch();
  const data = useSelector(getSelectedMovieOrShow);
  console.log(data);
  useEffect(() => {
    dispatch(fetchAsyncMovieOrShowDetail(imdbID));
    return () => {
      dispatch(removeSelectedMovieOrShow());
    };
  }, [dispatch, imdbID]);
  return (
    <>
      <div className="movie-section">
        {Object.keys(data).length === 0 ? (
          <div>...Loading</div>
        ) : (
          <div>
            <div className="section-left">
              <div className="movie-title">{data.Title}</div>
              <div className="movie-rating">
                <span className="rating">
                  IMDB Rating <FaStar size={15} color="#ff9e00" />
                  {data.imdbRating}
                </span>
                <span className="imdbVotes">
                  <FaThumbsUp size={15} color="#fafafa" /> IMDB Votes{" "}
                  {data.imdbVotes}
                </span>

                <span className="runtime">
                  <FaFilm size={15} color="rgb(191,213,214)" />
                  Runtime {data.Runtime}
                </span>

                <span className="calendar">
                  <FaCalendar size={15} color="peachpuff" />
                  Year {data.Year}
                </span>
              </div>
              <div className="movie-plot">{data.Plot}</div>
              <div className="movie-info">
                <div>
                  <span>Director</span>
                  <span>{data.Director}</span>
                </div>
                <div>
                  <span>Stars</span>
                  <span>{data.Actors}</span>
                </div>

                <div>
                  <span>Genres</span>
                  <span>{data.Genre}</span>
                </div>
                <div>
                  <span>Languages</span>
                  <span>{data.Language}</span>
                </div>
                <div>
                  <span>Awards</span>
                  <span>{data.Awards}</span>
                </div>
              </div>
            </div>
            <div className="section-right">
              <img src={data.Poster} alt={data.Title}></img>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MovieDetail;
