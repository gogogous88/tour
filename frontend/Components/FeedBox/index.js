//「 」【】
import React, { Component } from "react";
import classnames from "classnames";
import Moment from "moment";
import moment from "moment";
import styles from "./styles";
import _ from "lodash";

import DiscussionBox from "./DiscussionBox";

class FeedBox extends Component {
  renderSort() {
    const { activeSortingMethod, onChangeSortingMethod } = this.props;

    if (this.props.type === "general") {
      return (
        <div className={styles.sortList}>
          <span
            className={classnames(
              styles.sort,
              activeSortingMethod === "date" && styles.sortActive
            )}
            onClick={() => onChangeSortingMethod("date")}
          >
            最新发布
          </span>
          <span
            className={classnames(
              styles.sort,
              activeSortingMethod === "popularity" && styles.sortActive
            )}
            onClick={() => onChangeSortingMethod("popularity")}
          >
            出发日期
          </span>
        </div>
      );
    }
    return null;
  }

  renderEmptyDiscussionLine(loading, discussions) {
    if (!loading) {
      if (!discussions || discussions.length === 0) {
        return <div className={styles.loading}>目前还未发表文章...</div>;
      }
    }
  }

  renderImageURL(discussion) {
    switch (discussion.forum.forum_slug) {
      case "shun_feng_che":
        const shunFengURL =
          "http://res.cloudinary.com/markmoo/image/upload/v1513478000/shun_feng_vnphax.png";
        return shunFengURL;

      case "pin_fang":
        const pinFangURL =
          "http://res.cloudinary.com/markmoo/image/upload/v1513478000/pin_fang_k8ipou.png";
        return pinFangURL;

      case "market":
        const marketURL =
          "http://res.cloudinary.com/markmoo/image/upload/v1513478000/mai_mai_kqhwmx.png";
        return marketURL;

      default:
        return discussion.title;
    }
  }

  renderTitle(discussion) {
    switch (discussion.forum.forum_slug) {
      case "shun_feng_che":
        const shunFengTitle = `${discussion.sup_or_req}顺风车-:「${moment(
          discussion.pdate
        ).format("MM/DD")}」-【${discussion.ploc}至${discussion.rloc}】
        `;
        return shunFengTitle;

      case "pin_fang":
        const pinFangTitle = `${discussion.sup_or_req}拼房:从${moment(
          discussion.rdate[0]
        ).format("MM/DD")}日-到-${moment(discussion.rdate[1]).format(
          "MM/DD"
        )}日--${discussion.ploc}
        `;
        return pinFangTitle;

      case "market":
        const marketTitle = `「${discussion.ploc}」${
          discussion.sup_or_req
        }商品：${discussion.title},价格${discussion.rate}
        `;
        return marketTitle;

      default:
        return discussion.title;
    }
  }

  render() {
    const {
      type,
      loading,
      discussions,
      currentForum,
      userProfile
    } = this.props;

    let discussionBoxTitle = "";
    if (type === "general") discussionBoxTitle = "Discussions";
    if (type === "pinned") discussionBoxTitle = "Pinned";

    //shun_feng_che, pin_fang, fa_tuan_jie_huo, market
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.title}>{discussionBoxTitle}</span>
          {!userProfile && this.renderSort()}
        </div>
        {loading && <div className={styles.loading}>Loading...</div>}
        {this.renderEmptyDiscussionLine(loading, discussions)}
        {!loading && (
          <div className={styles.discussions}>
            {discussions &&
              discussions.map(discussion => {
                return (
                  <DiscussionBox
                    userProfile={userProfile}
                    key={discussion._id}
                    userName={discussion.user.name || discussion.user.username}
                    userGitHandler={discussion.user.username}
                    discussionTitle={this.renderTitle(discussion)}
                    time={discussion.date}
                    tags={discussion.tags}
                    imageURL={this.renderImageURL(discussion)}
                    opinionCount={discussion.opinion_count}
                    voteCount={discussion.favorites.length}
                    link={`/${
                      userProfile ? discussion.forum.forum_slug : currentForum
                    }/discussion/${discussion.discussion_slug}`}
                  />
                );
              })}
          </div>
        )}
      </div>
    );
  }
}

FeedBox.defaultProps = {
  type: "general",
  loading: false,
  discussions: [],
  currentForum: "general",
  activeSortingMethod: "date",
  onChangeSortingMethod: val => {},
  userProfile: false
};

FeedBox.propTypes = {
  type: React.PropTypes.oneOf(["general", "pinned"]),
  loading: React.PropTypes.bool,
  discussions: React.PropTypes.array,
  currentForum: React.PropTypes.string,
  activeSortingMethod: React.PropTypes.string,
  onChangeSortingMethod: React.PropTypes.func,
  userProfile: React.PropTypes.bool
};

export default FeedBox;
