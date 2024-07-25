// src/components/PostList.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { loadPosts } from '../redux/actions/postsActions';

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector(state => state.posts);

  useEffect(() => {
    dispatch(loadPosts('cake recipes'));
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {posts.map(post => (
        <div key={post.id} className="post-item">
          <h3>{post.title}</h3>
          <ReactMarkdown>{post.selftext}</ReactMarkdown>
        </div>
      ))}
    </div>
  );
};

export default PostList;
