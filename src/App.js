/* eslint-disable */

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Posts from "./components/Posts";
import Users from "./components/Users";
import "./scss/custom.scss";

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <React.Fragment>
      <Navbar onClick={(current) => setCurrentPage(current)} />
      {currentPage === 1 ? <Home /> : null}
      {currentPage === 2 ? <Posts /> : null}
      {currentPage === 3 ? <Users /> : null}
    </React.Fragment>
  );
}

export default App;
