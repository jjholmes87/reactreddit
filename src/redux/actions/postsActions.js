export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

export const fetchPostsRequest = () => ({ type: FETCH_POSTS_REQUEST });
export const fetchPostsSuccess = (posts) => ({ type: FETCH_POSTS_SUCCESS, payload: posts });
export const fetchPostsFailure = (error) => ({ type: FETCH_POSTS_FAILURE, payload: error });

const fetchPosts = async (query) => {
  const response = await fetch(`https://www.reddit.com/search.json?q=${query}`);
  const data = await response.json();
  return data.data.children.map(child => child.data);
};

export const loadPosts = (query) => async (dispatch) => {
  dispatch(fetchPostsRequest());
  try {
    const posts = await fetchPosts(query);
    dispatch(fetchPostsSuccess(posts));
  } catch (error) {
    dispatch(fetchPostsFailure(error.message));
  }
};
