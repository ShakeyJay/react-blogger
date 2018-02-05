import React from 'react';
import Header from './Header';
import Posts from './Posts';
import Post from './Post';
import CreatePost from './CreatePost';
import PostModal from './PostModal';
import Login from './Login';
import LoginModal from './LoginModal';
import CommentModal from './CommentModal';
const socket = io();


export default class Blog extends React.Component {
  state = {
    posts: [],
    creating: false,
    loggingIn: false,
    username: undefined,
    comment: false
  }

  componentDidMount() {
    socket.on('loadingPosts', (data, callback) => {
      this.setState(() => {
        return ({
          posts: data.posts
        });
      })
    });
  }


  handleCreateButtonPress = () => {
    this.setState(() => ({ creating: true }));
  }

  handleCreatePost = (post) => {
    if (!post) {
      return 'Enter valid value to add item';
    } 
    
    this.setState((prevState) => {
      return (
        prevState.posts.push({
          postTitle: post.title,
          postImg: post.img,
          postText: post.post,
          comments: post.comments,
      }));
    });

    this.handleRemoveModal();
  }

  handleComment = () => {
    this.setState(() => ({comment: true}));
  }

  handleAddComment = (comment) => {
    if(!comment) {
      return 'Enter a valid comment';
    }
    this.handleRemoveModal();
  }

  handleRemoveModal = () => {
    this.setState(() => ({ creating: false, loggingIn: false, comment: false }));
  }

  handleLogin = (user) => {
    if (user) {
      this.setState(() => ({username: user.username}));
    }
  }

  handleLogout = () => {
    this.setState(() => ({username: undefined}));
  }

  handleOpenLogin = () => {
    this.setState(() => ({ loggingIn: true }));
  }

  render () {
    return (
      <div>
        <Header 
          handleCreateButtonPress={this.handleCreateButtonPress} 
          handleOpenLogin={this.handleOpenLogin}
          handleLogout={this.handleLogout}
          username={this.state.username}
        />
        <div className="container">
          {/* <div className="widget"> */}
            <Posts
              posts={this.state.posts}
              handleComment={this.handleComment}
              handleAddComment={this.handleAddComment}
              username={this.state.username}
              comment={this.state.comment}
              socket={socket}
            />
        {/* </div> */}
        </div>
        <PostModal 
          openModal={this.state.creating}
          handleRemoveModal={this.handleRemoveModal}
          handleCreatePost={this.handleCreatePost}
          username={this.state.username}
          socket={socket}
        />
        <LoginModal 
          openModal={this.state.loggingIn}
          handleRemoveModal={this.handleRemoveModal}
          handleLogin={this.handleLogin}
          socket={socket}
        />
      </div>
    );
  }
}