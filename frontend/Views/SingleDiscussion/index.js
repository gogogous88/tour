import _ from "lodash";
import React, { Component } from "react";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import classnames from "classnames";
import moment from "moment";

import Loading from "../../Components/Loading";

import UserMenu from "../../Components/Header/UserMenu";
import appLayout from "SharedStyles/appLayout.css";

import Sidebar from "../../Components/SideBar";

import {
  getDiscussion,
  toggleFavorite,
  updateOpinionContent,
  postOpinion,
  deletePost,
  deletedDiscussionRedirect,
  deleteOpinion
} from "./actions";

import Discussion from "Components/SingleDiscussion/Discussion";
import ReplyBox from "Components/SingleDiscussion/ReplyBox";
import Opinion from "Components/SingleDiscussion/Opinion";

import styles from "./styles.css";

import keys from "../../../config/credentials";

class SingleDiscussion extends Component {
  constructor(props) {
    super(props);
    this.state = { opinionContent: "", userMenu: false };
  }

  componentDidMount() {
    const { forum, discussion } = this.props.params;

    this.props.getDiscussion(discussion);
  }

  componentDidUpdate() {
    const { deletedDiscussion, deletedDiscussionRedirect } = this.props;

    const { forum } = this.props.params;

    // check if the discussion is deleted and redirect the user
    if (deletedDiscussion) {
      browserHistory.push(`/${forum}`);
      setTimeout(() => {
        deletedDiscussionRedirect();
      }, 100);
    }
  }

  componentWillUnmount() {
    // remove any existing opinion texts
    this.props.updateOpinionContent(null);
  }

  userFavoritedDiscussion(userId, favorites) {
    let favorited = false;
    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i] === userId) favorited = true;
    }
    return favorited;
  }

  handleReplySubmit() {
    const {
      forums,
      postOpinion,
      discussion,
      opinionContent,
      userId
    } = this.props;

    const discussion_slug = this.props.params.discussion;
    const forumSlug = this.props.params.forum;
    const forumId = _.find(forums, { forum_slug: forumSlug })._id;

    postOpinion(
      {
        forum_id: forumId,
        discussion_id: discussion._id,
        user_id: userId,
        content: opinionContent
      },
      discussion_slug
    );
  }

  deleteDiscussion() {
    const { discussion } = this.props.params;
    const { deletePost } = this.props;
    deletePost(discussion);
  }

  deleteOpinion(opinionId) {
    const { discussion } = this.props.params;
    const { deleteOpinion } = this.props;
    deleteOpinion(opinionId, discussion);
  }

  renderUploadImg(discussion) {
    if (discussion.image) {
      return discussion.image;
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

      case "fa_tuan_jie_huo":
        if (discussion.sup_or_req === "提供") {
          const jieTuanURL = keys.SUP_JIE_TUAN;
          return jieTuanURL;
        } else {
          const jieTuanURL = keys.REQ_JIE_TUAN;
          return jieTuanURL;
        }

      case "market":
        if (discussion.rate) {
          const marketURL = keys.SUP_MARKET;
          return marketURL;
        } else {
          const marketURL = keys.REQ_MARKET;
          return marketURL;
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
        ).format("MM/DD")}」-「${discussion.ploc}-->${
          discussion.rloc
        }」,请与我联系，谢谢。
        `;
        return shunFengTitle;

      case "pin_fang":
        const pinFangTitle = `${discussion.sup_or_req}拼房:从「${moment(
          discussion.rdate[0]
        ).format("MM/DD")}」日-到-「${moment(discussion.rdate[1]).format(
          "MM/DD"
        )}」日--「${discussion.ploc}」,请与我联系，谢谢。
        `;
        return pinFangTitle;

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
          )}-${rloc}」结束，需要「${vehicleType}」的团，有空的导游请与我取得联系，谢谢。`;
          return faTuanTitle;
        } else {
          const faTuanTitle = `求接团，-各位大导，我从「${moment(
            rdate[0]
          ).format("MM/DD")}」到「${moment(rdate[1]).format(
            "MM/DD"
          )}」期间可以接「${ploc}」开始的团，请与我取得联系，谢谢`;
          return faTuanTitle;
        }

      case "market":
        if (discussion.rate) {
          const marketTitle = `「${discussion.ploc}」${
            discussion.sup_or_req
          }商品：「${discussion.title}」,价格「${discussion.rate}」
        `;
          return marketTitle;
        } else {
          const marketTitle = `我在「${discussion.ploc}」，想求购「${
            discussion.title
          }」,有出售的朋友请与我取得联系，谢谢。`;
          return marketTitle;
        }

      case "tour_wiki":
        return discussion.title;
      default:
        return discussion.title;
    }
  }

  renderSup = currentForum => {
    console.log("current", currentForum);
    switch (currentForum) {
      case "shun_feng_che":
        return <div>发布提供顺风车</div>;
      case "pin_fang":
        return <div>发布提供拼房</div>;
      case "market":
        return <div>发布出售信息</div>;
      case "fa_tuan_jie_huo":
        return <div>发团信息发布</div>;
      case "tour_wiki":
        return <div>发布科普信息</div>;

      default:
        return <div>发布提供信息</div>;
    }
  };

  renderReq = currentForum => {
    console.log("current", currentForum);
    switch (currentForum) {
      case "shun_feng_che":
        return <div>发布寻求顺风车</div>;
      case "pin_fang":
        return <div>发布寻求拼房</div>;
      case "market":
        return <div>发布求购信息</div>;
      case "fa_tuan_jie_huo":
        return <div>求团信息发布</div>;
      case "tour_wiki":
        return <div>发布攻略信息</div>;

      default:
        return <div>发布寻求信息</div>;
    }
  };

  render() {
    const {
      userAuthenticated,
      fetchingDiscussion,
      discussion,
      toggleFavorite,
      toggleingFavorite,
      updateOpinionContent,
      postingOpinion,
      opinionError,
      deletingOpinion,
      deletingDiscussion,
      error
    } = this.props;

    if (error) {
      return <div className={styles.errorMsg}>{error}</div>;
    }

    // return loading status if discussion is not fetched yet
    if (fetchingDiscussion) {
      return (
        <div>
          <Loading />
        </div>
      );
    }

    const {
      _id,
      content,
      date,
      favorites,
      title,
      tags,
      opinions,
      rloc,
      ploc,
      forum,
      ph_no
    } = discussion;

    const { avatarUrl, name, username } = discussion.user;

    // check if logged in user is owner of the discussion
    let allowDelete = false;
    if (
      discussion.user._id === this.props.userId ||
      this.props.userRole === "admin"
    )
      allowDelete = true;

    // check if user favorated the discussion
    const userFavorited = this.userFavoritedDiscussion(
      this.props.userId,
      favorites
    );

    const currentForum = this.props.params.forum;

    const category = { shun_feng_che: "顺风车", pin_fang: "拼房" };

    return (
      <div className={appLayout.constraintWidth}>
        <Helmet>
          <title>{`${title} | 途盖大导通`}</title>
        </Helmet>

        <Discussion
          path={this.props.location.pathname}
          forum_slug={forum.forum_slug}
          id={_id}
          userAvatar={avatarUrl}
          userName={name}
          userGitHandler={username}
          discTitle={this.renderTitle(discussion)}
          discDate={date}
          discContent={content}
          tags={tags}
          rloc={rloc}
          imageURL={this.renderImageURL(discussion)}
          favoriteCount={favorites.length}
          favoriteAction={toggleFavorite}
          userFavorited={userFavorited}
          toggleingFavorite={toggleingFavorite}
          allowDelete={allowDelete}
          deletingDiscussion={deletingDiscussion}
          deleteAction={this.deleteDiscussion.bind(this)}
          uploadImg={this.renderUploadImg(discussion)}
          phoneNo={ph_no}
        />

        {opinionError && <div className={styles.errorMsg}>{opinionError}</div>}

        {!userAuthenticated && (
          <div className={classnames(styles.signInMsg)}>
            <span>
              回复信息前请先<button
                style={{ borderBottomWidth: 1 }}
                onMouseEnter={() => {
                  this.setState({ userMenu: true });
                }}
                onClick={() => {
                  this.setState({ userMenu: true });
                }}
              >
                <span style={{ color: "blue", borderBottomWidth: 1 }}>
                  登录
                </span>
              </button>...
            </span>
            {this.state.userMenu ? <UserMenu hello={true} /> : ""}
          </div>
        )}
        {userAuthenticated && (
          <ReplyBox
            posting={postingOpinion}
            onSubmit={this.handleReplySubmit.bind(this)}
            onChange={content => {
              updateOpinionContent(content);
            }}
          />
        )}

        {opinions &&
          opinions.map(opinion => {
            return (
              <Opinion
                key={opinion._id}
                opinionId={opinion._id}
                userAvatar={opinion.user.avatarUrl}
                userName={opinion.user.name}
                userGitHandler={opinion.user.username}
                opDate={opinion.date}
                opContent={opinion.content}
                userId={opinion.user_id}
                currentUserId={this.props.userId}
                currentUserRole={this.props.userRole}
                deleteAction={this.deleteOpinion.bind(this)}
                deletingOpinion={deletingOpinion}
              />
            );
          })}

        <Sidebar
          currentForum={currentForum}
          title={{
            supTitle: this.renderSup(currentForum),
            reqTitle: this.renderReq(currentForum)
          }}
        />
      </div>
    );
  }
}

export default connect(
  state => {
    return {
      forums: state.app.forums,
      userAuthenticated: state.user.authenticated,
      userId: state.user._id,
      userRole: state.user.role,
      fetchingDiscussion: state.discussion.fetchingDiscussion,
      toggleingFavorite: state.discussion.toggleingFavorite,
      deletingDiscussion: state.discussion.deletingDiscussion,
      deletedDiscussion: state.discussion.deletedDiscussion,
      opinionContent: state.discussion.opinionContent,
      postingOpinion: state.discussion.postingOpinion,
      opinionError: state.discussion.opinionError,
      deletingOpinion: state.discussion.deletingOpinion,
      discussion: state.discussion.discussion,
      error: state.discussion.error
    };
  },
  dispatch => {
    return {
      getDiscussion: discussionSlug => {
        dispatch(getDiscussion(discussionSlug));
      },
      toggleFavorite: discussionId => {
        dispatch(toggleFavorite(discussionId));
      },
      updateOpinionContent: content => {
        dispatch(updateOpinionContent(content));
      },
      postOpinion: (opinion, discussionSlug) => {
        dispatch(postOpinion(opinion, discussionSlug));
      },
      deletePost: discussionSlug => {
        dispatch(deletePost(discussionSlug));
      },
      deletedDiscussionRedirect: () => {
        dispatch(deletedDiscussionRedirect());
      },
      deleteOpinion: (opinionId, discussionSlug) => {
        dispatch(deleteOpinion(opinionId, discussionSlug));
      }
    };
  }
)(SingleDiscussion);
