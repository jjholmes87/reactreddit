import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, fetchComments } from '../redux/actions/postsActions';
import './PostList.css';

const PostList = () => {
  const dispatch = useDispatch();
  const { posts = [], loading, error, comments } = useSelector((state) => state.posts || {});
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handlePostClick = (postId) => {
    if (!comments[postId]) { // Fetch comments only if they are not already fetched
      dispatch(fetchComments(postId));
    }
    setSelectedPostId(selectedPostId === postId ? null : postId);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="post-list-container">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="post-item">
            <h3 onClick={() => handlePostClick(post.id)}>{post.title}</h3>
            {post.thumbnail && post.thumbnail !== 'self' && post.thumbnail !== 'default' && (
              <img src={post.thumbnail} alt={post.title} />
            )}
            <p>{post.selftext}</p>
            <div className="post-karma">Karma: {post.ups}</div>
            {selectedPostId === post.id && (
              <div className="post-comments">
                <h4>Comments:</h4>
                {comments[post.id] ? (
                  comments[post.id].map((comment, index) => (
                    <div key={index} className="comment-item">{comment}</div>
                  ))
                ) : (
                  <div>Loading comments...</div>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <div>No posts available</div>
      )}
    </div>
  );
};

export default PostList;
