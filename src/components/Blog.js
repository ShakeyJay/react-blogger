import React from 'react';
import Header from './Header';
import Posts from './Posts';
import Post from './Post';
import CreatePost from './CreatePost';
import ImageUpload from './ImageUpload';
import PostModal from './PostModal';
import Login from './Login';
import LoginModal from './LoginModal';
import CommentModal from './CommentModal';
const socket = io();


export default class Blog extends React.Component {

  /*
    TODO
    Header that has a profile indicator
      Can login/signup or signout if you click on it
    Header button to create a post.
      When this is pressed you get a modal pop up
        It has 2 entry spots one for image and one for content
        button that creates and adds to DB
    Profile on the left that has user name and some stats?
      reposts count.
      total posts
      total comments
    Center Content
      Only show the last 5 posts and make them click a show more to show the next 5
      below the post you can put comments
      Limit a post to a few 100 chars
        have an error message if too long!
        Same with comments.
      Post structure should have the userName and then the content
      Just save everything to a json file for now. 
      Tell them you would have used firebase if I had more time but was running out.


      CreatePost needs to be a child of the modal
  */



  state = {
    posts: [],
    creating: false,
    loggingIn: false,
    username: undefined,
    comment: false
  }

  // TODO update this to a file or firebase
  componentDidMount() {
    socket.on('loadingPosts', (data, callback) => {
      this.setState(() => {
        return ({
          posts: data.posts
        });
      })
    });
      // const json = localStorage.getItem('posts');
      // const posts = JSON.parse(json);
      // console.log(json);
      // console.log(posts);

      // if (posts) {
      //   this.setState(() => ({ posts }));
      // }
  
  }

  componentDidUpdate(prevProps, prevState) {

  }

  componentWillUpdate(nextProps, nextState) {
    console.log(nextState);
  }


  handleCreateButtonPress = () => {
    // console.log(this.state.creating)
    this.setState(() => ({ creating: true }));
  }

  handleCreatePost = (post) => {
    console.log(post);
    if (!post) {
      return 'Enter valid value to add item';
    } 
    
    this.setState((prevState) => {
      return (
        prevState.posts.push({
          postTitle: post.title,
          postImg: post.img,
          postText: post.post,
          comments: post.comments
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
    console.log(user);
    if (user) {
      this.setState(() => ({username: user.username}));
    }
  }

  handleLogout = () => {
    this.setState(() => ({username: undefined}));
  }

  handleOpenLogin = () => {
    console.log(this.state.loggingIn);
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
        <div>
          <Posts 
            posts={this.state.posts}
            handleComment={this.handleComment}
            handleAddComment={this.handleAddComment}
            user={this.state.username}
            comment={this.state.comment}
            socket={socket}
          />
        </div>
        <PostModal 
          openModal={this.state.creating}
          handleRemoveModal={this.handleRemoveModal}
          handleCreatePost={this.handleCreatePost}
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