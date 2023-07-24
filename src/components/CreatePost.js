import { useState } from 'react';
import { toast } from 'react-toastify';

import { addPost } from '../api';
import styles from '../styles/home.module.css';

import { usePosts } from '../hooks';

const CreatePost = () => {
  const [post, setPost] = useState('');
  const [addingPost, setAddingPost] = useState(false);

  const posts = usePosts();

  const handleAddPostClick = async () => {
    setAddingPost(true);
    let error = false;
    if (!post) {
      toast.error('Please write something in post', {
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

    if (!error) {
      const response = await addPost(post);

      if (response.success) {
        setPost('');
        posts.addPostToState(response.data.post);
        toast.success('Post Added', {
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

    setAddingPost(false);
  };

  return (
    <div className={styles.createPost}>
      <div className={styles.statusMain}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
          alt="img"
          className={styles.statusImg}
        />
        <textarea
          className={styles.addPost}
          value={post}
          placeholder="Write something..."
          onChange={(e) => setPost(e.target.value)}
        />
      </div>

      <div className={styles.statusAction}>
        <button
          className={styles.postBtn}
          onClick={handleAddPostClick}
          disabled={addingPost}
        >
          {addingPost ? 'Posting...' : 'Add post'}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
