const Card = ({ post, index, fetchPosts }) => {
  return (
    <div
      className="post-card card col-xs-12 col-sm-6 col-md-4 col-lg-4"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      key={index}
    >
      <img src="..." class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <a onClick={() => fetchPosts(post.Id)} className="btn btn-primary">
          View Full Post
        </a>
      </div>
    </div>
  );
};

export default Card;
