import React from 'react';

const Comment = (props) => (
  <div className="comment">
    <p key={props.count}>{props.username}: {props.comment}</p>
  </div>
);

export default Comment;