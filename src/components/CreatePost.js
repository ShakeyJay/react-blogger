import React from 'react';


export default class CreatePost extends React.Component {
  state = {
    error: undefined,
    file: '',
    imagePreviewUrl: ''
  };

  handleCreatePost = (e) => {
    e.preventDefault();

    const title = e.target.elements.post_title.value.trim();
    const post = e.target.elements.post_text.value.trim();
    const img = this.state.imagePreviewUrl;
    const creator = this.props.username;

    this.props.socket.emit('createPost', {
      postTitle: title,
      postImg: img,
      postText: post,
      comments: [],
      creator: creator
    }, () => {
      console.log("emitted ceatePost");
    });

    const error = this.props.handleCreatePost({title, post, img, comments: []});

    this.setState(() => ({ error }));
  }

  handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    }

    return (
      <div className="create-post">
        {this.state.error && <p className="create-post-error">{this.state.error}</p>}
        <form className="modal__body" onSubmit={this.handleCreatePost}>
          <div className="create-post__input">
            <label htmlFor="create-post__title">Title:</label>
            <input id="create-post__title" type="text" name="post_title" />
          </div>
          <div className="create-post__input">
            <label htmlFor="create-post__text">Content:</label>
            <textarea id="create-post__text" name="post_text" />
          </div>
          <div className="create-post__input">
            <input type="file" onChange={this.handleImageChange} /><br />
            <button className="button">Publish Post</button>
          </div>
        </form>
        {/* {$imagePreview} */}
      </div>
    );
  }
}