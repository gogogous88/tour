import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import classNames from 'classnames/bind';

const FILE_SIZE_MAX = 3; // max as 3M

class FileUploader extends Component {
  state = {
    dropzoneActive: false,
    isUploading: false,
    imageSrc: '',
    previewImage: '',
    percentage: 0
  };

  onDragEnter = () => {
    this.setState({
      dropzoneActive: true
    });
  };

  onDragLeave = () => {
    this.setState({
      dropzoneActive: false
    });
  };

  onDropAccepted = files => {
    const file = _.first(files);

    this.setState({
      previewImage: file.preview,
      isUploading: true
    });

    this.props.onUploadPhoto(
      this.props.uploadToken,
      file,
      this.updateUploadProgress
    );
  };

  onDropRejected = () => {
    alert(
      `Choose only one photo at a time (JPG or PNG formatted), up to ${FILE_SIZE_MAX}MB.`
    );
    this.setState({
      dropzoneActive: false
    });
  };

  updateUploadProgress = ({ hash, percentage, status }) => {
    this.setState({ percentage });
    if (status === 'complete') {
      this.props.onUploadComplete(hash, this.props.name);
      this.setState({
        isUploading: false,
        imageSrc: hash
      });
    }
  };

  onDelete = () => {
    this.setState({
      dropzoneActive: false,
      isUploading: false,
      imageSrc: '',
      previewImage: '',
      percentage: 0
    });
    this.props.onDelete(this.props.name);
  };

  renderDefault = () => (
    <div className="upload-icon">
      <i className="fa fa-cloud-upload " />
      <p>Drop your photo here</p>
      <cite>JPG or PNG, up to {FILE_SIZE_MAX}MB</cite>
    </div>
  );

  renderUploading = () => (
    <div className="preview-image-wrap">
      <img src={this.state.previewImage} />
      <span>{this.state.percentage}%</span>
    </div>
  );

  renderUploaded = () => (
    <div className="preview-image-wrap">
      <a
        href={`${uploadImageHost}/${this.state.imageSrc}-s1200`}
        target="_blank"
      >
        <img src={`${uploadImageHost}/${this.state.imageSrc}-s250`} />
      </a>
      <i className="fa fa-times-circle remove-icon" onClick={this.onDelete} />
    </div>
  );

  render() {
    const { isUploading, imageSrc } = this.state;

    const showDefault = !isUploading && _.isEmpty(imageSrc);
    const showUploading = isUploading && _.isEmpty(imageSrc);
    const showUploaded = !isUploading && !_.isEmpty(imageSrc);
    const disabled = isUploading || !_.isEmpty(imageSrc);

    return (
      <Dropzone
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDropAccepted={this.onDropAccepted}
        onDropRejected={this.onDropRejected}
        disabled={disabled}
        accept="image/jpeg, image/png"
        className={classNames({
          'uploader-container': true,
          uploaded: showUploaded
        })}
        activeClassName={'active'}
        rejectClassName={'reject'}
        multiple={false}
        maxSize={1024 * 1000 * FILE_SIZE_MAX}
      >
        {showUploaded && this.renderUploaded()}
        {showUploading && this.renderUploading()}
        {showDefault && this.renderDefault()}
      </Dropzone>
    );
  }
}

export default FileUploader;
