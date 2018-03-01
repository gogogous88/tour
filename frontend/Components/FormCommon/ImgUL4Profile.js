import React, { Component } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { connect } from "react-redux";

import styles from "./styles";
import _ from "lodash";

const FILE_SIZE_MAX = 4; // max as 4M

class ImgUL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      edit: false,
      inactivate: false
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

          this.setState({ images: uploadedImages, inactivate: true });
          this.props.onChange(this.state.images);
        });
    });
  };

  onDeleteImage(e) {
    e.preventDefault();

    const uploadedImages = Object.assign([], this.state.images);

    uploadedImages.splice(e.currentTarget.id, 1);
    this.setState({ images: uploadedImages, inactivate: false });
    this.props.onChange(this.state.images);

    // console.log(event.target.id);
  }

  onDropRejected = () => {
    alert(
      `您上传的图片超过了${FILE_SIZE_MAX}MB,请选择${FILE_SIZE_MAX}MB以下的图片上传。`
    );
    // this.setState({
    //   dropzoneActive: false
    // });
  };

  render() {
    const list = this.state.images.map((image, i) => {
      return (
        <li>
          <img
            key={i}
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
    if (
      (this.props.user.photos &&
        !_.isEmpty(this.props.user.photos[0]) &&
        !this.state.edit) ||
      (this.props.user.photos1 &&
        !_.isEmpty(this.props.user.photos1[0]) &&
        !this.state.edit) ||
      (this.props.user.photos2 &&
        !_.isEmpty(this.props.user.photos2[0]) &&
        !this.state.edit) ||
      (this.props.user.photos3 &&
        !_.isEmpty(this.props.user.photos3[0]) &&
        !this.state.edit)
    ) {
      switch (this.props.index) {
        case 0:
          return !_.isEmpty(this.props.user.photos) ? (
            <img
              src={this.props.user.photos[0].secure_url}
              width="35%"
              height="35%"
              onClick={() => {
                this.setState({ edit: true });
              }}
            />
          ) : (
            <img
              src="/src/static/images/uploadimg.jpg"
              width="35%"
              height="35%"
              onClick={() => {
                this.setState({ edit: true });
              }}
            />
          );
        case 1:
          return this.props.user.photos1 &&
            !_.isEmpty(this.props.user.photos1) ? (
            <img
              src={this.props.user.photos1[0].secure_url}
              width="35%"
              height="35%"
              onClick={() => {
                this.setState({ edit: true });
              }}
            />
          ) : (
            <img
              src="/src/static/images/uploadimg.jpg"
              width="35%"
              height="35%"
              onClick={() => {
                this.setState({ edit: true });
              }}
            />
          );
        case 2:
          return this.props.user.photos2 &&
            !_.isEmpty(this.props.user.photos2) ? (
            <img
              src={this.props.user.photos2[0].secure_url}
              width="35%"
              height="35%"
              onClick={() => {
                this.setState({ edit: true });
              }}
            />
          ) : (
            <img
              src="/src/static/images/uploadimg.jpg"
              width="35%"
              height="35%"
              onClick={() => {
                this.setState({ edit: true });
              }}
            />
          );
        case 3:
          return this.props.user.photos3 &&
            !_.isEmpty(this.props.user.photos3) ? (
            <img
              src={this.props.user.photos3[0].secure_url}
              width="35%"
              height="35%"
              onClick={() => {
                this.setState({ edit: true });
              }}
            />
          ) : (
            <img
              src="/src/static/images/uploadimg.jpg"
              width="35%"
              height="35%"
              onClick={() => {
                this.setState({ edit: true });
              }}
            />
          );

        default:
          return <div>null</div>;
      }
    }
    const className = this.state.inactivate
      ? "waves-effect grey darken-2 btn"
      : "waves-effect btn";
    return (
      <div>
        <Dropzone
          accept="image/jpeg, image/png"
          onDropRejected={this.onDropRejected.bind(this)}
          disabled={this.state.inactivate}
          className={className}
          onDrop={this.handleDrop.bind(this)}
          multiple={false}
          maxSize={1024 * 1000 * FILE_SIZE_MAX}
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
function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(ImgUL);
