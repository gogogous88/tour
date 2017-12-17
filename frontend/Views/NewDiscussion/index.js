import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import classnames from "classnames";

import Pdate from "../../Components/FormCommon/Pdate";
import Rdate from "../../Components/FormCommon/Rdate";
import RichEditor from "Components/RichEditor";
import PinButton from "Components/NewDiscussion/PinButton";
import TagsInput from "Components/NewDiscussion/TagsInput";
import ImgUL from "../../Components/FormCommon/ImgUL";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.min";

import {
  postDiscussion,
  updateDiscussionTitle,
  updateDiscussionContent,
  updateDiscussionPinStatus,
  updateDiscussionTags,
  updateDiscussionRloc,
  updateDiscussionSup_or_req,
  updateDiscussionPloc,
  updateDiscussionPname,
  updateDiscussionImage,
  updateDiscussionVehicleType,
  updateDiscussionPh_no,
  updateDiscussionPdate,
  updateDiscussionRdate,
  updateDiscussionRate
} from "./actions";

import styles from "./styles.css";
import appLayout from "SharedStyles/appLayout.css";
import Sup_or_req from "../../Components/FormCommon/Sup_or_req";

import "react-dates/lib/css/_datepicker.css";

class NewDiscussion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forumId: null,
      userId: null,
      fatalError: null
    };
  }

  componentDidMount() {
    const { user, currentForum, forums } = this.props;

    this.setUserAndForumID(user, forums, currentForum);
  }

  componentWillReceiveProps(nextProps) {
    const { user, currentForum, forums } = nextProps;

    this.setUserAndForumID(user, forums, currentForum);
  }

  setUserAndForumID(user, forums, currentForum) {
    const forumId = _.find(forums, { forum_slug: currentForum });
    if (forumId) {
      const currentForumId = forumId._id;
      this.setState({
        forumId: currentForumId,
        userId: user._id
      });
    } else {
      this.setState({
        fatalError: "Invalid forum buddy, go for the right one!"
      });
    }
  }

  renderEditor() {
    const { authenticated, role } = this.props.user;

    const {
      updateDiscussionTitle,
      updateDiscussionContent,
      updateDiscussionPinStatus,
      updateDiscussionTags,
      updateDiscussionRloc,
      updateDiscussionSup_or_req,
      updateDiscussionPloc,
      updateDiscussionVehicleType,
      updateDiscussionPname,
      updateDiscussionImage,
      updateDiscussionPh_no,
      updateDiscussionRate,
      updateDiscussionRdate,
      updateDiscussionPdate,
      postDiscussion,
      currentForum
    } = this.props;

    const {
      title,
      content,
      rloc,
      sup_or_req,
      ploc,
      rdate,
      pname,
      image,
      vehicleType,
      ph_no,
      rate,
      pdate,
      tags,
      pinned
    } = this.props.newDiscussion;

    const { forumId, userId } = this.state;

    // only show the editor when user is authenticated
    if (authenticated) {
      switch (forumId) {
        //以下顺风车
        case "5a319a5c10cea7360a06287d":
          return [
            role === "admin" && (
              <PinButton
                key={"pinned"}
                value={pinned}
                onChange={value => {
                  updateDiscussionPinStatus(value);
                }}
              />
            ),

            <input
              key={"ploc"}
              type="text"
              className={styles.titleInput}
              placeholder={"请填写起点城市......"}
              value={ploc}
              onChange={event => updateDiscussionPloc(event.target.value)}
            />,

            <input
              key={"rloc"}
              type="text"
              className={styles.titleInput}
              placeholder={"请填写终点城市......"}
              value={rloc}
              onChange={event => updateDiscussionRloc(event.target.value)}
            />,

            <Pdate
              key={"pdate"}
              value={pdate}
              onChange={value => updateDiscussionPdate(value)}
            />,

            <Sup_or_req
              key={"sup_or_req"}
              value={sup_or_req}
              title="您是提供拼车还是寻求拼车？"
              onChange={value => {
                updateDiscussionSup_or_req(value);
              }}
            />,

            <RichEditor
              key={"content"}
              type="newDiscussion"
              value={content}
              onChange={value => {
                updateDiscussionContent(value);
              }}
              onSave={() => {
                postDiscussion(userId, forumId, currentForum);
              }}
            />
          ];
          {
            /* //以上顺风车
        //以下拼房 */
          }
        case "5a319a6e10cea7360a06287e":
          return [
            role === "admin" && (
              <PinButton
                key={"pinned"}
                value={pinned}
                onChange={value => {
                  updateDiscussionPinStatus(value);
                }}
              />
            ),
            <input
              key={"ploc"}
              type="text"
              className={styles.titleInput}
              placeholder={"请填写夜宿城市......"}
              value={ploc}
              onChange={event => updateDiscussionPloc(event.target.value)}
            />,

            <Rdate
              key={"rdate"}
              value={rdate}
              onChange={value => updateDiscussionRdate(value)}
            />,

            <Sup_or_req
              key={"sup_or_req"}
              value={sup_or_req}
              title="您是提供拼房还是寻求拼房？"
              onChange={value => {
                updateDiscussionSup_or_req(value);
              }}
            />,

            <RichEditor
              key={"content"}
              type="newDiscussion"
              value={content}
              onChange={value => {
                updateDiscussionContent(value);
              }}
              onSave={() => {
                postDiscussion(userId, forumId, currentForum);
              }}
            />
          ];
          {
            /* //以上拼房
        //以下接活 */
          }
        case "5a319a9310cea7360a06287f":
          return [
            role === "admin" && (
              <PinButton
                key={"pinned"}
                value={pinned}
                onChange={value => {
                  updateDiscussionPinStatus(value);
                }}
              />
            ),
            <input
              key={"rloc"}
              type="text"
              className={styles.titleInput}
              placeholder={"请填写开始地......"}
              value={rloc}
              onChange={event => updateDiscussionRloc(event.target.value)}
            />,

            <Rdate
              key={"rdate"}
              className={styles.dateInput}
              placeholder={"请选择接团日期区间......"}
              value={rdate}
              onChange={value => updateDiscussionRdate(value)}
            />,

            <Sup_or_req
              key={"sup_or_req"}
              value={sup_or_req}
              title="您是求活儿还是提供团"
              onChange={value => {
                updateDiscussionSup_or_req(value);
              }}
            />,

            <ImgUL
              key={"image"}
              value={image}
              onChange={value => {
                updateDiscussionImage(value);
              }}
            />,

            <RichEditor
              key={"content"}
              type="newDiscussion"
              value={content}
              onChange={value => {
                updateDiscussionContent(value);
              }}
              onSave={() => {
                postDiscussion(userId, forumId, currentForum);
              }}
            />
          ];
          {
            /* //以上接活
        //以下二手市场 */
          }
        case "5a319aaa10cea7360a062880":
          return [
            role === "admin" && (
              <PinButton
                key={"pinned"}
                value={pinned}
                onChange={value => {
                  updateDiscussionPinStatus(value);
                }}
              />
            ),
            <input
              key={"ploc"}
              type="text"
              className={styles.titleInput}
              placeholder={"商品所在地......"}
              value={ploc}
              onChange={event => updateDiscussionPloc(event.target.value)}
            />,

            <input
              key={"title"}
              type="text"
              className={styles.titleInput}
              placeholder={"商品名"}
              value={title}
              onChange={event => {
                updateDiscussionTitle(event.target.value);
              }}
            />,

            <input
              key={"rate"}
              type="text"
              className={styles.titleInput}
              placeholder={"价格"}
              value={rate}
              onChange={event => updateDiscussionRate(event.target.value)}
            />,

            <Sup_or_req
              key={"sup_or_req"}
              value={sup_or_req}
              title="出售还是求购？"
              onChange={value => {
                updateDiscussionSup_or_req(value);
              }}
            />,

            <ImgUL
              key={"image"}
              value={image}
              onChange={value => {
                updateDiscussionImage(value);
              }}
            />,

            <RichEditor
              key={"content"}
              type="newDiscussion"
              value={content}
              onChange={value => {
                updateDiscussionContent(value);
              }}
              onSave={() => {
                postDiscussion(userId, forumId, currentForum);
              }}
            />
          ];

          {
            /* //以上二手市场
        //以下默认 */
          }

        default:
          return [
            <input
              key={"sup_or_req"}
              type="text"
              className={styles.titleInput}
              placeholder={"提供还是需求"}
              value={sup_or_req}
              onChange={event => updateDiscussionSup_or_req(event.target.value)}
            />,
            <input
              key={"ploc"}
              type="text"
              className={styles.titleInput}
              placeholder={"出发城市"}
              value={ploc}
              onChange={event => updateDiscussionPloc(event.target.value)}
            />,

            <input
              key={"rloc"}
              type="text"
              className={styles.titleInput}
              placeholder={"抵达城市"}
              value={rloc}
              onChange={event => updateDiscussionRloc(event.target.value)}
            />,
            <input
              key={"pdate"}
              type="text"
              className={styles.titleInput}
              placeholder={"出发日期"}
              value={pdate}
              onChange={event => updateDiscussionPdate(event.target.value)}
            />,

            <input
              key={"pname"}
              type="text"
              className={styles.titleInput}
              placeholder={"联系人"}
              value={pname}
              onChange={event => updateDiscussionPname(event.target.value)}
            />,

            <ImgUL
              key={"image"}
              value={image}
              onChange={value => {
                updateDiscussionImage(value);
              }}
            />,
            <input
              key={"ph_no"}
              type="text"
              className={styles.titleInput}
              placeholder={"联系电话"}
              value={ph_no}
              onChange={event => updateDiscussionPh_no(event.target.value)}
            />,
            <input
              key={"rdate"}
              type="text"
              className={styles.titleInput}
              placeholder={"出住日期"}
              value={rdate}
              onChange={event => updateDiscussionRdate(event.target.value)}
            />,
            <input
              key={"title"}
              type="text"
              className={styles.titleInput}
              placeholder={"Discussion title......"}
              value={title}
              onChange={event => {
                updateDiscussionTitle(event.target.value);
              }}
            />,

            <input
              key={"vehicleType"}
              type="text"
              className={styles.titleInput}
              placeholder={"请填写车型"}
              value={vehicleType}
              onChange={event =>
                updateDiscussionVehicleType(event.target.value)
              }
            />,
            role === "admin" && (
              <PinButton
                key={"pinned"}
                value={pinned}
                onChange={value => {
                  updateDiscussionPinStatus(value);
                }}
              />
            ),

            <TagsInput
              key={"tags"}
              value={tags}
              onChange={tags => {
                updateDiscussionTags(tags);
              }}
            />,
            <RichEditor
              key={"content"}
              type="newDiscussion"
              value={content}
              onChange={value => {
                updateDiscussionContent(value);
              }}
              onSave={() => {
                postDiscussion(userId, forumId, currentForum);
              }}
            />
          ];
      }
    }

    return (
      <div className={classnames(appLayout.constraintWidth, styles.signInMsg)}>
        Please sign in before posting a new discussion.
      </div>
    );
  }

  render() {
    const { fatalError } = this.state;

    if (fatalError) {
      return (
        <div className={classnames(styles.errorMsg, styles.fatalError)}>
          {fatalError}
        </div>
      );
    }

    const { currentForum } = this.props;
    const {
      errorMsg,
      postingSuccess,
      postingDiscussion
    } = this.props.newDiscussion;

    return (
      <div className={classnames(appLayout.constraintWidth, styles.content)}>
        <Helmet>
          <title>ReForum | New Discussion</title>
        </Helmet>

        <div className={styles.forumInfo}>
          You are creating a new discussion on{" "}
          <span className={styles.forumName}>{currentForum}</span> forum.
        </div>
        <div className={styles.errorMsg}>{errorMsg}</div>
        {postingSuccess && (
          <div className={styles.successMsg}>
            Your discussion is created :-)
          </div>
        )}
        {this.renderEditor()}
        {postingDiscussion && (
          <div className={styles.postingMsg}>Posting discussion...</div>
        )}
      </div>
    );
  }
}

export default connect(
  state => {
    return {
      user: state.user,
      forums: state.app.forums,
      currentForum: state.app.currentForum,
      newDiscussion: state.newDiscussion
    };
  },
  dispatch => {
    return {
      postDiscussion: (userId, forumId, currentForum) => {
        dispatch(postDiscussion(userId, forumId, currentForum));
      },
      updateDiscussionTitle: value => {
        dispatch(updateDiscussionTitle(value));
      },
      updateDiscussionContent: value => {
        dispatch(updateDiscussionContent(value));
      },
      updateDiscussionPinStatus: value => {
        dispatch(updateDiscussionPinStatus(value));
      },
      updateDiscussionTags: value => {
        dispatch(updateDiscussionTags(value));
      },
      updateDiscussionRloc: value => {
        dispatch(updateDiscussionRloc(value));
      },
      updateDiscussionPloc: value => {
        dispatch(updateDiscussionPloc(value));
      },

      updateDiscussionPname: value => {
        dispatch(updateDiscussionPname(value));
      },
      updateDiscussionImage: value => {
        dispatch(updateDiscussionImage(value));
      },
      updateDiscussionVehicleType: value => {
        dispatch(updateDiscussionVehicleType(value));
      },
      updateDiscussionPh_no: value => {
        dispatch(updateDiscussionPh_no(value));
      },
      updateDiscussionRate: value => {
        dispatch(updateDiscussionRate(value));
      },
      updateDiscussionRdate: value => {
        dispatch(updateDiscussionRdate(value));
      },
      updateDiscussionPdate: value => {
        dispatch(updateDiscussionPdate(value));
      },
      updateDiscussionSup_or_req: value => {
        dispatch(updateDiscussionSup_or_req(value));
      }
    };
  }
)(NewDiscussion);
