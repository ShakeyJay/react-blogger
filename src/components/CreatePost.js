import React from 'react';
import ImageUpload from './ImageUpload';


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

    this.props.socket.emit('createPost', {
      postTitle: title,
      postImg: img,
      postText: post,
      comments: []
    }, () => {
      console.log("emitted ceatePost");
    });

    const error = this.props.handleCreatePost({title, post, img, comments: []});

    this.setState(() => ({ error }));

    // if (!error) {
    //   e.target.elements.option.value = '';
    // }
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
        {/* {Change this to a textbox maybe?} */}
          <label htmlFor="add-post__title">Title:</label>
          <input className="add-post__title" id="add-post__title" type="text" name="post_title" />
          <label htmlFor="add-post__text">Content:</label>
          <input className="add-post__text" id="add-post__text" type="text" name="post_text" />
          <input type="file" onChange={this.handleImageChange} />
          <button className="button">Publish Post</button>
        </form>
        {$imagePreview}
      </div>
    );
  }
}