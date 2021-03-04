/* eslint-disable */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";
const Posts = () => {
  const [post, setPost] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const config = {
    headers: { "app-id": "603f9e2f1318cc6dc2b26c2e" }
  };

  const fetchPosts = async (postId) => {
    setPost(null);

    let res;

    if (postId) {
      res = await axios.get(
        `https://dummyapi.io/data/api/post/${postId}?page=${page}&limit=10`,
        config
      );
      setPost(res?.data);
    } else {
      setLoading(true);
      res = await axios.get(
        `https://dummyapi.io/data/api/post?page=${page}&limit=10`,
        config
      );
      setPost(null);
      setPosts(res?.data?.data);
      setTotal(res?.data?.total);
    }
    setLoading(false);
  };

  console.log(posts);

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
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {post?.text}
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
                <img src={post?.image} alt="User" />
                <h4 style={{ textTransform: "uppercase" }}>
                  {`Post by: ${post?.owner?.title}. ${post?.owner?.lastName}`}
                </h4>
                <p>CEO & Founder, Example</p>
                <p>Harvard University</p>
                <p>
                  <button className="btn btn-secondary">Contact</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cards in map function */}
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="container">
          {posts?.length > 0 ? (
            <div className="row g-3">
              {posts.map((post, index) => (
                // <Card post={post} index={index} />
                <div key={index} className="col-xs-12 col-md-6 card-container">
                  <div
                    className="card posts-card"
                    onClick={() => fetchPosts(post.id)}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <img className="card__image" src={post.image} alt="" />
                    <div className="card__text">
                      <h2>{post.text}</h2>
                      <p>
                        Lorem ipsum dolor sit amet consectetur, Ducimus,
                        repudiandae temporibus omnis illum maxime quod deserunt
                        eligendi dolor
                      </p>
                    </div>
                    <div className="card__stats">
                      <div className="stat">
                        <div className="value">{post.likes}</div>
                        <div className="type">likes</div>
                      </div>
                      <div className="stat border">
                        <div className="value">5123</div>
                        <div className="type">views</div>
                      </div>
                      <div className="stat">
                        <div className="value">32</div>
                        <div className="type">comments</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>No Data</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Posts;
