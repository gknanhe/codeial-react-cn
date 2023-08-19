import { Link } from 'react-router-dom';
import styles from '../styles/navbar.module.css';
import { useAuth } from '../hooks';
import { useEffect, useState } from 'react';
import { searchUsers } from '../api';

const Navbar = () => {
  const auth = useAuth(); // gives object with login ,user info

  // eslint-disable-next-line
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const response = await searchUsers(searchText);

      if (response.success) {
        setResults(response.data.users);
      }
    };

    if (searchText.length > 2) {
      fetchUsers();
    } else {
      setResults([]);
    }
    setLoading(false);
  }, [searchText]);

  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link className={styles.imgLink} to="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </Link>
      </div>

      <div className={styles.searchContainer}>
        {/* <img
          className={styles.searchIcon}
          src="https://image.flaticon.com/icons/svg/483/483356.svg"
          alt=""
        /> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.searchIcon}
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          placeholder="Search users"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {isLoading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
          </div>
        ) : (
          <></>
        )}
        {results.length > 0 && (
          <div className={styles.searchResults}>
            <ul>
              {results.map((user) => (
                <li
                  className={styles.searchResultsRow}
                  key={`user-${user._id}`}
                >
                  <Link
                    to={`/user/${user._id}`}
                    onClick={() => {
                      setSearchText('', setResults([]));
                    }}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                      alt="profile"
                    />
                    <span>{user.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <Link to="/settings">
              <img
                src="https://w0.peakpx.com/wallpaper/55/926/HD-wallpaper-thanos-crown-infinity-war-marvel-movie.jpg"
                alt=""
                className={styles.userDp}
              />

              <span style={{ marginRight: 50, fontSize: 21 }}>
                {auth.user.name}
              </span>
            </Link>
          </div>
        )}

        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <>
                <li>
                  <Link to="" onClick={auth.logout}>
                    Log Out
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Log in</Link>
                </li>
                <li>
                  <Link to="/signup">Sign up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
