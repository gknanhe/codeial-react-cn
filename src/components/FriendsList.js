import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import styles from '../styles/home.module.css';

const FriendsList = () => {
  const auth = useAuth();
  const { friends = [] } = auth.user; //if no array found use empty array

  return (
    <div className={styles.friendsList}>
      <div className={styles.header}>Friends</div>

      {friends && friends.length === 0 && (
        <div className={styles.noFriends}> No friends found!</div>
      )}

      {friends &&
        friends.map((friend) => (
          <div key={`friend-${friend._id}`}>
            <Link
              className={styles.friendsItem}
              to={`/user/${friend.to_user._id}`}
            >
              <div className={styles.friendUser}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                  alt="img"
                />
                <div className={styles.friendName}>{friend.to_user.name}</div>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default FriendsList;
