import _ from "lodash";
import React, { Component } from "react";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import classnames from "classnames";
import moment from "moment";

import Loading from "../../Components/Loading";

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
import appLayout from "SharedStyles/appLayout.css";

import keys from "../../../config/credentials";

class SingleDiscussion extends Component {
  constructor(props) {
    super(props);
    this.state = { opinionContent: "" };
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
        ).format("MM/DD")}」-【${discussion.ploc}至${
          discussion.rloc
        },联系方式：「${discussion.ph_no}」
        `;
        return shunFengTitle;

      case "pin_fang":
        const pinFangTitle = `${discussion.sup_or_req}拼房:从「${moment(
          discussion.rdate[0]
        ).format("MM/DD")}」日-到-「${moment(discussion.rdate[1]).format(
          "MM/DD"
        )}」日--「${discussion.ploc}」,联系方式：「${discussion.ph_no}」
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

      case "market":
        if (discussion.rate) {
          const marketTitle = `「${discussion.ploc}」${
            discussion.sup_or_req
          }商品：「${discussion.title}」,价格「${
            discussion.rate
          }」,联系方式：「${discussion.ph_no}」
        `;
          return marketTitle;
        } else {
          const marketTitle = `我在「${discussion.ploc}」，想求购「${
            discussion.title
          }」,我的联系电话是:「${
            discussion.ph_no
          }」,有出售的朋友请与我取得联系，谢谢。`;
          return marketTitle;
        }

      case "tour_wiki":
        return discussion.title;
      default:
        return discussion.title;
    }
  }

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
      forum
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

    console.log(forum.forum_slug);

    return (
      <div className={appLayout.constraintWidth}>
        <Helmet>
          <title>{`${title} | ReForum`}</title>
        </Helmet>

        <Discussion
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
        />

        {opinionError && <div className={styles.errorMsg}>{opinionError}</div>}

        {!userAuthenticated && (
          <div className={styles.signInMsg}>请再登录后回复...</div>
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
