import React from 'react';


const Comment = (props) => (
  <div className="comment">
    <p key={props.key}>{props.comment}</p>
  </div>
);

export default Comment;