import React from 'react';
import Modal from 'react-modal';


export default class CommentModal extends React.Component {
  state = {
    first: true
  }

  setup = () => {
    let props = this.props;

    this.setState(() => ({
      firstProps: props,
      first: false
    }));
  }

  handleAddComment = (e) => {
    e.preventDefault();
    // this.props.postTitle
    const comment = e.target.elements.comment.value.trim();
    this.props.socket.emit('addComment', {
      postTitle: this.state.firstProps.postTitle,
      commentUser: this.state.firstProps.username,
      commentMessage: comment
    }, () => console.log('emitted addComment'));

    this.props.handleAddComment(comment);
  }

  render () {
    if (this.state.first)
      this.setup();
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