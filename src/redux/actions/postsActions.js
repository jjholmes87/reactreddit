import { fetchPosts as fetchPostsFromAPI, fetchComments as fetchCommentsFromAPI } from '../../api';

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';

export const fetchPostsRequest = () => ({ type: FETCH_POSTS_REQUEST });
export const fetchPostsSuccess = (posts) => ({ type: FETCH_POSTS_SUCCESS, payload: posts });
export const fetchPostsFailure = (error) => ({ type: FETCH_POSTS_FAILURE, payload: error });
export const fetchCommentsSuccess = (postId, comments) => ({ type: FETCH_COMMENTS_SUCCESS, payload: { postId, comments } });

export const fetchPosts = () => async (dispatch) => {
  dispatch(fetchPostsRequest());
  try {
    const posts = await fetchPostsFromAPI();
    dispatch(fetchPostsSuccess(posts));
  } catch (error) {
    dispatch(fetchPostsFailure(error.message));
  }
};

export const fetchComments = (postId) => async (dispatch) => {
  try {
    const comments = await fetchCommentsFromAPI(postId);
    dispatch(fetchCommentsSuccess(postId, comments));
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};
