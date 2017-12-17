import React, { Component } from "react";
import classnames from "classnames";
import styles from "./styles.css";
import moment from "moment";
import $ from "jquery";

import { SingleDatePicker } from "react-dates";
import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION
} from "react-dates/constants";
import "react-dates/initialize";

import "react-dates/lib/css/_datepicker.css";

const DEFAULT_PICKUP_DAY_FROM_NOW_OFFSET = 1 + 7; // default pickup/return date is next Friday/Sunday
const DEFAULT_RETURN_DAY_OFFSET = 2;
const DEFAULT_CALENDAR_RANGE_MONTHS = 6; // only enable days during next 6 months

class Pdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickDate: moment().day(DEFAULT_PICKUP_DAY_FROM_NOW_OFFSET),

      overlayVisible: false,
      currentDateKey: ""
    };

    this.props.onChange(this.state.pickDate);
  }

  onDateSeclectChange = date => {
    this.setState({
      pickDate: date,
      overlayVisible: false
    });

    this.props.onChange(date);
  };

  render() {
    return (
      <SingleDatePicker
        date={this.state.pickDate}
        numberOfMonths={1}
        initialVisibleMonth={() => this.state.pickDate} // momentPropTypes.momentObj or null
        onDateChange={this.onDateSeclectChange.bind(this)} // PropTypes.func.isRequired
        focused={this.state.focused} // PropTypes.bool
        onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
      />
    );
  }
}

Pdate.defaultProps = {
  onChange: date => {},
  date: moment().day(DEFAULT_PICKUP_DAY_FROM_NOW_OFFSET)
};

Pdate.propTypes = {
  onDateChange: React.PropTypes.func,
  date: ""
};

export default Pdate;
