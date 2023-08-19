import styles from '../styles/Login.module.css';
import { Link } from 'react-router-dom';
import { useNavigate, Navigate } from 'react-router-dom'; //navigate to page by chaching url
import { useState } from 'react';
import { toast } from 'react-toastify';

import { useAuth } from '../hooks';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signingUp, setSigningUp] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();
  console.log(auth);
  console.log(navigate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSigningUp(true);

    let error = false;
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill all fields', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      error = true;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords not matched', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      error = true;
    }

    if (error) {
      return setSigningUp(false);
    }

    const response = await auth.signup(name, email, password, confirmPassword);

    if (response.success) {
      setSigningUp(false);

      toast.success('User registered  succesfully, please login now', {
        autoClose: 5000,
        theme: 'dark',
      });

      navigate('/login');
    } else {
      toast.error(response.message, {
        autoClose: 5000,
        theme: 'dark',
      });
    }

    setSigningUp(false);
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
    return <Navigate to="/" />;
  }

  return (
    <section>
      <div className={styles.formBox}>
        <div className={styles.formValue}>
          <form action="" onSubmit={handleSubmit}>
            <h2>Sign up</h2>
            <div className={styles.inputBox}>
              <input
                type="text"
                id="name"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <label htmlFor="name">Name</label>
            </div>
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
                id="confirmPassword"
                required
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <label htmlFor="confirmPassword"> Confirm Password</label>
            </div>
            <div className={styles.forget}>
              <label htmlFor="">
                <input type="checkbox" />
                Remember Me <Link to="">Forget Password</Link>
              </label>
            </div>
            <div>
              <button id={styles.submitBtn} disabled={signingUp}>
                {signingUp ? 'Signing up...' : 'Signup'}
              </button>
            </div>

            {/* the Social signUp is not available on server */}

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
                <span className={styles.dummytxt}>Have an account?</span>{' '}
                <Link to="/login"> Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
