/* eslint-disable */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import "../scss/users.scss";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const config = {
    headers: { "app-id": "603f5d24906de45e5c57d9bb" }
  };

  const fetchUsers = async (userId) => {
    setUser(null);

    let res;

    if (userId) {
      res = await axios.get(
        `https://dummyapi.io/data/api/user/${userId}?page=${page}&limit=10`,
        config
      );
      setUser(res?.data);
    } else {
      setLoading(true);
      res = await axios.get(
        `https://dummyapi.io/data/api/user?page=${page}&limit=10`,
        config
      );
      setUser(null);
      setUsers(res?.data?.data);
      setTotal(res?.data?.total);
    }
    setLoading(false);
  };

  console.log(user);

  return (
    <div className="container-fluid page-padding">
      <Pagination
        total={total}
        pageSize={10}
        onChange={(page) => setPage(page)}
      />
      {/* Modal */}
      {/* Feed post data below in modal */}
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          {user && (
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {user?.firstName}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="card">
                  <img src={user?.picture} alt="User" />
                  <h1>
                    {`${user?.title}. ${user?.lastName} (${user?.firstName})`}
                  </h1>
                  <p>CEO & Founder, Example</p>
                  <p>Harvard University</p>
                  <p>
                    <button className="btn btn-secondary">Contact</button>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cards in map function */}
      {loading ? (
        <div>Loading</div>
      ) : (
        <div>
          {users?.length > 0 ? (
            <div className="container">
              <div className="row align-items">
                {users.map((user, index) => (
                  <div
                    className="col-sm-12 col-lg-6"
                    onClick={() => fetchUsers(user.id)}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    key={index}
                  >
                    <div className="container mt-5 d-flex justify-content-center">
                      <div className="user-card card p-3">
                        <div className="d-flex align-items-center">
                          <div className="image">
                            <img
                              src={user.picture}
                              className="rounded"
                              width="155"
                            />
                          </div>
                          <div className="p-4 ml-3 flex-shrink">
                            <h4 className="mb-0 mt-0">
                              {user.firstName} {user.lastName}
                            </h4>
                            <div className="user-email p-2 mt-2 d-flex justify-content-between rounded text-white stats">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>No Data</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Users;
