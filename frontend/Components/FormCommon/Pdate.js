import React, { Component } from "react";
import classnames from "classnames";
import styles from "./styles.css";
import moment from "moment";
import $ from "jquery";
import "moment/locale/zh-cn";
import { SingleDatePicker } from "react-dates";
import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION
} from "react-dates/constants";
import "react-dates/initialize";

import DateTimeDropdown from "./DateTimeDropdown";
import "react-dates/lib/css/_datepicker.css";

const DEFAULT_PICKUP_DAY_FROM_NOW_OFFSET = 1 + 7; // default pickup/return date is next Friday/Sunday
const DEFAULT_RETURN_DAY_OFFSET = 2;
const DEFAULT_CALENDAR_RANGE_MONTHS = 6; // only enable days during next 6 months

class Pdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickDate: moment().day(DEFAULT_PICKUP_DAY_FROM_NOW_OFFSET),
      overlayDate: moment().day(DEFAULT_PICKUP_DAY_FROM_NOW_OFFSET),
      overlayVisible: false,
      currentDateKey: ""
    };

    this.props.onChange(this.state.overlayDate);
  }

  onDateSeclectChange = date => {
    this.setState({
      overlayDate: date,
      overlayVisible: false
    });

    this.props.onChange(date);
  };

  render() {
    return (
      <div>
        <SingleDatePicker
          date={this.state.overlayDate}
          numberOfMonths={1}
          initialVisibleMonth={() => this.state.overlayDate} // momentPropTypes.momentObj or null
          onDateChange={this.onDateSeclectChange} // PropTypes.func.isRequired
          focused={this.state.focused} // PropTypes.bool
          onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
        />
      </div>
    );
  }
}

Pdate.defaultProps = {
  onChange: date => {},
  date: ""
};

Pdate.propTypes = {
  onChange: React.PropTypes.func,
  date: React.PropTypes.date
};

export default Pdate;
