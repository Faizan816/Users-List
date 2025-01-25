import React, { useRef, useState, useEffect } from "react";
import { useFetchData } from "../hooks/useFetchData";
import { useDispatch } from "react-redux";
import LazyLoad from "react-lazyload";
import { userStyles } from "../styles/users.styles";
import { currentUser } from "../redux/userSlice";
import { useNavigate } from "react-router";
import { useSearchData } from "../hooks/useSearchData";
import { TailSpin } from "react-loader-spinner";

export default function UsersList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const [searchResults, setSearchResults] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;

  const [data, setData] = useState();

  const { fetchData, isLoading, error } = useFetchData();
  const { searchData, isSearching, searchError } = useSearchData();
  const usersToDisplay = searchResults?.users || data?.users || [];

  const handleRowClick = (id) => {
    dispatch(currentUser(id));
    navigate("/user-details");
  };

  const handleSearch = async () => {
    loadData(1);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchInputRef.current.blur();
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    loadData(pageNumber);
  };

  const loadData = async (pageNumber = currentPage) => {
    const searchValue = searchInputRef.current.value.trim();
    if (searchValue) {
      const result = await searchData(searchValue, {
        limit,
        skip: (pageNumber - 1) * limit,
      });
      setSearchResults(result);
      setTotalPages(Math.ceil(result.total / limit));
    } else {
      const result = await fetchData("users", {
        limit,
        skip: (pageNumber - 1) * limit,
      });
      setSearchResults(null);
      setData(result);
      setTotalPages(Math.ceil(result.total / limit));
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <h1 className="text-center">Users List</h1>
      <div className="col-12 mb-2">
        <div className="input-group">
          <input
            type="search"
            className="form-control"
            placeholder="Search users..."
            ref={searchInputRef}
            onBlur={handleSearch}
            onKeyPress={handleKeyPress}
          />
          <button
            className="btn btn-primary"
            onClick={handleSearch}
            disabled={isSearching}
          >
            <i
              className={`fas ${
                isSearching ? "fa-spinner fa-spin" : "fa-search"
              }`}
            ></i>
          </button>
        </div>
        {searchError && (
          <div className="text-danger mt-2">
            Error performing search. Please try again.
          </div>
        )}
      </div>

      <table className="table table-light table-striped table-hover">
        <thead>
          <tr>
            <th></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {isLoading || isSearching ? (
            <tr>
              <td colSpan="6" className="text-center">
                <div className="d-flex justify-content-center">
                  <TailSpin
                    visible={true}
                    height="50"
                    width="50"
                    color="#4fa94d"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                  />
                </div>
              </td>
            </tr>
          ) : usersToDisplay.length > 0 ? (
            usersToDisplay.map((user) => (
              <tr
                key={user.id}
                onClick={() => handleRowClick(user.id)}
                style={{ cursor: "pointer" }}
              >
                <td>
                  <LazyLoad height={30}>
                    <img
                      src={user.image}
                      alt={user.firstName}
                      style={userStyles.profileImage}
                    />
                  </LazyLoad>
                </td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.company.name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                {searchResults !== null
                  ? "No matching results found"
                  : "No users available"}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 0 && (
        <nav aria-label="Page navigation" className="pagination-container">
          <ul className="pagination justify-content-center flex-wrap">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <a
                className="page-link"
                href="#"
                onClick={() => handlePageChange(currentPage - 1)}
                tabIndex={currentPage === 1 ? -1 : undefined}
              >
                Previous
              </a>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                <a className="page-link" href="#">
                  {index + 1}
                </a>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === Math.ceil(totalPages / limit) ? "disabled" : ""
              }`}
            >
              <a
                className="page-link"
                href="#"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
