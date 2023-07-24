import { createContext } from 'react';

import { useProvidedPosts } from '../hooks';

const initialState = {
  posts: [],
  loading: true,
  addPostToState: () => {},
  addComment: () => {},
};

export const PostsContext = createContext(initialState);

export const PostsProvider = ({ children }) => {
  const posts = useProvidedPosts();

  return (
    <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
  );
};
