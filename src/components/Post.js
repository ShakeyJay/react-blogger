import React, { Component } from 'react';
import CommentModal from './CommentModal';
import Comment from './Comment';


export default class Post extends React.Component {

  // addingComments = () => {
  //   console.log("We are adding comments")
  //   console.log(this.props.comments);
  //   let finalArr = [];
  //   if (this.props.comments) {
  //     this.props.comments.map((comment, index) => (
  //       <Comment 
  //         key={index}
  //         comment={comment.commentMessage} 
  //       />
  //     ));
  //   }
  // }


  render () {
    return (
      <div className="post">
        <h3>{this.props.postTitle}</h3>
        {this.props.postImg && <img src={this.props.postImg} />}
        <p className="post__text">{this.props.postText}</p>
        {this.props.comments && this.props.comments.map((comment, idx) => (
          <Comment
            key={idx}
            comment={comment.commentMessage}
          />
        ))}
        {console.log("This is after the adding")}
        <button onClick={this.props.handleComment}>Comment</button>
        <CommentModal 
          openModal={this.props.comment}
          handleAddComment={this.props.handleAddComment}
          handleRemoveModal={this.props.handleRemoveModal}
          socket={this.props.socket}
          postTitle={this.props.postTitle}
          user={this.props.username}
        />
        
      </div>
    );
  }
}


