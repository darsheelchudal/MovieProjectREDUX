import react, { useEffect } from "react";
import "./MovieDetail.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncMovieOrShowDetail } from "../../features/movies/movieSlice";
import { getSelectedMovieOrShow } from "../../features/movies/movieSlice";

const MovieDetail = () => {
  const { imdbID } = useParams();
  const dispatch = useDispatch();
  const data = useSelector(getSelectedMovieOrShow);
  console.log(data);
  useEffect(() => {
    dispatch(fetchAsyncMovieOrShowDetail(imdbID));
  }, [dispatch, imdbID]);
  return (
    <>
      <div>Movie Detail</div>
    </>
  );
};

export default MovieDetail;
