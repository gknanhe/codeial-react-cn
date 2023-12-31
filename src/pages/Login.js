import styles from '../styles/Login.module.css';
import { Link } from 'react-router-dom';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom'; // to Navigate to a route
import { useAuth } from '../hooks';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const auth = useAuth();
  // console.log(auth);
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);

    if (!email || !password) {
      return toast.error('Please Enter both email and password', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }

    const response = await auth.login(email, password);

    if (response.success) {
      toast.success('Succesfully logged in', {
        autoClose: 5000,
        theme: 'dark',
      });

      // navigate('/');
    } else {
      toast.error(response.message, {
        autoClose: 5000,
        theme: 'dark',
      });
    }

    setLoggingIn(false);
  };

  const [passwordType, setPasswordType] = useState('password');

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      return;
    }
    setPasswordType('password');
  };

  if (auth.user) {
    console.log('from login', auth.user);
    return <Navigate to="/" />;
  }

  return (
    <section>
      <div className={styles.formBox}>
        <div className={styles.formValue}>
          <form action="" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className={styles.inputBox}>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className={styles.inputBox}>
              <div className={styles.passwordShow} onClick={togglePassword}>
                {passwordType === 'password' ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-lock"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-unlock"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                  </svg>
                )}
              </div>

              <input
                type={passwordType}
                id="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className={styles.forget}>
              <label htmlFor="">
                <input type="checkbox" />
                Remember Me <Link to="">Forget Password</Link>
              </label>
            </div>
            <div>
              <button id={styles.submitBtn} disabled={loggingIn}>
                {loggingIn ? 'Logging in...' : 'Login'}
              </button>
            </div>

            {/* the Social login is not available on server */}

            {/* <div className={styles.hrContainer}>
              <hr className={styles.hr} />
              <p>or</p>
              <hr className={styles.hr} />
            </div>
            <div className={styles.socialLogin}>
              <div className={styles.socialIcon}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                  alt="google"
                />
                <span className={styles.span}>Continue with Google</span>
              </div>
            </div> */}

            <div className={styles.register}>
              <p>
                <span className={styles.dummytxt}>Don't have an account? </span>
                <Link to="/signup">Sign up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
