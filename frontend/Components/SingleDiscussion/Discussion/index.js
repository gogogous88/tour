import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router";
import moment from "moment";
import classnames from "classnames";
import styles from "./styles.css";

import PlaceholderImage from "SharedStyles/placeholder.jpg";
import Button from "Components/Button";
import Tag from "Components/Tag";
import RichEditor from "Components/RichEditor";

import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

class Discussion extends Component {
  renderUploadImages(uploadImg) {
    return uploadImg.map(eachImg => {
      return (
        <div key={eachImg.secure_url} style={{ marginTop: 15 }}>
          <li>
            <img
              src={eachImg.secure_url}
              style={{ alignSelf: "center", width: "80%" }}
            />
          </li>
        </div>
      );
    });
  }

  renderContent() {
    const { forum_slug, discContent, uploadImg } = this.props;
    switch (forum_slug) {
      case "tour_wiki":
        return <FroalaEditorView model={discContent} />;

      default:
        return (
          <div>
            <RichEditor readOnly={true} value={discContent} />
            <ul>{this.renderUploadImages(uploadImg)}</ul>
          </div>
        );
    }
  }

  render() {
    const {
      id,
      userAvatar,
      userName,
      userGitHandler,
      discTitle,
      discDate,
      discContent,
      tags,
      rloc,
      favoriteCount,
      favoriteAction,
      userFavorited,
      toggleingFavorite,
      allowDelete,
      deletingDiscussion,
      deleteAction,
      imageURL,
      uploadImg
    } = this.props;

    let dateDisplay = moment(discDate);
    dateDisplay = dateDisplay.from(moment());

    let favCount = "";
    if (toggleingFavorite) favCount = "Toggling Favorite...";
    else if (userFavorited) favCount = `Favorited (${favoriteCount})`;
    else if (favoriteCount === 0) favCount = "make favorite";
    else if (favoriteCount === 1) favCount = "1 favorite";
    else favCount = `${favoriteCount} favorites`;

    return (
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <img className={styles.avatar} src={userAvatar} />
          <div className={styles.columnOnSmallBP}>
            <div className={styles.userInfo}>
              <Link to={`/user/${userGitHandler}`} className={styles.name}>
                {userName || userGitHandler}
              </Link>
              <a
                href={`https://www.github.com/${userGitHandler}`}
                target="_blank"
                className={styles.gitHandler}
              >
                <i className={classnames("fa fa-github-alt", styles.gitIcon)} />
                <span>{userGitHandler}</span>
              </a>
            </div>
            <div className={styles.dateInfo}>{dateDisplay}</div>
          </div>
        </div>

        <div className={styles.imageContainer}>
          <div className={styles.imgContainer}>
            <img src={imageURL} style={{ width: 60 }} />
          </div>
          <div className={styles.titleContainer}>
            <div className={styles.discTitle}>{discTitle}</div>
          </div>
        </div>

        <div className={styles.discContent}>{this.renderContent()}</div>

        <div className={styles.discFooter}>
          <div className={styles.tags}>
            {tags.map(tag => <Tag name={tag} key={_.uniqueId("tag_")} />)}
          </div>

          <Button
            noUppercase
            className={styles.favoriteButton}
            onClick={() => {
              !toggleingFavorite && favoriteAction(id);
            }}
          >
            <i
              className={classnames(
                `fa fa-${userFavorited ? "heart" : "heart-o"}`
              )}
            />
            <span>{favCount}</span>
          </Button>

          {allowDelete && (
            <Button
              noUppercase
              className={styles.deleteButton}
              onClick={() => {
                deleteAction();
              }}
            >
              <i className={classnames("fa fa-trash", styles.trashIcon)} />
              <span>删除</span>
            </Button>
          )}
        </div>

        {deletingDiscussion && (
          <div className={styles.deletingDiscussion}>
            Deleting Discussion...
          </div>
        )}
      </div>
    );
  }
}

Discussion.defaultProps = {
  id: 0,
  userAvatar: PlaceholderImage,
  userName: "User name",
  userGitHandler: "github",
  discTitle: "Default Discussion Title",
  discDate: "a day ago",
  discContent:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  tags: ["react", "redux", "webkit"],
  rloc: "unknown",
  favoriteCount: 1,
  favoriteAction: () => {},
  userFavorited: false,
  toggleingFavorite: false,
  allowDelete: false,
  deletingDiscussion: false,
  deleteAction: () => {}
};

Discussion.propTypes = {
  id: React.PropTypes.any,
  userAvatar: React.PropTypes.string,
  userName: React.PropTypes.string,
  userGitHandler: React.PropTypes.string,
  discTitle: React.PropTypes.string,
  discDate: React.PropTypes.any,
  discContent: React.PropTypes.any,
  rloc: React.PropTypes.string,
  tags: React.PropTypes.array,
  favoriteCount: React.PropTypes.number,
  favoriteAction: React.PropTypes.func,
  userFavorited: React.PropTypes.bool,
  toggleingFavorite: React.PropTypes.bool,
  allowDelete: React.PropTypes.bool,
  deletingDiscussion: React.PropTypes.bool,
  deleteAction: React.PropTypes.func
};

export default Discussion;
