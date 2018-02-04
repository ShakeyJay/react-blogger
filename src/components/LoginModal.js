import React from 'react';
import Modal from 'react-modal';
import CreateProfile from './CreateProfile';
import Login from './Login';

// const LoginModal = (props) => (
//   <Modal
//     isOpen={!!props.openModal}
//     onRequestClose={props.handleRemoveModal}
//     contentLabel="Selected Option"
//     closeTimeoutMS={200}
//     className="modal"
//   >
//     {/* <CreatePost handleCreatePost={props.handleCreatePost} /> */}
//     {
      
//       <Login /> ||
//       <CreateProfile />
//     }
//     <Login />
//     <CreateProfile />
//     <button className="button" onClick={props.handleRemoveModal}>Cancel</button>
//   </Modal>
// );

// export default LoginModal;

export default class LoginModal extends React.Component {
  state = {
    login: true
  }

  useSignup = () => {
    this.setState(() => ({ login: false }));
  }

  useLogin = () => {
    this.setState(() => ({ login: true }));
  }

  render () {
    return (
      <Modal
        isOpen={!!this.props.openModal}
        onRequestClose={this.props.handleRemoveModal}
        contentLabel="Selected Option"
        closeTimeoutMS={200}
        className="modal"
      >
        <button onClick={this.useLogin}>Log In</button>
        <button onClick={this.useSignup}>Sign Up</button>
        {this.state.login ? 
          <Login 
            handleRemoveModal={this.props.handleRemoveModal}
            handleLogin={this.props.handleLogin}
            socket={this.props.socket}
          /> : 
          <CreateProfile 
            handleRemoveModal={this.props.handleRemoveModal}
            socket={this.props.socket}
          /> 
        }
        {/* <CreatePost handleCreatePost={props.handleCreatePost} /> */}
        <button className="button" onClick={this.props.handleRemoveModal}>Cancel</button>
      </Modal>
    );
  }
}