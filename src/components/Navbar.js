import { Link } from 'react-router-dom';
import styles from '../styles/navbar.module.css';
import { useAuth } from '../hooks';

const Navbar = () => {
  const auth = useAuth(); // gives object with login ,user info

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

      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <Link to="/settings">
              <img
                src="https://w0.peakpx.com/wallpaper/55/926/HD-wallpaper-thanos-crown-infinity-war-marvel-movie.jpg"
                alt=""
                className={styles.userDp}
              />
            </Link>
            <span style={{ marginRight: 50, fontSize: 21 }}>
              {auth.user.name}
            </span>
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
