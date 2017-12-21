import React, { Component } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

class ImgUL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  handleDrop = files => {
    // Push all the axios request promise into a single array
    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `codeinfuse, medium, gist`);
      formData.append("upload_preset", "aqxyda0w"); // Replace the preset name with your own
      formData.append("api_key", "959356321645465"); // Replace API key with your own Cloudinary key
      formData.append("timestamp", (Date.now() / 1000) | 0);

      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return axios
        .post(
          "https://api.cloudinary.com/v1_1/markmoo/image/upload",
          formData,
          {
            headers: { "X-Requested-With": "XMLHttpRequest" }
          }
        )
        .then(response => {
          const data = response.data;
          const fileURL = data.secure_url; // You should store this URL for future references in your app
          console.log(data);
          const uploadedImages = Object.assign([], this.state.images);
          uploadedImages.push(data);
          this.setState({ images: uploadedImages });
          this.props.onChange(this.state.images);
          console.log(this.state.images);
        });
    });
  };

  onDeleteImage(event) {
    event.preventDefault();

    const uploadedImages = Object.assign([], this.state.images);
    uploadedImages.splice(event.target.id, 1);
    this.setState({ images: uploadedImages });
    this.props.onChange(this.state.images);
  }

  render() {
    const list = this.state.images.map((image, i) => {
      return (
        <li key={i}>
          <image style={{ width: 100 }} src={image.secure_url} />
          <br />
          <a onClick={this.onDeleteImage.bind(this)}>删除这张图片</a>
        </li>
      );
    });
    return (
      <div>
        <Dropzone onDrop={this.handleDrop.bind(this)}>
          <p>Drop your files or click here to upload</p>
        </Dropzone>
        <ol>{list}</ol>
      </div>
    );
  }
}

export default ImgUL;