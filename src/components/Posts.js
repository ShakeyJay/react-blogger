import React from 'react';
import Post from './Post';


const Posts = (props) => (
  <div>
    <div className="widget-header">
      <h3 className="widget-header__title">Community Posts</h3>
    </div>

    {props.posts.length === 0 && <p className="widget__options">Please add an option to get started!</p>}
    
    {
      props.posts.map((post, index) => (
        <Post
          key={index}
          count={index}
          postTitle={post.postTitle}
          postText={post.postText}
          postImg={post.postImg}
          creator={post.creator}
          repost={post.repostBy}
          handleDeleteOption={props.handleDeleteOption}
          handleRemoveModal={props.handleRemoveModal}
          handleAddComment={props.handleAddComment}
          handleComment={props.handleComment}
          comment={props.comment}
          comments={post.comments}
          socket={props.socket}
          username={props.username}
        />
      ))
    }
  </div>
);

export default Posts;

