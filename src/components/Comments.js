import Proptypes from 'prop-types';

import styles from '../styles/home.module.css';

const Comment = ({ comment }) => {
    return (
        <div className={styles.postCommentsItem}>
            <div className={styles.postCommentHeader}>
                <span className={styles.postCommentAuther}>{comment.user.name}</span>
                <span className={styles.postCommentTime}> a minute ago</span>
                <span className={styles.postCommentLikes}>22</span>
            </div>
            <div className={styles.postCommentContent}>{comment.content}</div>
        </div>
    );
};


Comment.propType = {
    comment : Proptypes.object.isRequired,
};

export default Comment;
