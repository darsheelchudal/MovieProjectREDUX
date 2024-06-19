import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { ApiKey } from "../../common/apis/movieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async () => {
    const movieText = "Harry";
    const response = await movieApi
      .get(`?apiKey=${ApiKey}&s=${movieText}&type=movie`)
      .catch((err) => {
        console.log("Error", err.message);
      });
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async () => {
    const seriesText = "Friends";
    const response = await movieApi
      .get(`?apiKey=${ApiKey}&s=${seriesText}&type=series`)
      .catch((err) => {
        console.log("Error", err.message);
      });
    return response.data;
  }
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetail",
  async (id) => {
    const response = await movieApi
      .get(`?apiKey=${ApiKey}&i=${id}&Plot=full`)
      .catch((err) => {
        console.log("Error", err.message);
      });

    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectMoviesOrShow: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectMoviesOrShow = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.pending, () => {
        console.log("Pending");
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
        console.log("Movies Fetched successfully");
        state.movies = payload;
      })
      .addCase(fetchAsyncMovies.rejected, () => {
        console.log("Movies fetch Rejected");
      })

      .addCase(fetchAsyncShows.fulfilled, (state, { payload }) => {
        console.log("Shows Fetched successfully");
        state.shows = payload;
      })
      .addCase(fetchAsyncShows.rejected, () => {
        console.log("Shows Fetched Rejected");
      })

      .addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, { payload }) => {
        console.log("Shows or Movies Fetched Successfully");
        state.selectMoviesOrShow = payload;
      })
      .addCase(fetchAsyncMovieOrShowDetail.rejected, () => {
        console.log("Shows or Movies Rejected");
      });
  },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) =>
  state.movies.selectMoviesOrShow;
export default movieSlice.reducer;
