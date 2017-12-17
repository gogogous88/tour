import React, { Component } from "react";
import { Link } from "react-router";
import classnames from "classnames";
import Moment from "moment";
import styles from "./styles";

import Tag from "Components/Tag";

class DiscussionBox extends Component {
  render() {
    const {
      voteCount,
      userName,
      userGitHandler,
      discussionTitle,
      time,
      opinionCount,
      tags,
      link,
      userProfile,
      imageURL
    } = this.props;

    const postTime = Moment(time);
    const timeDisplay = postTime.from(Moment());

    return (
      <div className={styles.container}>
        <div
          className={classnames(
            styles.title,
            userProfile && styles.titleBottomMargin
          )}
        >
          <img src={imageURL} style={{ width: 60 }} />
          <Link to={link}>{discussionTitle}</Link>
        </div>

        {!userProfile && (
          <div className={styles.posterInfo}>
            <Link to={`/user/${userGitHandler}`} className={styles.name}>
              {userName}
            </Link>
            <a
              target="_blank"
              href={`https://www.github.com/${userGitHandler}`}
              className={styles.gitHandler}
            >
              - <i className={classnames("fa fa-github-alt", styles.gitIcon)} />{" "}
              {userGitHandler}
            </a>
          </div>
        )}

        <div className={styles.boxFooter}>
          <div className={styles.tagsArea}>
            {tags.map(tag => <Tag key={tag} name={tag} />)}
          </div>

          <div className={styles.postInfo}>
            <span className={styles.info}>{timeDisplay}</span>
            <span className={styles.info}>{voteCount} 收藏</span>
            <span className={styles.info}>{opinionCount} 回复</span>
          </div>
        </div>
      </div>
    );
  }
}

DiscussionBox.defaultProps = {
  discussionId: 1,
  voteCount: 20,
  userName: "Hello World",
  userGitHandler: "github",
  discussionTitle: "This is a default post title",
  time: Moment(),
  opinionCount: 12,
  tags: ["react", "redux", "nodejs"],
  link: "",
  userProfile: false
};

DiscussionBox.propTypes = {
  discussionId: React.PropTypes.number,
  voteCount: React.PropTypes.number,
  userName: React.PropTypes.string,
  userGitHandler: React.PropTypes.string,
  discussionTitle: React.PropTypes.string,
  time: React.PropTypes.any,
  opinionCount: React.PropTypes.number,
  tags: React.PropTypes.array,
  link: React.PropTypes.string,
  userProfile: React.PropTypes.bool
};

export default DiscussionBox;
