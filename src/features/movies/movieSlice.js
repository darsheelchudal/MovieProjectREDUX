import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { ApiKey } from "../../common/apis/movieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (term) => {
    const response = await movieApi
      .get(`?apiKey=${ApiKey}&s=${term}&type=movie`)
      .catch((err) => {
        console.log("Error", err.message);
      });
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (term) => {
    const response = await movieApi
      .get(`?apiKey=${ApiKey}&s=${term}&type=series`)
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
  loading: false,
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
      .addCase(fetchAsyncMovies.pending, (state) => {
        state.loading = true;
        console.log("Pending");
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("Movies Fetched successfully");
        state.movies = payload;
      })
      .addCase(fetchAsyncMovies.rejected, (state) => {
        state.loading = false;
        console.log("Movies fetch Rejected");
      })

      .addCase(fetchAsyncShows.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAsyncShows.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("Shows Fetched successfully");
        state.shows = payload;
      })
      .addCase(fetchAsyncShows.rejected, (state) => {
        state.loading = false;
        console.log("Shows Fetched Rejected");
      })

      .addCase(fetchAsyncMovieOrShowDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("Shows or Movies Fetched Successfully");
        state.selectMoviesOrShow = payload;
      })
      .addCase(fetchAsyncMovieOrShowDetail.rejected, (state) => {
        state.loading = false;
        console.log("Shows or Movies Rejected");
      });
  },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) =>
  state.movies.selectMoviesOrShow;
export const getLoadingState = (state) => state.movies.loading;
export default movieSlice.reducer;
