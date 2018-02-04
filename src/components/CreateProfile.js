import React from 'react';
import firebase from 'firebase';
// import io from 'socket.io';
// const socket = io();

export default class CreateProfile extends React.Component {


  handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const username = e.target.elements.username.value;

    console.log(email, password, username);

    console.log("handleSubmit");
    this.signupUser(email, password, username);

    

  }


  signupUser = (email, password, username) => {
    console.log("In signupUser")
    console.log(email, password, username);
    // something wrong with the emitting of email??
    this.props.socket.emit('signup', {
      email: email,
      password: password,
      username: username 
    }, () => {
      console.log("emitted signup!");
    });


  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email: </label>
          <input id="email" type="text" name="email" />
          <label htmlFor="password">Password: </label>
          <input id="password" type="password" name="password" />
          <label htmlFor="username">Username:</label>
          <input id="username" type="text" name="username" />
          <button onClick={this.props.handleRemoveModal}>Sign up</button>
        </form>    
      </div>
    );
  }

}