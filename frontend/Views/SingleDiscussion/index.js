import _ from "lodash";
import React, { Component } from "react";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import classnames from "classnames";
import moment from "moment";

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
        <div className={styles.loadingWrapper}>Loading discussion ...</div>
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
        />

        {opinionError && <div className={styles.errorMsg}>{opinionError}</div>}

        {!userAuthenticated && (
          <div className={styles.signInMsg}>
            Please sign in to post a reply.
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
