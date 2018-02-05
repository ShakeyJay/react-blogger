import React from 'react';

export default class CreateProfile extends React.Component {


  handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const username = e.target.elements.username.value;

    this.signupUser(email, password, username);
  }


  signupUser = (email, password, username) => {
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
      <div className="modal__body">
        <form onSubmit={this.handleSubmit}>
          <div>
            <label className="modal__body" htmlFor="email">Email: </label>
            <input className="modal__body" id="email" type="text" name="email" />
          </div>
          <div>
            <label className="modal__body" htmlFor="password">Password: </label>
            <input className="modal__body" id="password" type="password" name="password" />
          </div>
          <div>
            <label className="modal__body" htmlFor="username">Username:</label>
            <input className="modal__body" id="username" type="text" name="username" />
          </div>
          <button className="button" onClick={this.props.handleRemoveModal}>Sign up</button>
        </form>    
      </div>
    );
  }

} 