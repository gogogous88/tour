import _ from "lodash";
import $ from "jquery";
import React, { Component } from "react";
import moment from "moment";
import "moment/locale/zh-cn";
import { connect } from "react-redux";
import querystring from "querystring";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION
} from "react-dates/constants";
// import MobileDetect from "mobile-detect";
import withUserAgent from "react-useragent";
import classNames from "classnames/bind";

import { fetchToken, fetchLocations, updateSearchConditions } from "../actions";
import LocationDropdown from "./LocationDropdown";
import DateTimeDropdown from "./DateTimeDropdown";
import AgeDropdown from "./AgeDropdown";
import Loading from "../../../Components/Loading";

import styles from "./styles/search.css";

const DEFAULT_PICKUP_DAY_FROM_NOW_OFFSET = 15 + 7; // default pickup/return date is next Friday/Sunday
const DEFAULT_RETURN_DAY_OFFSET = 2;
const DEFAULT_CALENDAR_RANGE_MONTHS = 6; // only enable days during next 6 months

class Search extends Component {
  constructor(props) {
    super(props);

    moment.locale(document.documentElement.lang || "en");

    this.state = {
      pickLocation: 5761,
      pickDate: moment().day(DEFAULT_PICKUP_DAY_FROM_NOW_OFFSET),
      pickTime: "1000",
      returnLocation: 5761,
      returnDate: moment().day(
        DEFAULT_PICKUP_DAY_FROM_NOW_OFFSET + DEFAULT_RETURN_DAY_OFFSET
      ),
      returnTime: "1000",
      age: "25+",
      promotion: "",
      syncLocation: true,
      overlayDate: moment().day(DEFAULT_PICKUP_DAY_FROM_NOW_OFFSET),
      overlayVisible: false,
      currentDateKey: ""
    };
  }

  componentDidMount = async () => {
    // check access_token
    if (!this.props.access_token) {
      await this.props.fetchToken();
    }

    // check locations
    if (_.isEmpty(this.props.locations)) {
      await this.props.fetchLocations();
    }

    // update state if conditions already existed (usually from result page)
    if (!_.isEmpty(this.props.conditions)) {
      const {
        pickLocation,
        returnLocation,
        pickDate,
        returnDate,
        pickTime,
        returnTime,
        age,
        syncLocation,
        promotion
      } = this.props.conditions;

      this.setState({
        pickLocation,
        returnLocation,
        pickDate: moment(pickDate),
        returnDate: moment(returnDate),
        pickTime,
        returnTime,
        age,
        promotion,
        syncLocation
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    // refetch token before expiration
    if (this.props.access_token !== nextProps.access_token) {
      setTimeout(() => {
        this.props.fetchToken();
      }, nextProps.expires_in * 1000);
    }
  }

  onInputChange = ({ target }) => {
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      [target.name]: value
    });

    // sync return location if necessary
    if (target.name === "pickLocation" && this.state.syncLocation) {
      this.setState({
        returnLocation: value
      });
    }

    // sync checkbox logic
    if (target.name === "syncLocation") {
      if (!value) {
        this.setState({
          returnLocation: this.state.pickLocation,
          syncLocation: true
        });
      } else {
        this.setState({
          syncLocation: false
        });
      }
    }
  };

  onHandleSubmit = () => {
    const {
      pickLocation,
      returnLocation,
      pickDate,
      returnDate,
      pickTime,
      returnTime,
      age,
      syncLocation,
      promotion
    } = this.state;

    const conditions = {
      pickLocation,
      returnLocation,
      pickDate: pickDate.format("YYYY-MM-DD"),
      returnDate: returnDate.format("YYYY-MM-DD"),
      pickTime,
      returnTime,
      age,
      syncLocation: syncLocation.toString(),
      promotion
    };

    this.props.updateSearchConditions(conditions);
    this.props.router.push(`/result?${querystring.stringify(conditions)}`);
  };

  onDateOverlayToggle = ({ focused }) => {
    if (focused) {
      this.setState({
        overlayVisible: true
      });
    } else {
      $("body").removeClass("body-noscrolling");
      this.setState({
        overlayVisible: false
      });
    }
  };

  onDateOverlayVisible = (date, dateKeyName) => {
    $("body").addClass("body-noscrolling");
    this.setState({
      currentDateKey: dateKeyName,
      overlayDate: this.state[dateKeyName],
      overlayVisible: true
    });
  };

  onDateChange = date => {
    this.setState({
      overlayDate: date,
      [this.state.currentDateKey]: date,
      overlayVisible: false
    });

    if (
      this.state.currentDateKey === "pickDate" &&
      date.isAfter(this.state.returnDate)
    ) {
      this.setState({
        returnDate: moment(date).add(DEFAULT_RETURN_DAY_OFFSET, "days")
      });
    }
  };

  isOutsideRange = day => {
    if (this.state.currentDateKey === "returnDate") {
      return (
        day.isBefore(this.state.pickDate) ||
        day.isAfter(moment().add(DEFAULT_CALENDAR_RANGE_MONTHS, "months"))
      );
    }

    return (
      day.isBefore(moment()) ||
      day.isAfter(moment().add(DEFAULT_CALENDAR_RANGE_MONTHS, "months"))
    );
  };

  isDayHighlighted = date => {
    if (this.state.currentDateKey === "pickDate") return false;

    if (moment(date).isSame(moment(this.state.pickDate))) {
      return true;
    }
  };

  renderForm() {
    return (
      <div className="row">
        <LocationDropdown
          name="pickLocation"
          labelText="取车城市"
          value={this.state.pickLocation}
          onInputChange={this.onInputChange}
          locations={this.props.locations}
          syncLocation={this.state.syncLocation}
        />
        <LocationDropdown
          name="returnLocation"
          labelText="还车城市"
          value={this.state.returnLocation}
          onInputChange={this.onInputChange}
          locations={this.props.locations}
          isDisabled={this.state.syncLocation}
        />
        <DateTimeDropdown
          dateSelectName="pickDate"
          timeSelectName="pickTime"
          labelText="取车日期及时间"
          dateValue={this.state.pickDate}
          timeValue={this.state.pickTime}
          onDateChange={this.onDateChange}
          onTimeChange={this.onInputChange}
          onDateOverlayVisible={this.onDateOverlayVisible}
        />
        <DateTimeDropdown
          dateSelectName="returnDate"
          timeSelectName="returnTime"
          labelText="还车日期及时间"
          dateValue={this.state.returnDate}
          timeValue={this.state.returnTime}
          onDateChange={this.onDateChange}
          onTimeChange={this.onInputChange}
          onDateOverlayVisible={this.onDateOverlayVisible}
        />
        <AgeDropdown
          name="age"
          value={this.state.age}
          onInputChange={this.onInputChange}
        />

        <div className="col-12 col-lg-6">
          <div className="input-box-wrap">
            <label
              className={classNames(styles.labelStyle, styles.labelPadding)}
            >
              打折码(选填)
            </label>
            <div className={styles.inputBox}>
              <div className={classNames(styles.divInInput, styles.selectWrap)}>
                <input
                  className={styles.inputInWrap}
                  name="promotion"
                  onChange={this.onInputChange}
                  type="text"
                  value={this.state.promotion}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={classNames(styles.searchButton, "col-12")}>
          <button
            className="btn btn-block red lighten-1 rounded-0"
            onClick={this.onHandleSubmit}
          >
            搜索
          </button>
        </div>
      </div>
    );
  }

  render() {
    // const md = new MobileDetect(window.navigator.userAgent);
    if (_.isEmpty(this.props.locations)) {
      return <Loading />;
    }

    return (
      <div className={styles.searchContainer}>
        <div className={classNames(styles.divInRow, "col")}>
          <div className="row">
            <div className="col">
              <div className={styles.searchWrap}>{this.renderForm()}</div>
              <div className={styles.dateOverlayWrap}>
                <SingleDatePicker
                  id={"dateInput"}
                  date={this.state.overlayDate}
                  focused={this.state.overlayVisible}
                  initialVisibleMonth={() => this.state.overlayDate}
                  onDateChange={this.onDateChange}
                  isDayHighlighted={this.isDayHighlighted}
                  onFocusChange={this.onDateOverlayToggle}
                  withPortal={true}
                  // orientation={
                  //   md.mobile() ? VERTICAL_ORIENTATION : HORIZONTAL_ORIENTATION
                  // }
                  numberOfMonths={1}
                  isOutsideRange={this.isOutsideRange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.rentalReducer
  };
}

export default connect(mapStateToProps, {
  fetchToken,
  fetchLocations,
  updateSearchConditions
})(withUserAgent(Search));
