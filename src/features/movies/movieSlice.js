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

const initialState = {
  movies: {},
  shows: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovies: (state, { payload }) => {
      state.movies = payload;
      //   {...state,payload} no need to do this in redux toolkit unlike traditional redux
      //Redux toolkit automatically creates the copy pf the object
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.pending, (state) => {
        console.log("Pending");
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
        console.log("Movies Fetched successfully");
        state.movies = payload;
      })
      .addCase(fetchAsyncMovies.rejected, (state, { error }) => {
        console.log("Movies fetch Rejected");
      })
      .addCase(fetchAsyncShows.pending, (state) => {
        console.log("Pending");
      })
      .addCase(fetchAsyncShows.fulfilled, (state, { payload }) => {
        console.log("Shows Fetched successfully");
        state.shows = payload;
      })
      .addCase(fetchAsyncShows.rejected, (state, { payload }) => {
        console.log("Shows Fetched Rejected");
        state.shows = payload;
      });
  },
});

export const { addMovies } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export default movieSlice.reducer;
