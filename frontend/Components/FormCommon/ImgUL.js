import React, { Component } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

import styles from "./styles";

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
          const uploadedImages = Object.assign([], this.state.images);
          uploadedImages.push(data);
          this.setState({ images: uploadedImages });
          this.props.onChange(this.state.images);
        });
    });
  };

  onDeleteImage(event) {
    event.preventDefault();

    const uploadedImages = Object.assign([], this.state.images);
    uploadedImages.splice(event.target.id, 1);
    this.setState({ images: uploadedImages });
    this.props.onChange(this.state.images);
    // console.log(event.target.id);
  }

  render() {
    const list = this.state.images.map((image, i) => {
      return (
        <li key={i}>
          <img
            style={{ marginTop: 5, marginRight: 6, width: 100 }}
            src={image.secure_url}
          />

          <a
            id={i}
            className="btn-floating"
            onClick={this.onDeleteImage.bind(this)}
            href="#"
          >
            <i className="material-icons grey darken-3">clear</i>
          </a>
        </li>
      );
    });
    return (
      <div>
        <Dropzone
          className="waves-effect grey darken-2 btn"
          // {styles.dropzone}
          onDrop={this.handleDrop.bind(this)}
          maxFileSize={3145728}
        >
          <i className="material-icons left">cloud</i>
          上传图片
        </Dropzone>
        <ol>{list}</ol>
      </div>
    );
  }
}

/* styles.css */

export default ImgUL;
