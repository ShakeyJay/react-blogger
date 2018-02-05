import React from 'react';

const Header = (props) => (
  <div className="header">
    <div className="container">
      <h1 className="header__title">{props.title}</h1>  
      {!!props.username && <h5 className="header__subtitle">{props.username}</h5>}    
      {!!!props.username ? 
        <button className="button" onClick={props.handleOpenLogin}>Login</button> : 
        <div>
          <button className="button" onClick={props.handleCreateButtonPress}>Create Post</button>
          <button className="button" onClick={props.handleLogout}>Log Out</button>
        </div>
      }
      
    </div>

  </div>
);

Header.defaultProps = {
  title: 'Space Blog'
};

export default Header;