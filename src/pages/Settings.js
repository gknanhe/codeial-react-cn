import { useAuth } from '../hooks';
import styles from '../styles/settings.module.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
const Settings = () => {
  const auth = useAuth();
  const [name, setName] = useState(auth.user.name ? auth.user.name : '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [editMode, setEditmode] = useState(false);
  const [savingForm, setSavingForm] = useState(false);

  const clearForm = () => {
    setPassword('');
    setconfirmPassword('');
  };

  const updateProfile = async () => {
    setSavingForm(true);
    let error = false;
    if (!name || !password || !confirmPassword) {
      toast.error('Please fill all the fields', {
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
      toast.error('Passwords not matching', {
        // position: 'top-right',
        autoClose: 5000,
        theme: 'dark',
      });
      error = true;
    }
    if (error) {
      setSavingForm(false);
    } else {
      const response = await auth.updateUser(
        auth.user._id,
        name,
        password,
        confirmPassword
      );
      console.log('response of setting', response);
      if (response.success) {
        setEditmode(false);
        setSavingForm(false);
        clearForm();

        return toast.success('User Updated Succesfully', {
          position: 'top-right',
          autoClose: 5000,

          theme: 'dark',
        });
      } else {
        toast.error(response.message, {
          autoClose: 5000,
          theme: 'dark',
        });
      }
    }

    setSavingForm(false);
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
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        {editMode ? (
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        ) : (
          <div className={styles.fieldValue}>{auth.user?.name}</div>
        )}
      </div>

      {editMode && (
        <>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.fieldLabel}>Confirm Password</div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setconfirmPassword(e.target.value);
              }}
            />
          </div>
        </>
      )}

      <div className={styles.btnGrp}>
        {editMode ? (
          <>
            <button
              className={`button ${styles.editBtn}`}
              onClick={updateProfile}
              disabled={savingForm}
            >
              {savingForm ? 'Saving Profile...' : 'Save Profile'}
            </button>

            <button
              className={`button ${styles.editBtn}`}
              onClick={() => setEditmode(false)}
            >
              Go Back
            </button>
          </>
        ) : (
          <button
            className={`button ${styles.btnGrp}`}
            onClick={() => setEditmode(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Settings;
