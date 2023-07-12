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
                src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
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
