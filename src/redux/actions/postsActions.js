import { fetchPosts as fetchPostsFromAPI } from '../../api';

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

export const fetchPosts = () => async (dispatch) => {
  dispatch({ type: FETCH_POSTS_REQUEST });

  try {
    const posts = await fetchPostsFromAPI();
    console.log('Fetched posts:', posts); // Log the fetched posts
    dispatch({ type: FETCH_POSTS_SUCCESS, payload: posts });
  } catch (error) {
    dispatch({ type: FETCH_POSTS_FAILURE, payload: error.message });
  }
};
