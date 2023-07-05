import PropTypes from 'prop-types';
import styles from '../styles/home.module.css';


//write props in {} alternate way or just props
const Home = ({ posts }) => {
  // const {posts} = props.posts
  return (
    <div className={styles.postList}>
      {posts.map((post) => {
        return <div className={styles.postWrapper} key={post._id}>
          <div className={styles.postHeader}>
            <div className={styles.postAvatar}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                alt="user-pic"
              />
              <div>
                {/* <Link
                to={{
                  pathname: `/user/${post.user._id}`,
                  state: {
                    user: post.user,
                  },
                }}
                className={styles.postAuthor}
              >
                {post.user.name}
              </Link> */}
                <span className={styles.postAuther}>{post.user.name}</span>
                <span className={styles.postTime}>a minute ago</span>
              </div>
            </div>
            <div className={styles.postContent}>{post.content}</div>

            <div className={styles.postActions}>
              <div className={styles.postLike}>
                <button>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
                    alt="likes-icon"
                  />
                </button>
                <span>{post.likes.length}</span>
              </div>

              <div className={styles.postCommentsIcon}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2190/2190552.png"
                  alt="comments-icon"
                />
                <span>{post.comments.length}</span>
              </div>
            </div>
            <div className={styles.postCommentBox}>
              <input placeholder="Start typing a comment" />
            </div>

            {/* <div className={styles.postCommentsList}>
              {post.comments.map((comment) => (
                <Comment key={`post-comment-${comment._id}`} />
              ))}
            </div> */}
          </div>
        </div>;
      })}
    </div>
  );
};



//to check props should get only array 
//add validation

Home.propType = {
  posts: PropTypes.array.isRequired  //.isrequired to make it required
}

export default Home;
