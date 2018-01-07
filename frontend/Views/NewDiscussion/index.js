//「 」【】
import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import classnames from "classnames";
import moment from "moment";

import Pdate from "../../Components/FormCommon/Pdate";
import Rdate from "../../Components/FormCommon/Rdate";
import RichEditor from "Components/RichEditor";
import PinButton from "Components/NewDiscussion/PinButton";
import TagsInput from "Components/NewDiscussion/TagsInput";
import ImgUL from "../../Components/FormCommon/ImgUL";

import Loading from "../../Components/Loading";

// import DraftEditor from "../../components/DraftEditor/DraftEditor";

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
      fatalError: null,
      sup_or_req: this.props.route.sup_or_req
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
      pinned,
      errorMsg
    } = this.props.newDiscussion;

    const { forumId, userId } = this.state;

    // only show the editor when user is authenticated
    if (authenticated) {
      switch (forumId) {
        //以下顺风车
        case "5a319a5c10cea7360a06287d":
          return (
            <div>
              {role === "admin" && (
                <PinButton
                  key={"pinned"}
                  value={pinned}
                  onChange={value => {
                    updateDiscussionPinStatus(value);
                  }}
                />
              )}
              <div className="row">
                <div className="col s12">
                  <div className="row">
                    <Sup_or_req
                      key={"sup_or_req"}
                      value={this.state.sup_or_req}
                      title="顺风车"
                      onHave={value => {
                        updateDiscussionSup_or_req(value);
                      }}
                    />
                  </div>
                  <div className={styles.rowContainer}>
                    <div className="col s6">
                      <label>请填写出发地：</label>
                      <input
                        className="validate"
                        id="ploc"
                        key={"ploc"}
                        type="text"
                        className={styles.titleInput}
                        placeholder={"例如:华盛顿/纽约......"}
                        value={ploc}
                        onChange={event =>
                          updateDiscussionPloc(event.target.value)
                        }
                      />
                    </div>

                    <div className="col s6">
                      <label>请填写抵达地：</label>
                      <input
                        className="validate"
                        id="rloc"
                        key={"rloc"}
                        type="text"
                        className={styles.titleInput}
                        placeholder={"例如:旧金山/拉斯......"}
                        value={rloc}
                        onChange={event =>
                          updateDiscussionRloc(event.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.rowContainer}>
                    <div className="col s6">
                      <label>请选择出发日期：</label>
                      <Pdate
                        key={"pdate"}
                        value={pdate}
                        onChange={value => updateDiscussionPdate(value)}
                      />
                    </div>
                    <div className="col s6">
                      <label>请填写联系电话：</label>
                      <input
                        className="validate"
                        id="ph_no"
                        key={"ph_no"}
                        type="text"
                        className={styles.titleInput}
                        placeholder={"如：718-314-7879"}
                        value={ph_no}
                        onChange={event =>
                          updateDiscussionPh_no(event.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div style={{ paddingLeft: 10, marginTop: 20 }}>
                    <p style={{ fontSize: 18, paddingLeft: 10 }}>标题预览：</p>
                    <p style={{ fontSize: 16, paddingLeft: 20 }}>
                      {sup_or_req}「{moment(pdate).format("MM/DD")}」从「{ploc}」到「{
                        rloc
                      }」的顺风车，我的联系电话是:「{ph_no}」<span
                        className={styles.errorMsg}
                      >
                        {errorMsg}
                      </span>
                    </p>
                  </div>
                  <div
                    style={{ marginTop: 50, marginLeft: 15, marginRight: 15 }}
                  >
                    <button
                      type="button"
                      className="btn btn-primary btn-lg btn-block red lignten-3"
                      onClick={() => {
                        postDiscussion(userId, forumId, currentForum);
                      }}
                    >
                      点击发布
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
          {
            /* //以上顺风车
        //以下拼房 */
          }

        case "5a319a6e10cea7360a06287e":
          return (
            <div>
              {role === "admin" && (
                <PinButton
                  key={"pinned"}
                  value={pinned}
                  onChange={value => {
                    updateDiscussionPinStatus(value);
                  }}
                />
              )}
              <div className="row">
                <div className="col s12">
                  <div className="row">
                    <Sup_or_req
                      key={"sup_or_req"}
                      value={this.state.sup_or_req}
                      title="拼房"
                      onHave={value => {
                        updateDiscussionSup_or_req(value);
                      }}
                    />
                  </div>
                  <div className="row">
                    <div className="col s12">
                      <label>请选择入住日期-出住日期：</label>

                      <Rdate
                        key={"rdate"}
                        value={rdate}
                        onChange={value => updateDiscussionRdate(value)}
                      />
                    </div>
                  </div>

                  <div className={styles.rowContainer}>
                    <div className="col s6">
                      <label>请填写夜宿地：</label>
                      <input
                        key={"ploc"}
                        type="text"
                        className={styles.titleInput}
                        placeholder={"请填写夜宿城市......"}
                        value={ploc}
                        onChange={event =>
                          updateDiscussionPloc(event.target.value)
                        }
                      />
                    </div>
                    <div className="col s6">
                      <label>请填写联系电话：</label>
                      <input
                        className="validate"
                        id="ph_no"
                        key={"ph_no"}
                        type="text"
                        className={styles.titleInput}
                        placeholder={"如：718-314-7879"}
                        value={ph_no}
                        onChange={event =>
                          updateDiscussionPh_no(event.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div style={{ paddingLeft: 10, marginTop: 20 }}>
                    <p style={{ fontSize: 18, paddingLeft: 10 }}>标题预览：</p>
                    <p style={{ fontSize: 16, paddingLeft: 20 }}>
                      {sup_or_req}「{ploc}」从「{moment(rdate[0]).format(
                        "MM/DD"
                      )}」入住，到「{moment(rdate[1]).format("MM/DD")}」出住的拼房，我的联系电话是:「{
                        ph_no
                      }」
                      <span className={styles.errorMsg}>{errorMsg}</span>
                    </p>
                  </div>
                  <div
                    style={{ marginTop: 50, marginLeft: 15, marginRight: 15 }}
                  >
                    <button
                      type="button"
                      className="btn btn-primary btn-lg btn-block red lignten-3"
                      onClick={() => {
                        postDiscussion(userId, forumId, currentForum);
                      }}
                    >
                      点击发布
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );

          {
            /* //以上拼房
        //以下接活 */
          }
        case "5a319a9310cea7360a06287f":
          if (this.props.route.sup_or_req === "寻求") {
            return (
              <div>
                {role === "admin" && (
                  <PinButton
                    key={"pinned"}
                    value={pinned}
                    onChange={value => {
                      updateDiscussionPinStatus(value);
                    }}
                  />
                )}

                <div className="row">
                  <div className="col s12">
                    <div className="row">
                      <Sup_or_req
                        key={"sup_or_req"}
                        value={this.state.sup_or_req}
                        title="接活"
                        onHave={value => {
                          updateDiscussionSup_or_req(value);
                        }}
                      />
                    </div>
                    <div className="row">
                      <div className="col s12">
                        <label>我可以带团的期间：</label>
                        <Rdate
                          key={"rdate"}
                          className={styles.dateInput}
                          value={rdate}
                          onChange={value => updateDiscussionRdate(value)}
                        />
                      </div>
                    </div>

                    <div className={styles.rowContainer}>
                      <div className="col s6">
                        <label>我的位置：</label>
                        <input
                          key={"ploc"}
                          type="text"
                          className={styles.titleInput}
                          placeholder={"期间可以接团的城市"}
                          value={ploc}
                          onChange={event =>
                            updateDiscussionPloc(event.target.value)
                          }
                        />
                      </div>
                      <div className="col s6">
                        <label>请填写联系电话：</label>
                        <input
                          className="validate"
                          id="ph_no"
                          key={"ph_no"}
                          type="text"
                          className={styles.titleInput}
                          placeholder={"如：718-314-7879"}
                          value={ph_no}
                          onChange={event =>
                            updateDiscussionPh_no(event.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div style={{ paddingLeft: 10, marginTop: 20 }}>
                      <p style={{ fontSize: 18, paddingLeft: 10 }}>
                        标题预览：
                      </p>
                      <p style={{ fontSize: 16, paddingLeft: 20 }}>
                        「{sup_or_req}接团」-各位大导，我从「{moment(
                          rdate[0]
                        ).format("MM/DD")}」到「{moment(rdate[1]).format(
                          "MM/DD"
                        )}」期间可以接「{ploc}」开始的团，我的联系电话是:「{
                          ph_no
                        }」<span className={styles.errorMsg}>{errorMsg}</span>
                      </p>
                    </div>
                    <div
                      style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}
                    >
                      <RichEditor
                        key={"content"}
                        type="newDiscussion"
                        value={content}
                        contentInput={"您可以填写有关您的更多信息..."}
                        onChange={value => {
                          updateDiscussionContent(value);
                        }}
                        onSave={() => {
                          postDiscussion(
                            userId,
                            forumId,
                            currentForum,
                            sup_or_req
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* <label>上传一些图片:(如评价单等)</label>
                <ImgUL
                  key={"image"}
                  value={image}
                  onChange={value => {
                    updateDiscussionImage(value);
                  }}
                /> */}
              </div>
            );
            // 以上是求集团;
          } else {
            return (
              <div>
                {role === "admin" && (
                  <PinButton
                    key={"pinned"}
                    value={pinned}
                    onChange={value => {
                      updateDiscussionPinStatus(value);
                    }}
                  />
                )}

                <div className="row">
                  <div className="col s12">
                    <div className="row">
                      <Sup_or_req
                        key={"sup_or_req"}
                        value={this.state.sup_or_req}
                        title="团目"
                        onHave={value => {
                          updateDiscussionSup_or_req(value);
                        }}
                      />
                    </div>
                    <div className="row">
                      <div className="col s12">
                        <label>请选择团目开始及团目结束的时间：</label>
                        <Rdate
                          key={"rdate"}
                          className={styles.dateInput}
                          value={rdate}
                          onChange={value => updateDiscussionRdate(value)}
                        />
                      </div>
                    </div>

                    <div className={styles.rowContainer}>
                      <div className="col s6">
                        <label>填写团目的接机(开始)地：</label>
                        <input
                          key={"ploc"}
                          type="text"
                          className={styles.titleInput}
                          placeholder={"接机(开始)城市"}
                          value={ploc}
                          onChange={event =>
                            updateDiscussionPloc(event.target.value)
                          }
                        />
                      </div>
                      <div className="col s6">
                        <label>填写团目的结束(送机)地：</label>
                        <input
                          key={"rloc"}
                          type="text"
                          className={styles.titleInput}
                          placeholder={"送机(结束)城市"}
                          value={rloc}
                          onChange={event =>
                            updateDiscussionRloc(event.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className={styles.rowContainer}>
                      <div className="col s6">
                        <label>填写团目的用车类型：</label>
                        <input
                          key={"vehicleType"}
                          type="text"
                          className={styles.titleInput}
                          placeholder={"请填写车型"}
                          value={vehicleType}
                          onChange={event =>
                            updateDiscussionVehicleType(event.target.value)
                          }
                        />
                      </div>
                      <div className="col s6">
                        <label>请填写联系电话或email：</label>
                        <input
                          className="validate"
                          id="ph_no"
                          key={"ph_no"}
                          type="text"
                          className={styles.titleInput}
                          placeholder={"如：718-314-7879"}
                          value={ph_no}
                          onChange={event =>
                            updateDiscussionPh_no(event.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div style={{ paddingLeft: 10, marginTop: 20 }}>
                      <p style={{ fontSize: 18, paddingLeft: 10 }}>
                        标题预览：
                      </p>
                      <p style={{ fontSize: 16, paddingLeft: 20 }}>
                        「{sup_or_req}发团」-各位大导，「{moment(
                          rdate[0]
                        ).format("MM/DD")}」到「{moment(rdate[1]).format(
                          "MM/DD"
                        )}」期间有一个「{ploc}」开始「{rloc}」结束，需要「{
                          vehicleType
                        }」的团，我的联系电话是:「{ph_no}」,有空的导游请与我取得联系，谢谢。<span
                          className={styles.errorMsg}
                        >
                          {errorMsg}
                        </span>
                      </p>
                    </div>
                    <div
                      style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}
                    >
                      <RichEditor
                        key={"content"}
                        type="newDiscussion"
                        value={content}
                        contentInput={"您可以填写有关您的更多信息..."}
                        onChange={value => {
                          updateDiscussionContent(value);
                        }}
                        onSave={() => {
                          postDiscussion(userId, forumId, currentForum);
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* <label>上传一些图片:(如评价单等)</label>
                <ImgUL
                  key={"image"}
                  value={image}
                  onChange={value => {
                    updateDiscussionImage(value);
                  }}
                /> */}
              </div>
            );
          }
          {
            /* //以上发团
        //以下二手市场 */
          }
        case "5a319aaa10cea7360a062880":
          if (this.props.route.sup_or_req === "提供") {
            return (
              <div>
                {role === "admin" && (
                  <PinButton
                    key={"pinned"}
                    value={pinned}
                    onChange={value => {
                      updateDiscussionPinStatus(value);
                    }}
                  />
                )}
                <div className="row">
                  <div className="col s12">
                    <div className="row">
                      <Sup_or_req
                        key={"sup_or_req"}
                        value={this.state.sup_or_req}
                        title="/出售商品"
                        onHave={value => {
                          updateDiscussionSup_or_req(value);
                        }}
                      />
                    </div>
                    <div className={styles.rowContainer}>
                      <div className="col s6">
                        <label>请填写商品所在地：</label>
                        <input
                          key={"ploc"}
                          type="text"
                          className={styles.titleInput}
                          placeholder={"商品所在地......"}
                          value={ploc}
                          onChange={event =>
                            updateDiscussionPloc(event.target.value)
                          }
                        />
                      </div>
                      <div className="col s6">
                        <label>请填写商品名称：</label>
                        <input
                          key={"title"}
                          type="text"
                          className={styles.titleInput}
                          placeholder={"商品名"}
                          value={title}
                          onChange={event => {
                            updateDiscussionTitle(event.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className={styles.rowContainer}>
                      <div className="col s6">
                        <label>请填写商品价格：</label>
                        <input
                          key={"rate"}
                          type="text"
                          className={styles.titleInput}
                          placeholder={"价格"}
                          value={rate}
                          onChange={event =>
                            updateDiscussionRate(event.target.value)
                          }
                        />
                      </div>
                      <div className="col s6">
                        <label>请填写联系电话或email：</label>
                        <input
                          className="validate"
                          id="ph_no"
                          key={"ph_no"}
                          type="text"
                          className={styles.titleInput}
                          placeholder={"如：718-314-7879"}
                          value={ph_no}
                          onChange={event =>
                            updateDiscussionPh_no(event.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col s12">
                  <ImgUL
                    key={"image"}
                    value={image}
                    onChange={value => {
                      updateDiscussionImage(value);
                    }}
                  />
                </div>
                <div style={{ paddingLeft: 10, marginTop: 20 }}>
                  <p style={{ fontSize: 18, paddingLeft: 10 }}>标题预览：</p>
                  <p style={{ fontSize: 16, paddingLeft: 20 }}>
                    我在「{ploc}」，出售「{title}」,价格「{rate}」,我的联系电话是:「{
                      ph_no
                    }」,有需要的朋友请与我取得联系，谢谢。<span
                      className={styles.errorMsg}
                    >
                      {errorMsg}
                    </span>
                  </p>
                </div>
                <div className="col s12">
                  <RichEditor
                    key={"content"}
                    type="newDiscussion"
                    value={content}
                    contentInput={
                      "商品具体信息(如新旧程度，如果是车辆请记得填写英里信息)"
                    }
                    onChange={value => {
                      updateDiscussionContent(value);
                    }}
                    onSave={() => {
                      postDiscussion(userId, forumId, currentForum);
                    }}
                  />
                </div>
              </div>
            );
          }
          return (
            <div>
              {role === "admin" && (
                <PinButton
                  key={"pinned"}
                  value={pinned}
                  onChange={value => {
                    updateDiscussionPinStatus(value);
                  }}
                />
              )}
              <div className="row">
                <div className="col s12">
                  <div className="row">
                    <Sup_or_req
                      key={"sup_or_req"}
                      value={this.state.sup_or_req}
                      title="/求购商品"
                      onHave={value => {
                        updateDiscussionSup_or_req(value);
                      }}
                    />
                  </div>
                  <div className={styles.rowContainer}>
                    <div className="col s6">
                      <label>您的城市：</label>
                      <input
                        key={"ploc"}
                        type="text"
                        className={styles.titleInput}
                        placeholder={"例如旧金山..."}
                        value={ploc}
                        onChange={event =>
                          updateDiscussionPloc(event.target.value)
                        }
                      />
                    </div>
                    <div className="col s6">
                      <label>求购商品：</label>
                      <input
                        key={"title"}
                        type="text"
                        className={styles.titleInput}
                        placeholder={"商品名"}
                        value={title}
                        onChange={event => {
                          updateDiscussionTitle(event.target.value);
                        }}
                      />
                    </div>
                    <div className="col s6">
                      <label>联系电话或邮箱：</label>
                      <input
                        className="validate"
                        id="ph_no"
                        key={"ph_no"}
                        type="text"
                        className={styles.titleInput}
                        placeholder={"如：718-314-7879"}
                        value={ph_no}
                        onChange={event =>
                          updateDiscussionPh_no(event.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ paddingLeft: 10, marginTop: 20 }}>
                <p style={{ fontSize: 18, paddingLeft: 10 }}>标题预览：</p>
                <p style={{ fontSize: 16, paddingLeft: 20 }}>
                  我在「{ploc}」，想求购「{title}」,我的联系电话是:「{ph_no}」,有出售的朋友请与我取得联系，谢谢。{
                    errorMsg
                  }
                </p>
              </div>
              <div className="col s12">
                <RichEditor
                  key={"content"}
                  type="newDiscussion"
                  value={content}
                  contentInput={"具体需求"}
                  onChange={value => {
                    updateDiscussionContent(value);
                  }}
                  onSave={() => {
                    postDiscussion(userId, forumId, currentForum);
                  }}
                />
              </div>
            </div>
          );

          {
            /* //以上二手市场
        //以下百科 */
          }
        case "5a43f499ca420fd7dfe6e5ad":
          return (
            <div>
              <div className="col s12">
                <label>请输入标题</label>
                <input
                  key={"title"}
                  type="text"
                  className={styles.titleInput}
                  placeholder={"标题"}
                  value={title}
                  onChange={event => {
                    updateDiscussionTitle(event.target.value);
                  }}
                />
              </div>
              <TagsInput
                key={"tags"}
                value={tags}
                onChange={tags => {
                  updateDiscussionTags(tags);
                }}
              />
              <div className="col s12">
                <ImgUL
                  key={"image"}
                  value={image}
                  onChange={value => {
                    updateDiscussionImage(value);
                  }}
                />
              </div>
              <div style={{ paddingLeft: 10, marginTop: 20 }}>
                <p style={{ fontSize: 18, paddingLeft: 10 }}>标题预览：</p>
                <p style={{ fontSize: 16, paddingLeft: 20 }}>
                  {title}:<span className={styles.errorMsg}>{errorMsg}</span>
                </p>
              </div>
              <div className="col s12">
                <RichEditor
                  key={"content"}
                  type="newDiscussion"
                  value={content}
                  contentInput={"具体信息..."}
                  onChange={value => {
                    updateDiscussionContent(value);
                  }}
                  onSave={() => {
                    postDiscussion(userId, forumId, currentForum);
                  }}
                />
              </div>

              {/* <DraftEditor
                key={"content"}
                type="newDiscussion"
                value={content}
                onChange={value => {
                  updateDiscussionContent(value);
                }}
                onSave={() => {
                  postDiscussion(userId, forumId, currentForum);
                }}
              /> */}
            </div>
          );
          {
            /* //以上百科
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
        发布信息前请先登录...
      </div>
    );
  }

  // renderForumTitle() {
  //   switch (this.props.currentForum) {
  //     case "shun_feng_che":
  //       return (
  //         <div>
  //           你正在发布一个
  //           <span className={styles.forumName}>顺风车</span>
  //           信息
  //         </div>
  //       );

  //     default:
  //       return this.props.currentForum;
  //   }
  // }

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
          <title>途盖大导通 | New Discussion</title>
        </Helmet>

        {/* <div className={styles.forumInfo}>{this.renderForumTitle()}</div> */}

        {postingSuccess && (
          <div className={styles.successMsg}>您的信息已发布 :-)</div>
        )}
        {this.renderEditor()}
        {postingDiscussion && (
          <div className={styles.postingMsg}>
            <div>
              <Loading />
            </div>发布中...
          </div>
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
