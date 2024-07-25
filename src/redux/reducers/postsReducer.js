import { FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE, FETCH_COMMENTS_SUCCESS } from '../actions/postsActions';

const initialState = {
  posts: [],
  loading: false,
  error: null,
  comments: {} // Store comments for each post
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return { ...state, loading: true };
    case FETCH_POSTS_SUCCESS:
      return { ...state, loading: false, posts: action.payload };
    case FETCH_POSTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.postId]: action.payload.comments
        }
      };
    default:
      return state;
  }
};

export default postsReducer;
