import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createComment } from '../api';
import { usePosts } from '../hooks';
import styles from '../styles/home.module.css';
import { Comments } from './';

const Post = ({ post }) => {
  const [comment, setComment] = useState('');
  // eslint-disable-next-line
  const [creatingComment, setCreatingComment] = useState(false);
  const posts = usePosts();

  const handleAddComment = async (e) => {
    if (e.key === 'Enter') {
      setCreatingComment(true);

      const response = await createComment(comment, post._id);

      if (response.success) {
        setComment('');
        posts.addComment(response.data.comment, post._id);
        toast.success('Created Comment', {
          autoClose: 5000,
          theme: 'dark',
        });
      } else {
        toast.error(response.message, {
          autoClose: 5000,
          theme: 'dark',
        });
      }

      setCreatingComment(false);
    }
  };

  return (
    <div className={styles.postContainer} key={post._id}>
      <div className={styles.postWrapper}>
        <div className={styles.postHeader}>
          <div className={styles.postAvatar}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
              alt="user-pic"
            />
            <div>
              <Link
                to={`user/${post.user._id}`}
                state={{ user: post.user }}
                className={styles.postAuther}
              >
                {post.user.name}
              </Link>
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
                <span>{post.likes.length}</span>
              </button>
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
            <textarea
              placeholder="Start typing a comment.."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={handleAddComment}
            ></textarea>
          </div>

          <div className={styles.postCommentsList}>
            {post.comments.map((comment) => (
              <Comments comment={comment} key={`post-comment-${comment._id}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  posts: PropTypes.object.isRequired,
};

export default Post;
