import React from 'react';
import * as firebase from 'firebase';
import { SIGNUP_USER } from '../actions/types';


export default class Login extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    console.log('here');
    this.loginUser(email, password);

  }

  loginUser = (email, password) => {
    this.props.socket.emit('login', {
      email: email,
      password: password,
    }, () => {
      console.log("emitted signup!");
      this.props.socket.on('loggingIn', (data, callback) => {
        console.log('Login.js', data);
        this.props.handleLogin({username: data.username});
        callback();
      });
    });
  };


  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email: </label>
          <input id="email" type="text" name="email" />
          <label htmlFor="password">Password: </label>
          <input id="password" type="password" name="password" />
          <button onClick={this.props.handleRemoveModal}>Log In</button>
        </form>
      </div>
    );
  }

}
