import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../redux/actions/postsActions';

const PostList = () => {
  const dispatch = useDispatch();
  const { posts = [], loading, error } = useSelector((state) => state.posts || {}); // Default to empty object

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="post-item">
            <h3>{post.title}</h3>
            {post.imageUrl && <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: 'auto' }} />}
            <p>{post.content}</p>
          </div>
        ))
      ) : (
        <div>No posts available</div>
      )}
    </div>
  );
};

export default PostList;
