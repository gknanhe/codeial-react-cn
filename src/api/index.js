import { API_URLS, getFormBody, LOCALSTORAGE_TOKEN_KEY } from '../utils';

//some things are required as we used to send in postman for API calls
const customFetch = async (url, { body, ...customConfig }) => {
  // console.log(url);
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

  //headers as we require in postman for api call
  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    //add body to config (username password etc)
    config.body = getFormBody(body); //convert in formUrlEncoded then ADD
  }

  try {
    // console.log('config', config);
    const response = await fetch(url, config);
    const data = await response.json();

    if (data.success) {
      return {
        data: data.data,
        success: true,
      };
    }

    throw new Error(data.message);
  } catch (error) {
    console.error('error');
    return {
      message: error.message,
      success: false,
    };
  }
};

export const getPost = async (page = 1, limit = 5) => {
  return await customFetch(API_URLS.posts(page, limit), {
    method: 'GET',
  });
};

export const login = async (email, password) => {
  console.log(API_URLS.login());
  return await customFetch(API_URLS.login(), {
    method: 'POST',
    body: { email, password },
  });
};

export const register = async (name, email, password, confirmPassword) => {
  return await customFetch(API_URLS.signup(), {
    method: 'POST',
    body: { name, email, password, confirm_password: confirmPassword },
  });
};

export const editProfile = async (userId, name, password, confirmPassword) => {
  return await customFetch(API_URLS.editUser(), {
    method: 'POST',
    body: {
      id: userId,
      name,
      password,
      confirm_password: confirmPassword,
    },
  });
};

export const fetchUserProfile = async (userId) => {
  return await customFetch(API_URLS.userInfo(userId), {
    method: 'GET',
  });
};

export const fetchUserFriends = async () => {
  return await customFetch(API_URLS.friends(), {
    method: 'GET',
  });
};

export const addFriend = async (userId) => {
  return await customFetch(API_URLS.createFriendship(userId), {
    method: 'POST',
  });
};

export const removeFriend = async (userId) => {
  return await customFetch(API_URLS.removeFriend(userId), {
    method: 'POST',
  });
};

export const addPost = (content) => {
  return customFetch(API_URLS.createPost(), {
    method: 'POST',
    body: {
      content,
    },
  });
};

export const createComment = async (content, postId) => {
  return customFetch(API_URLS.comment(), {
    method: 'POST',
    body: {
      post_id: postId,
      content,
    },
  });
};
