import React from 'react';

const Header = (props) => (
  <div className="header">
    <div className="container">
      <h1 className="header__title">{props.title}</h1>      
      {!!!props.username ? 
        <button onClick={props.handleOpenLogin}>Login</button> : 
        <div>
          <button onClick={props.handleCreateButtonPress}>Create Post</button>
          <button onClick={props.handleLogout}>Log Out</button>
        </div>
      }
      {<h5>{props.username}</h5>}
    </div>

  </div>
);

Header.defaultProps = {
  title: 'Space Blog'
};

export default Header;