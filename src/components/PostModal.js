import React from 'react';
import Modal from 'react-modal';
import CreatePost from './CreatePost';

const PostModal = (props) => (
  <Modal
    isOpen={!!props.openModal}
    onRequestClose={props.handleRemoveModal}
    contentLabel="Selected Option"
    closeTimeoutMS={200}
    className="modal"
  >
    <CreatePost 
      handleCreatePost={props.handleCreatePost} 
      socket={props.socket}  
    />
    <button className="button" onClick={props.handleRemoveModal}>Cancel</button>
  </Modal>
);

export default PostModal;