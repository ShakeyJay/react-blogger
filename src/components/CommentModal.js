import React from 'react';
import Modal from 'react-modal';

// const CommentModal = (props) => (
//   <Modal
//     isOpen={!!props.openModal}
//     onRequestClose={props.handleRemoveModal}
//     contentLabel="Comment"
//     closeTimeoutMS={200}
//     className="modal"
//   >
//     <form onSubmit={props.handleAddComment}>
//       <textarea rows="4" cols="40" className="comment" >
//       </textarea>
//       <button>Post Comment</button>
//     </form>
//     <button className="button" onClick={props.handleRemoveModal}>Cancel</button>
//   </Modal>
// );

// export default CommentModal;


export default class CommentModal extends React.Component {

  handleAddComment = (e) => {
    e.preventDefault();
    console.log("commentModal", e.target.elements);
    // this.props.postTitle
    const comment = e.target.elements.comment.value.trim();
    console.log(comment);
    this.props.socket.emit('addComment', {
      postTitle: this.props.postTitle,
      commentUser: this.props.user,
      commentMessage: comment
    }, () => console.log('emitted addComment'));

    this.props.handleAddComment(comment);

  }

  render () {
    return (
      <Modal
        isOpen={!!this.props.openModal}
        onRequestClose={this.props.handleRemoveModal}
        contentLabel="Comment"
        closeTimeoutMS={200}
        className="modal"
      >
        <form onSubmit={this.handleAddComment}>
          <textarea rows="4" cols="40" className="comment" name="comment">
          </textarea>
          <button>Post Comment</button>
        </form>
        <button className="button" onClick={this.props.handleRemoveModal}>Cancel</button>
      </Modal>
    );
  }
}