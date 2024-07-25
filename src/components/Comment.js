import React from 'react';

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <p><strong>{comment.author}</strong>: {comment.text}</p>
      {comment.replies && comment.replies.map(reply => (
        <Comment key={reply.id} comment={reply} />
      ))}
    </div>
  );
};

export default Comment;
