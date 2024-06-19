import React from "react";
import { Link } from "react-router-dom";
import user from "../../images/user.png";
import "./Header.scss";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../features/movies/movieSlice";

function Header() {
  const [term, setTerm] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (term === "") {
      return alert("Please enter search term");
    }
    console.log(term);
    dispatch(fetchAsyncMovies(term));
    dispatch(fetchAsyncShows(term));
    setTerm("");
  };

  return (
    <>
      <div className="header">
        <div className="logo">
          {" "}
          <Link to="/">MovieApp </Link>
        </div>
        <div className="search-bar">
          <form onSubmit={submitHandler}>
            <input
              type="text"
              name=""
              id=""
              value={term}
              placeholder="Search Movies Or Change"
              onChange={(e) => setTerm(e.target.value)}
            />

            <button type="submit">
              <CiSearch />
            </button>
          </form>
        </div>
        <div className="user-image">
          <img src={user} alt="user" />
        </div>
      </div>
    </>
  );
}

export default Header;
