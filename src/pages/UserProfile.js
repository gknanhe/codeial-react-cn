import styles from '../styles/settings.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addFriend, fetchUserProfile, removeFriend } from '../api';
import Loader from '../components/Loader';
import { useAuth } from '../hooks';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgess, setRequestInProgess] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  // consolelog('auth from profile', auth.user);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);

      if (response.success) {
        // console.log('profile user', response.data);
        setUser(response.data.user);
      } else {
        toast.error(response.message, {
          autoClose: 5000,
          theme: 'dark',
        });
        //if no friend in DB
        navigate('/');
      }
      setLoading(false);
    };

    getUser();
  }, [userId, navigate]);

  //A function to check whether user is a friend or not
  const checkIfUserIsAFriend = () => {
    // console.log('from user profile', auth.user);

    // creating a reference for friends array in auth.user.friends and naming it friends.

    const friends = auth.user.friends;
    // console.log('friends', friends);

    const friendIds = friends.map((friend) => friend.to_user._id);
    const index = friendIds.indexOf(userId);
    //if index is not -1, means the userId is a friend if the user, hence return true.
    if (index !== -1) {
      return true;
    }

    //if user is not a friend return false.
    return false;
  };

  if (loading) {
    return <Loader />;
  }

  const handleRemoveFriendship = async () => {
    setRequestInProgess(true);

    const response = await removeFriend(userId);

    if (response.success) {
      const friendship = auth.user.friends.filter(
        (friend) => friend.to_user._id === userId
      );

      auth.updateUserFriendship(true, friendship[0]);
      toast.success('Removed friend', {
        autoClose: 5000,
        theme: 'dark',
      });
    } else {
      toast.error(response.message, {
        autoClose: 5000,
        theme: 'dark',
      });
    }

    setRequestInProgess(false);
  };

  const handleAddFriendship = async () => {
    setRequestInProgess(true);

    const response = await addFriend(userId);

    if (response.success) {
      const { friendship } = response.data; //freind details
      // console.log('friendship', friendship);

      auth.updateUserFriendship(true, friendship);
      toast.success('Added friend', {
        autoClose: 5000,
        theme: 'dark',
      });
    } else {
      toast.error(response.message, {
        autoClose: 5000,
        theme: 'dark',
      });
    }

    setRequestInProgess(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
          alt="profile"
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserIsAFriend() ? (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleRemoveFriendship}
            disabled={requestInProgess}
          >
            {requestInProgess ? 'Removing Friend' : 'Remove Friend'}
          </button>
        ) : (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleAddFriendship}
            disabled={requestInProgess}
          >
            {' '}
            {requestInProgess ? 'Adding Friend' : 'Add Friend'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
