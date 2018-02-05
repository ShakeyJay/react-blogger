import React from 'react';
import Modal from 'react-modal';
import CreateProfile from './CreateProfile';
import Login from './Login';

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
        <button className="button" onClick={this.useLogin}>Log In</button>
        <button className="button" onClick={this.useSignup}>Sign Up</button>
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
        <button className="button" onClick={this.props.handleRemoveModal}>Cancel</button>
      </Modal>
    );
  }
}