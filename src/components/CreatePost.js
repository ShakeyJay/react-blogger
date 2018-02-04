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
      <div>
        {this.state.error && <p className="add-post-error">{this.state.error}</p>}
        <form className="add-post" onSubmit={this.handleCreatePost}>
          <label htmlFor="add-post__title">Title:</label>
          <input className="add-post__title" id="add-post__title" type="text" name="post_title" />
          <label htmlFor="add-post__text">Content:</label>
          <textarea className="add-post__text" id="add-post__text" name="post_text" />
          <input type="file" onChange={this.handleImageChange} />
          <button className="button">Publish Post</button>
        </form>
        {$imagePreview}
      </div>
    );
  }
}