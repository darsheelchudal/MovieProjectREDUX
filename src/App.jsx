import { useState } from "react";
import "./App.scss";
import react from "react";
//Update Imports: Replace Switch with Routes and update your route definitions accordingly.

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import Home from "./components/Home/Home";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="App">
        <Router>
          <Header />
          <div className="container">
            <Routes>
              {/* Replace component with element */}
              <Route path="/" element={<Home />}></Route>
              <Route path="/movie/:imdbID" element={<MovieDetail />}></Route>
              <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
          </div>

          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
