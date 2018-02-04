import React, { Component } from 'react';
import CommentModal from './CommentModal';
import Comment from './Comment';


export default class Post extends React.Component {
  state = {
    comment: false,
    first: true
  }

  setup = () => {
    let props = this.props;

    this.setState(() => ({
      firstProps: props,
      first: false
    }));
  }

  handleComment = () => {
    this.setState(() => ({comment: true}))

    this.props.handleComment();
  }

  handleAddComment = (e) => {
    e.preventDefault();

    const comment = e.target.elements.comment.value.trim();
    this.props.socket.emit('addComment', {
      postTitle: this.state.firstProps.postTitle,
      commentUser: this.state.firstProps.username,
      commentMessage: comment
    }, () => console.log('emitted addComment'));

    this.setState(() => ({ comment: false }))
    this.props.handleAddComment(comment);
  }

  handleRepost = (e) => {
    e.preventDefault();

    this.props.socket.emit('repost', {
      postTitle: this.state.firstProps.postTitle,
      creator: this.state.firstProps.creator,
      postImg: this.state.firstProps.postImg,
      postText: this.state.firstProps.postText,
      comments: this.state.firstProps.comments,
      repostBy: this.props.username
    }, () => {
      console.log("Emitted repost")
    })

    this.setState(() => ({ first: false }));

  }

  render () {
    if (this.state.first) {
      this.setup();
      return (<p></p>);
    }
      
    return (
      <div className="post">
        <h3>
        {console.log(this.props.creator)}
          {this.props.postTitle} posted by {this.props.creator} 
          {!!this.props.repost && 
          <span> reposted by {this.props.repost}</span>}
        </h3>
        {this.props.postImg && <img src={this.props.postImg} />}
        <p className="post__text">{this.props.postText}</p>
        {this.props.comments && this.props.comments.map((comment, idx) => (
          <Comment
            count={idx}
            comment={comment.commentMessage}
            username={comment.commentUser || "Anonymous"}
          />
        ))}
        {!!this.state.comment && <form onSubmit={this.handleAddComment}>
          <input type="text" name="comment" />
          <button>Publish</button>
        </form>}
        {!!!this.state.comment && 
        <div>
          <button onClick={this.handleComment}>Comment</button>
          {!!this.props.username && <button onClick={this.handleRepost}>Repost</button>}
        </div>
        }        
      </div>
    );
  }
}


