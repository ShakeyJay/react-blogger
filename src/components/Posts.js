import React from 'react';
import Post from './Post';


const Posts = (props) => (
  <div>
    <div className="widget-header">
      <h3 className="widget-header__title">Community Posts</h3>
      {/* <button
        className="button button--link"
        onClick={props.handleDeleteOptions}
       >
          Remove All
      </button> */}
    </div>

    {props.posts.length === 0 && <p className="widget__options">Please add an option to get started!</p>}
    {console.log('Posts', props.posts)}
    
    {
      props.posts.map((post, index) => (
        <Post
          key={`${post.postTitle} ${index}`}
          postTitle={post.postTitle}
          postText={post.postText}
          postImg={post.postImg}
          count={index+1}
          handleDeleteOption={props.handleDeleteOption}
          handleRemoveModal={props.handleRemoveModal}
          handleAddComment={props.handleAddComment}
          handleComment={props.handleComment}
          comment={props.comment}
          comments={post.comments}
          socket={props.socket}
          user={props.username}
        />
      ))
    }
  </div>
);

export default Posts;

