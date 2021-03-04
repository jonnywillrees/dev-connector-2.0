/* eslint-disable */
import React, { useState, useEffect } from "react";
import "../scss/pagination.scss";

const Pagination = ({ total, pageSize, onChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage] = useState(Math.floor(total / pageSize));
  const [pageLocations, setPageLocations] = useState({
    locOne: 1,
    locTwo: 2,
    locThree: 3
  });

  useEffect(() => {
    onChange(currentPage);
    pageFinder();
  }, [currentPage]);

  useEffect(() => {}, []);

  const pageFinder = () => {
    let locOne = pageLocations.locOne;
    let locTwo = pageLocations.locTwo;
    let locThree = pageLocations.locThree;

    if (currentPage <= locThree) {
      locOne = 1;
      locTwo = 2;
      locThree = 3;
    }

    if (currentPage > locThree) {
      locOne++;
      locTwo++;
      locThree++;
    }

    setPageLocations({
      locOne,
      locTwo,
      locThree
    });
  };

  const goToPage = (page) => {
    setPageLocations({
      locOne: page,
      locTwo: page + 1,
      locThree: page + 2
    });

    setCurrentPage(page);
  };

  const page = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }

    if (direction === "next" && currentPage < lastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <React.Fragment>
      <div className="flex-center">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li onClick={() => page("prev")} className="page-item">
              <a className="page-link" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item">
              <a
                onClick={() => goToPage(pageLocations.locOne)}
                className={`page-link ${
                  pageLocations.locOne === currentPage && "active"
                }`}
              >
                {pageLocations.locOne}
              </a>
            </li>
            <li className="page-item">
              <a
                onClick={() => goToPage(pageLocations.locTwo)}
                className={`page-link ${
                  pageLocations.locTwo === currentPage && "active"
                }`}
              >
                {pageLocations.locTwo}
              </a>
            </li>
            <li className="page-item">
              <a
                onClick={() => goToPage(pageLocations.locThree)}
                className={`page-link ${
                  pageLocations.locThree === currentPage && "active"
                }`}
              >
                {pageLocations.locThree}
              </a>
            </li>
            <li onClick={() => page("next")} className="page-item">
              <a className="page-link" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default Pagination;
