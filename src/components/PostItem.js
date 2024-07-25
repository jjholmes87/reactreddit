import React from 'react';

const PostItem = ({ post }) => {
  return (
    <div className="post-item">
      <img src={post.thumbnail} alt={post.title} />
      <h3>{post.title}</h3>
      <p>{post.description}</p>
    </div>
  );
};

export default PostItem;
