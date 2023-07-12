import PropTypes from 'prop-types';
import styles from '../styles/home.module.css';
import Comment from '../components/Comments';
import { useEffect, useState } from 'react';
import { getPost } from '../api';
import Loader from '../components/Loader';

//write props in {} alternate way or just props
const Home = () => {
  const [posts, setPost] = useState([]);
  const [loading, setLoader] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await getPost();
      if (response.success) {
        setPost(response.data.posts);
      }

      setLoader(false);

      console.log(response);
    };

    fetchPost();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.postList}>
      {posts.map((post) => {
        return (
          <div className={styles.postContainer}>
            <div className={styles.postWrapper} key={post._id}>
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
                      {/* <img
                        src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
                        alt="likes-icon"
                      /> */}
                      <svg
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                      </svg>
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
                  <textarea placeholder="Start typing a comment.."></textarea>
                </div>

                <div className={styles.postCommentsList}>
                  {post.comments.map((comment) => (
                    <Comment
                      comment={comment}
                      key={`post-comment-${comment._id}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

//to check props should get only array
//add validation

Home.propType = {
  posts: PropTypes.array.isRequired, //.isrequired to make it required
};

export default Home;
