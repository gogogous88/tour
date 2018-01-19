import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import classnames from "classnames";
import _ from "lodash";
import moment from "moment";

import {
  getDiscussions,
  getPinnedDiscussions,
  updateSortingMethod
} from "./actions";

import Button from "Components/Button";
import FeedBox from "Components/FeedBox";
import SideBar from "Components/SideBar";
import Search from "../CarRental/search/Search";

import appLayout from "SharedStyles/appLayout.css";
import styles from "./styles.css";

import { SingleDatePicker } from "react-dates";
import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION
} from "react-dates/constants";
import "react-dates/initialize";

import "react-dates/lib/css/_datepicker.css";

const DEFAULT_PICKUP_DAY_FROM_NOW_OFFSET = ""; // default pickup/return date is next Friday/Sunday

class ForumFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      searchTerm: "",
      pickDate: moment().day(DEFAULT_PICKUP_DAY_FROM_NOW_OFFSET),

      overlayVisible: false,
      currentDateKey: "",
      // searchDate: moment().day(DEFAULT_PICKUP_DAY_FROM_NOW_OFFSET),
      searchTermStatus: false,
      searchDateStatus: false,

      searchStatus: true,
      zIndex: 99
    };
  }

  componentDidMount() {
    const {
      currentForumId,
      getDiscussions,
      getPinnedDiscussions,
      location
    } = this.props;

    // get the discussions and pinned discussions
    getDiscussions(currentForumId());
    getPinnedDiscussions(currentForumId());
    this.searchBy();
  }

  searchBy() {
    const { location } = this.props;
    if (location.search === "?search=date") {
      this.setState({ searchDateStatus: true, searchTermStatus: false });
    } else if (location.search === "?search=word") {
      this.setState({ searchDateStatus: false, searchTermStatus: true });
    } else {
      return null;
    }
  }

  componentWillReceiveProps() {
    //looks like not work but componentDidUpdate work
  }

  searchStateSwitcher() {
    const { location } = this.props;
    if (location.search === "?search=date") {
      this.setState({ searchDateStatus: true, searchTermStatus: false });
    } else if (location.search === "?search=word") {
      this.setState({ searchDateStatus: false, searchTermStatus: true });
    } else {
      return null;
    }
  }

  feedByForum(prevProps) {
    const {
      currentForum,
      currentForumId,
      getDiscussions,
      getPinnedDiscussions
    } = this.props;

    // get the discussions again
    // if the forum didn't matched

    if (prevProps.location.search != location.search) {
      this.searchStateSwitcher();
    }

    if (prevProps.currentForum !== currentForum) {
      const feedChanged = true;
      getDiscussions(currentForumId(), feedChanged);

      getPinnedDiscussions(currentForumId(), feedChanged);
    }
  }

  componentDidUpdate(prevProps) {
    this.feedByForum(prevProps);
    // this.searchStateSwitcher();
  }

  handleSortingChange(newSortingMethod) {
    const {
      currentForum,
      getDiscussions,
      updateSortingMethod,
      sortingMethod
    } = this.props;

    if (sortingMethod !== newSortingMethod) {
      updateSortingMethod(newSortingMethod);
      getDiscussions(currentForum, false, true);
    }
  }

  // renderNewDiscussionButtion() {
  //   const { currentForum } = this.props;

  //   return (
  //     <div
  //       className={classnames(
  //         appLayout.showOnMediumBP,
  //         styles.newDiscussionBtn
  //       )}
  //     >
  //       <Link to={`/${currentForum}/new_discussion`}>
  //         <Button type="outline" fullWidth noUppercase>
  //           点击发布
  //         </Button>
  //       </Link>
  //     </div>
  //   );
  // }

  onInputChange(event) {
    this.setState({ search: event.target.value });
  }

  renderCarRental() {
    return <Search />;
  }

  // renderTwoSearch() {
  //   if (!this.state.searchDateStatus) {
  //     return (
  //       <div className="row">
  //         <form className="col s12">
  //           <div className="row">
  //             <div className="input-field col s6">
  //               <i className="material-icons prefix">search</i>
  //               <input
  //                 onBlur={() => {
  //                   this.setState({ searchDateStatus: true });
  //                 }}
  //                 id="icon_prefix"
  //                 type="text"
  //                 className="validate"
  //               />
  //               <label htmlFor="icon_prefix">按地点搜索</label>
  //             </div>
  //             <div className="input-field col s6">
  //               <i className="material-icons prefix">date</i>
  //               <input
  //                 onBlur={() => {
  //                   this.setState({ searchDateStatus: true });
  //                 }}
  //                 id="icon_prefix"
  //                 type="text"
  //                 className="validate"
  //               />
  //               <label htmlFor="icon_prefix">按日期搜索</label>
  //             </div>
  //           </div>
  //         </form>
  //       </div>
  //     );
  //   }
  // }
  // renderSingleSearch() {
  //   if (!this.state.searchDateStatus) {
  //     return (
  //       <div>
  //         <form className="col s12">
  //           <div className="input-field">
  //             <i className="material-icons prefix">search</i>
  //             <input
  //               onBlur={() => {
  //                 this.setState({ searchDateStatus: true });
  //               }}
  //               id="icon_prefix"
  //               type="text"
  //               className="validate"
  //             />
  //             <label htmlFor="icon_prefix">按城市/商品等文字搜索</label>
  //           </div>
  //         </form>
  //       </div>
  //     );
  //   }
  // }

  // renderSearchBar() {
  //   const { discussions } = this.props;
  //   if (discussions) {
  //     const pdate = discussions[0].pdate;
  //     const rdate = discussions[0].rdate[0];
  //     return !_.isEmpty(pdate) || !_.isEmpty(rdate)
  //       ? this.renderTwoSearch()
  //       : this.renderSingleSearch();
  //   }
  // }

  closeAllPopups() {
    this.setState({
      search: "",
      searchTerm: "",
      pickDate: moment().day(DEFAULT_PICKUP_DAY_FROM_NOW_OFFSET),

      overlayVisible: false,
      currentDateKey: "",
      // searchDate: moment().day(DEFAULT_PICKUP_DAY_FROM_NOW_OFFSET),
      searchTermStatus: false,
      searchDateStatus: false,

      searchStatus: true
    });
  }

  searchByTerm() {
    const { currentForum } = this.props;
    return (
      <div className={classnames(styles.subMenu)}>
        <Link
          to={`/${currentForum}`}
          className={styles.subMenuClose}
          onClick={this.closeAllPopups.bind(this)}
          alwaysActive
        >
          <i className={classnames("fa fa-close")} />
        </Link>
        <form
          onSubmit={event => {
            event.preventDefault();
            this.setState({
              searchTerm: this.state.search,
              searchStatus: false,
              searchTermStatus: false
            });
          }}
        >
          <input
            style={{ width: 280, height: 35, fontSize: 12 }}
            value={this.state.search}
            onChange={this.onInputChange.bind(this)}
            placeholder="按地点,车型,商品名等搜索"
          />

          <button type="submit" className="waves-effect grey btn">
            <i className="material-icons">search</i>
          </button>
        </form>
      </div>
    );
  }

  searchByDate() {
    const { currentForum } = this.props;
    return (
      <div className={classnames(styles.subMenu)}>
        <Link
          to={`/${currentForum}`}
          className={styles.subMenuClose}
          onClick={this.closeAllPopups.bind(this)}
          alwaysActive
        >
          <i className={classnames("fa fa-close")} />
        </Link>
        <div className={styles.mobileDate}>
          <form
            onSubmit={event => {
              event.preventDefault();
              this.setState({
                searchDate: this.state.pickDate,
                overlayVisible: false,
                searchDateStatus: false
              });
            }}
          >
            <SingleDatePicker
              noBorder
              date={this.state.pickDate}
              numberOfMonths={1}
              initialVisibleMonth={() => this.state.pickDate} // momentPropTypes.momentObj or null
              onDateChange={date => {
                this.setState({ pickDate: date });
              }}
              focused={this.state.focused} // PropTypes.bool
              onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
            />
            <button type="submit">搜索</button>
          </form>
        </div>
      </div>
    );
  }

  // renderSearchButton() {
  //   if (!this.state.searchDateStatus) {
  //     return (
  //       <button
  //         onClick={() => {
  //           this.setState({ searchDateStatus: true });
  //         }}
  //         className="waves-effect waves-light btn"
  //       >
  //         <i className="material-icons left">search</i>
  //         筛选
  //       </button>
  //     );
  //   }
  //   return this.searchByDate();
  // }

  // onMouseEnter={this.renderSearchMenu.bind(this)}
  //           onMouseLeave={this.HideSearchMenu.bind(this)}

  // const { discussions } = this.props;
  // if (!_.isEmpty(discussions)) {
  //   if (!discussions[0].pdate && !discussions[0].rdate[0]) {

  // switch (this.state.searchStatus) {
  //   case true:

  //   default:
  //     return (
  //       <div>
  //         <button
  //           onClick={event => {
  //             event.preventDefault();
  //             this.setState({
  //               searchTerm: "",
  //               search: "",
  //               searchStatus: true
  //             });
  //           }}
  //         >
  //           <i className="material-icons right">clear</i>
  //           {this.state.searchTerm}
  //         </button>
  //       </div>
  //     );
  // }

  //   }
  // switch (this.state.searchStatus) {
  //   case true:
  //     return (
  //       <div>
  //         <form
  //           onSubmit={event => {
  //             event.preventDefault();
  //             this.setState({
  //               searchDate: this.state.pickDate,
  //               overlayVisible: false
  //             });
  //           }}
  //         >
  //           <SingleDatePicker
  //             noBorder
  //             date={this.state.pickDate}
  //             numberOfMonths={1}
  //             initialVisibleMonth={() => this.state.pickDate} // momentPropTypes.momentObj or null
  //             onDateChange={date => {
  //               this.setState({ pickDate: date });
  //             }}
  //             focused={this.state.focused} // PropTypes.bool
  //             onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
  //           />
  //           <button type="submit">搜索</button>
  //         </form>
  //       </div>
  //     );
  // }
  // }

  renderTitle() {
    switch (this.props.currentForum) {
      case "shun_feng_che":
        return { supTitle: "提供顺风车", reqTitle: "寻求顺风车" };
      case "pin_fang":
        return { supTitle: "提供拼房发布", reqTitle: "寻求拼房发布" };
      case "fa_tuan_jie_huo":
        return { supTitle: "发团信息发布", reqTitle: "寻求接团发布" };
      case "market":
        return { supTitle: "发布出售信息", reqTitle: "发布求购信息" };
      case "tour_wiki":
        return { supTitle: "发布攻略信息", reqTitle: "发布科普信息" };
      default:
        return { supTitle: "提供信息发布", reqTitle: "寻求信息发布" };
    }
  }

  renderBySearchStatus() {
    const { searchDateStatus, searchTermStatus } = this.state;
    if (searchDateStatus) {
      return this.searchByDate();
    } else if (searchTermStatus) {
      return this.searchByTerm();
    }
    return null;
  }

  closeDateConditions() {
    this.setState({
      searchDate: "",
      search: "",
      searchStatus: true
    });
  }

  closeTermConditions() {
    this.setState({
      searchTerm: "",
      search: "",
      searchStatus: true
    });
  }

  renderDateSearched() {
    if (this.state.searchDate) {
      const { currentForum } = this.props;
      const { searchDate } = this.state;
      const searchDateMMDD = moment(searchDate).format("MM/DD");

      return (
        <div className="container">
          <Link
            to={`/${currentForum}`}
            className="waves-effect waves-light btn"
            onClick={this.closeDateConditions.bind(this)}
          >
            <i className="material-icons right">clear</i>搜索日期:{
              searchDateMMDD
            }
          </Link>
        </div>
      );
    }
  }

  renderTermSearched() {
    if (this.state.searchTerm) {
      const { currentForum } = this.props;
      const { searchTerm } = this.state;

      return (
        <div className="container">
          <Link
            to={`/${currentForum}`}
            className="waves-effect white btn"
            onClick={this.closeTermConditions.bind(this)}
          >
            <i className="material-icons right black-text">clear</i>
            <span style={{ color: "black" }}>
              搜索文字:&nbsp;&nbsp;<span style={{ fontSize: 16 }}>
                {searchTerm}
              </span>
            </span>
          </Link>
        </div>
      );
    }
  }

  render() {
    const {
      currentForum,
      discussions,
      fetchingDiscussions,
      pinnedDiscussions,
      fetchingPinnedDiscussions,
      sortingMethod,
      error
    } = this.props;

    const { searchDate } = this.state;
    console.log("!this.state.searchDate", !this.state.searchDate);
    const searchDateMMDD = moment(searchDate).format("MM/DD");

    if (error) {
      return <div className={classnames(styles.errorMsg)}>{error}</div>;
    }

    // console.log("searchDateStatus", this.state.searchDateStatus);
    // console.log("searchTermStatus", this.state.searchTermStatus);
    // console.log("登录情况", this.props);

    return (
      <div
        className={classnames(appLayout.constraintWidth, styles.contentArea)}
      >
        <Helmet>
          <title>{`途盖大导通 | ${currentForum}`}</title>
        </Helmet>
        {/* 搜索条在这里 */}
        <div className={appLayout.primaryContent}>
          <div style={{ display: "flex", justifyContent: "center" }} />
          {/* {this.renderCarRental()} */}
          <div
            style={{
              display: "flex",
              // alignItems: "center",
              // justifyContent: "space-evenly",
              flexDirection: "row"
            }}
          >
            {/* <img src="/src/static/banners/sprinter-banner.jpg" width="80%" /> */}

            {/* <div>{this.renderSearchBar()}</div> */}
            {/* <div>{this.renderSearchButton()}</div> */}
          </div>

          {this.renderBySearchStatus()}
          {this.renderDateSearched()}
          {this.renderTermSearched()}

          <FeedBox
            type="pinned"
            loading={fetchingPinnedDiscussions}
            discussions={pinnedDiscussions}
            currentForum={currentForum}
            onChangeSortingMethod={this.handleSortingChange.bind(this)}
            activeSortingMethod={sortingMethod}
            searchTerm={this.state.searchTerm}
            searchDate={searchDate}
            searchStatus={this.state.searchDate}
          />
          <FeedBox
            type="general"
            loading={fetchingDiscussions}
            discussions={discussions}
            currentForum={currentForum}
            onChangeSortingMethod={this.handleSortingChange.bind(this)}
            activeSortingMethod={sortingMethod}
            searchTerm={this.state.searchTerm}
            searchDate={searchDate}
            searchStatus={this.state.searchDate}
          />

          {/* {this.renderNewDiscussionButtion()} */}
          <SideBar title={this.renderTitle()} currentForum={currentForum} />
        </div>

        <div className={appLayout.secondaryContent}>
          <div className={styles.fixedPosition}>
            <img
              src="/src/static/images/yale_van_deals.png"
              style={{ width: "80%" }}
            />
            <hr />
            <img src="/src/static/images/GNC.jpg" style={{ width: "80%" }} />
            <hr />
            <img
              src="/src/static/images/adwords.png"
              style={{ width: "80%" }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => {
    return {
      currentForum: state.app.currentForum,
      currentForumId: () => {
        const currentForumObj = _.find(state.app.forums, {
          forum_slug: state.app.currentForum
        });
        if (currentForumObj) return currentForumObj._id;
        else return null;
      },
      fetchingDiscussions: state.feed.fetchingDiscussions,
      discussions: state.feed.discussions,
      fetchingPinnedDiscussions: state.feed.fetchingPinnedDiscussions,
      sortingMethod: state.feed.sortingMethod,
      pinnedDiscussions: state.feed.pinnedDiscussions,
      error: state.feed.error
    };
  },
  dispatch => {
    return {
      getDiscussions: (
        currentForumId,
        feedChanged,
        sortingMethod,
        sortingChanged
      ) => {
        dispatch(
          getDiscussions(
            currentForumId,
            feedChanged,
            sortingMethod,
            sortingChanged
          )
        );
      },
      getPinnedDiscussions: (currentForumId, feedChanged) => {
        dispatch(getPinnedDiscussions(currentForumId, feedChanged));
      },
      updateSortingMethod: method => {
        dispatch(updateSortingMethod(method));
      }
    };
  }
)(ForumFeed);
