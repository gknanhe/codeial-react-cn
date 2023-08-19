import Proptypes from 'prop-types';

import styles from '../styles/home.module.css';

//lib for date formating
import { formatDistanceToNow, parseISO } from 'date-fns';

const Comments = ({ comment }) => {
  //parse date
  const createdAtDate = parseISO(comment.createdAt);
  //formate date
  const formattedDate = formatDistanceToNow(createdAtDate, { addSuffix: true });

  return (
    <div className={styles.postCommentsItem}>
      <div className={styles.postCommentHeader}>
        <span className={styles.postCommentAuther}>{comment.user.name}</span>
        <span className={styles.postCommentTime}> {formattedDate}</span>
        {/* <span className={styles.postCommentLikes}>22</span> */}
      </div>
      <div className={styles.postCommentContent}>{comment.content}</div>
    </div>
  );
};

Comments.propType = {
  comment: Proptypes.object.isRequired,
};

export default Comments;
