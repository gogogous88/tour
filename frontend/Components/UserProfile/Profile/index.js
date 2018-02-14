import React, { Component } from "react";
import _ from "lodash";
import classnames from "classnames";
import styles from "./styles.css";
import { Link } from "react-router";
import ArrayShow from "../../SlideShow/ArrayShow";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { phone: false };
  }
  // 图片修改很费劲先不做
  // renderImg() {
  //   return (
  //     <div className="container">
  //       <ArrayShow photoArray={this.props.photos} />
  //     </div>
  //   );
  // }

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

  render() {
    const {
      name,
      gitHandler,
      location,
      avatarUrl,
      level,
      city,
      photos,
      desc,
      tags
    } = this.props;

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
              导游城市:{city || "美利坚和中国"}
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
              <Link className="btn" to="/profile">
                修改简历
              </Link>
            </div>

            {/* 图片修改很费劲，先不做 */}

            {/* <hr />
            <div style={{ fontSize: 18, marginBottom: 5 }}>图片:</div>
            <ul>{this.renderImg()}</ul>
           */}
          </div>
        </div>
      </div>
    );
  }
}

Profile.defaultProps = {
  name: "大侠",
  gitHandler: "大导",

  avatarUrl: "https://google.com"
};

Profile.propTypes = {
  name: React.PropTypes.string,
  gitHandler: React.PropTypes.string,
  location: React.PropTypes.string,
  avatarUrl: React.PropTypes.string
};

export default Profile;
