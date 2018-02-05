import React from 'react';

export default class Login extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    this.loginUser(email, password);

  }

  loginUser = (email, password) => {
    this.props.socket.emit('login', {
      email: email,
      password: password,
    }, () => {
      console.log("emitted signup!");
      this.props.socket.on('loggingIn', (data, callback) => {
        this.props.handleLogin({username: data.username});
        callback();
      });
    });
  };


  render () {
    return (
      <div className="modal__body">
        <form onSubmit={this.handleSubmit}>
          
          <label className="modal__body" htmlFor="email">Email: </label>
          <input className="modal__body" id="email" type="text" name="email" /><br/>
          <label className="modal__body" htmlFor="password">Password: </label>
          <input className="modal__body" id="password" type="password" name="password" /><br/>
          <button className="button" onClick={this.props.handleRemoveModal}>Log In</button>
        </form>
      </div>
    );
  }

}
