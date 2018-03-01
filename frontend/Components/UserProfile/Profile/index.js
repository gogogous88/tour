import React, { Component } from "react";
import _ from "lodash";
import classnames from "classnames";
import styles from "./styles.css";
import { Link } from "react-router";
import PictureShow from "../../PictureShow";
import Test from "../../../Views/Test";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { phone: false };
  }
  // 图片修改很费劲先不做

  renderPhotoArray() {
    const {
      name,
      gitHandler,
      location,
      avatarUrl,
      level,
      city,
      photos,
      photos1,
      photos2,
      photos3,
      desc,
      tags,
      contact,
      vehicleTypes,
      pos
    } = this.props;
    const a =
      photos && !_.isEmpty(photos[0])
        ? photos[0].secure_url
        : "/src/static/images/noImgs.jpg";
    const b = photos1 && !_.isEmpty(photos1[0]) ? photos1[0].secure_url : "";
    const c =
      photos2 && !_.isEmpty(photos2[0])
        ? photos2[0].secure_url
        : "https://lh5.googleusercontent.com/-EuZO_JQigp4/AAAAAAAAAAI/AAAAAAAAAPo/Xo3oudQOvjY/photo.jpg?sz=50";
    const d =
      photos3 && !_.isEmpty(photos3[0])
        ? photos3[0].secure_url
        : "https://lh5.googleusercontent.com/-EuZO_JQigp4/AAAAAAAAAAI/AAAAAAAAAPo/Xo3oudQOvjY/photo.jpg?sz=50";
    return [a, b, c, d];
  }
  renderPhotos() {
    const {
      name,
      gitHandler,
      location,
      avatarUrl,
      level,
      city,
      photos,
      photos1,
      photos2,
      photos3,
      desc,
      tags,
      contact,
      vehicleTypes,
      pos
    } = this.props;
    const photosArray = this.renderPhotoArray();
    if (
      !_.isEmpty(photos) ||
      !_.isEmpty(photos1) ||
      !_.isEmpty(photos2) ||
      !_.isEmpty(photos3)
    ) {
      return <PictureShow photoArray={photosArray} />;
    }
    return <div>未上传图片</div>;
  }

  renderImg() {
    const {
      name,
      gitHandler,
      location,
      avatarUrl,
      level,
      city,
      photos,
      photos1,
      photos2,
      photos3,
      desc,
      tags,
      contact,
      vehicleTypes,
      pos
    } = this.props;

    return !_.isEmpty(photos) ||
      !_.isEmpty(photos1) ||
      !_.isEmpty(photos2) ||
      !_.isEmpty(photos3)
      ? this.renderPhotos()
      : "";
  }

  renderContact() {
    const { contact, username, googleId } = this.props;
    if (contact) {
      return contact;
    }
    if (!_.isEmpty(googleId)) {
      return `${username}@gmail.com`;
    } else return <p>未留下联系方式</p>;
  }

  renderPhone() {
    return !this.state.phone ? (
      <button
        className="btn"
        onClick={() => {
          this.setState({ phone: true });
        }}
      >
        联系方式
      </button>
    ) : (
      this.renderContact()
    );
  }

  renderCurrentLoc = pos => {
    return (
      <div>
        实时位置:<Test pos={pos} />
      </div>
    );
  };

  render() {
    const {
      name,
      gitHandler,
      location,
      avatarUrl,
      level,
      city,
      photos,
      photos1,
      photos2,
      photos3,
      desc,
      tags,
      contact,
      vehicleTypes,
      pos
    } = this.props;

    console.log("photos", this.props.photos);

    return (
      <div>
        <div className={styles.container}>
          <div className={styles.avatarContainer}>
            <img
              className={styles.avatar}
              src={avatarUrl}
              alt={`${name} avatar`}
            />
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.name}>{name}</div>
            <div className={styles.gitHandler}>
              <i className={classnames("fa fa-github-alt", styles.gitIcon)} />
              经验:{_.isEmpty(level) ? gitHandler : level}
            </div>
            <div className={styles.location}>
              导游长驻城市:{city || "美利坚和中国"}
            </div>
            <div className={styles.location}>
              {pos
                ? this.renderCurrentLoc(pos)
                : "实时位置:无法显示(点击查看原因)"}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <span style={{ fontSize: 22 }}>我的介绍:</span>
          </div>
          <div className="card-block">
            <div style={{ fontSize: 18, marginBottom: 5 }}>我的标签:</div>
            <div className="blockquote">
              <span style={{ fontSize: 14, marginBottom: 5 }}>{tags}</span>
            </div>
            <hr />
            <div style={{ fontSize: 18, marginBottom: 5 }}>我拥有车型:</div>
            <div className="blockquote">
              <span style={{ fontSize: 14, marginBottom: 5 }}>
                {vehicleTypes}
              </span>
            </div>
            <hr />
            <div style={{ fontSize: 18, marginBottom: 5 }}>我的简介:</div>
            <div className="blockquote">
              <span style={{ fontSize: 14, marginBottom: 5 }}>{desc}</span>
            </div>
            <hr />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <div>{this.renderPhone()}</div>
              <a className="btn" href="/profile">
                修改简历及图片
              </a>
            </div>
            {/* 图片修改很费劲，先不做 */}
            <div>
              <hr />
              <div style={{ fontSize: 18, marginBottom: 5 }}>图片:</div>
              {photos || photos1 || photos2 || photos3
                ? this.renderImg()
                : "未上传任何图片"}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.defaultProps = {
  name: "大侠",
  gitHandler: "大导",
  level: "老手导游",
  avatarUrl: "https://google.com"
};

Profile.propTypes = {
  name: React.PropTypes.string,
  gitHandler: React.PropTypes.string,
  location: React.PropTypes.string,
  avatarUrl: React.PropTypes.string
};

export default Profile;
