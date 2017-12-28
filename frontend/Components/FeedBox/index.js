//「 」【】
import React, { Component } from "react";
import classnames from "classnames";
import Moment from "moment";
import moment from "moment";
import styles from "./styles";
import _ from "lodash";

import DiscussionBox from "./DiscussionBox";

import keys from "../../../config/credentials";

// function searchingFor(term) {
//   return function(x) {
//     return (
//       x.pdate.toString().includes(term.toString()) ||
//       x.ploc.toString().includes(term.toString()) ||
//       !term
//     );
//   };
// }

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
        if (discussion.sup_or_req === "提供") {
          const shunFengURL = keys.SUP_SHUN_FENG_CHE;
          return shunFengURL;
        } else {
          const shunFengURL = keys.REQ_SHUN_FENG_CHE;
          return shunFengURL;
        }

      case "pin_fang":
        if (discussion.sup_or_req === "提供") {
          const pinFangURL = keys.SUP_PIN_FANG;
          return pinFangURL;
        } else {
          const pinFangURL = keys.REQ_PIN_FANG;
          return pinFangURL;
        }

      case "market":
        if (discussion.sup_or_req === "提供") {
          const marketURL = keys.SUP_MARKET;
          return marketURL;
        } else {
          const faTuanURL = keys.REQ_MARKET;
          return faTuanURL;
        }

      case "fa_tuan_jie_huo":
        if (discussion.sup_or_req === "提供") {
          const faTuanURL = keys.SUP_JIE_TUAN;
          return faTuanURL;
        } else {
          const faTuanURL = keys.REQ_JIE_TUAN;
          return faTuanURL;
        }

      case "tour_wiki":
        if (discussion.sup_or_req === "提供") {
          const faTuanURL = "/src/statics/baike.png";
          return faTuanURL;
        } else {
          const faTuanURL = "/src/statics/gong_lve.png";
          return faTuanURL;
        }

      default:
        return discussion.title;
    }
  }

  renderTitle(discussion) {
    switch (discussion.forum.forum_slug) {
      case "shun_feng_che":
        const shunFengTitle = `${discussion.sup_or_req}顺风车-:「${moment(
          discussion.pdate
        ).format("MM/DD")}--${discussion.ploc}--->${
          discussion.rloc
        }」联系方式：「${discussion.ph_no}」
        `;
        return shunFengTitle;

      case "pin_fang":
        const pinFangTitle = `${discussion.sup_or_req}拼房:「${
          discussion.ploc
        }--${moment(discussion.rdate[0]).format("MM/DD")}--->${moment(
          discussion.rdate[1]
        ).format("MM/DD")}」,联系方式：「${discussion.ph_no}」(${moment(
          discussion.rdate[0]
        ).format("YYYY")}年)
        `;
        return pinFangTitle;

      case "market":
        if (discussion.sup_or_req === "提供") {
          const marketTitle = `「${discussion.ploc}」
            出售：「${discussion.title}」,价格「${
            discussion.rate
          }」，联系方式：「${discussion.ph_no}」
          `;
          return marketTitle;
        } else {
          const marketTitle = `「${discussion.ploc}」求购商品：「${
            discussion.title
          }」，联系方式：「${discussion.ph_no}」
          `;
          return marketTitle;
        }

      case "fa_tuan_jie_huo":
        const {
          sup_or_req,
          rdate,
          ploc,
          rloc,
          ph_no,
          vehicleType
        } = discussion;
        if (sup_or_req === "提供") {
          const faTuanTitle = `哪位能接「${moment(rdate[0]).format(
            "MM/DD"
          )}-${ploc}」开始「${moment(rdate[1]).format(
            "MM/DD"
          )}-${rloc}」结束，需要「${vehicleType}」的团，联系方式:「${ph_no}」,有空的导游请与我取得联系，谢谢。`;
          return faTuanTitle;
        } else {
          const faTuanTitle = `求接团，-各位大导，我从「${moment(
            rdate[0]
          ).format("MM/DD")}」到「${moment(rdate[1]).format(
            "MM/DD"
          )}」期间可以接「${ploc}」开始的团，联系方式:「${ph_no}」`;
          return faTuanTitle;
        }

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

    const filterDiscussions =
      discussions &&
      discussions.filter(discussion => {
        if (discussion.pdate) {
          console.log("checkTerm", this.props.searchTerm);
          console.log("checkDate", this.props.searchDate);
          return (
            moment(discussion.pdate)
              .format("MM/DD")
              .indexOf(moment(this.props.searchTerm).format("MM/DD")) !== -1 ||
            discussion.ploc.indexOf(this.props.searchTerm) !== -1 ||
            discussion.rloc.indexOf(this.props.searchTerm) !== -1
          );
        }
        if (discussion.rdate) {
          return (
            moment(discussion.rdate[0])
              .format("MM/DD")
              .indexOf(moment(this.props.searchTerm).format("MM/DD")) !== -1 ||
            moment(discussion.rdate[1])
              .format("MM/DD")
              .indexOf(moment(this.props.searchTerm).format("MM/DD")) !== -1 ||
            discussion.ploc.indexOf(this.props.searchTerm) !== -1 ||
            discussion.rloc.indexOf(this.props.searchTerm) !== -1 ||
            discussion.vehicleType.indexOf(this.props.searchTerm) !== -1
          );
        }
        return (
          discussion.ploc.indexOf(this.props.searchTerm) !== -1 ||
          discussion.title.indexOf(this.props.searchTerm) !== -1
        );
      });

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
            {/* filterDiscussions &&
              filterDiscussions
                .filter(searchingFor(this.props.searchTerm))
                .map(discussion => { */}

            {discussions &&
              filterDiscussions.map(discussion => {
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
