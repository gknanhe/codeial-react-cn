// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import styles from '../styles/home.module.css';
import { Loader, Post, FriendsList, CreatePost } from '../components';
import { useAuth, usePosts } from '../hooks';

//write props in {} alternate way or just props
const Home = () => {
  const auth = useAuth();
  const posts = usePosts();

  if (posts.loading) {
    return <Loader />;
  }

  return (
    <div className={styles.home}>
      <div className={styles.mainContainer}>
        <div className={styles.postSection}>
          <div className={styles.postList}>
            {auth.user && <CreatePost />}
            {posts?.data.map((post) => {
              return <Post post={post} key={`post-${post._id}`} />;
            })}
          </div>
        </div>
      </div>
      <div className={styles.rightContainer}>
        {auth.user && <FriendsList />}
      </div>
    </div>
  );
};

//to check props should get only array
//add validation

// Home.propType = {
//   posts: PropTypes.array.isRequired, //.isrequired to make it required
// };

export default Home;
