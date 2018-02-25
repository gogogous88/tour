import React, { Component } from "react";
import classnames from "classnames";
import styles from "./styles.css";
import moment from "moment";
import $ from "jquery";

import { DateRangePicker } from "react-dates";
import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION
} from "react-dates/constants";
import "react-dates/initialize";

import "react-dates/lib/css/_datepicker.css";

const DEFAULT_PICKUP_DAY_FROM_NOW_OFFSET = 1 + 7; // default pickup/return date is next Friday/Sunday
const DEFAULT_RETURN_DAY_OFFSET = 2;
const DEFAULT_CALENDAR_RANGE_MONTHS = 6; // only enable days during next 6 months

class Rdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment().day(DEFAULT_PICKUP_DAY_FROM_NOW_OFFSET),
      endDate: moment().day(
        DEFAULT_PICKUP_DAY_FROM_NOW_OFFSET + DEFAULT_RETURN_DAY_OFFSET
      ),

      overlayVisible: false,
      currentDateKey: ""
    };
    const pdate = moment(this.state.startDate).format("YYYY-MM-DD");
    const rdate = moment(this.state.endDate).format("YYYY-MM-DD");

    this.props.onChange([pdate, rdate]);
  }

  render() {
    return (
      <div>
        <DateRangePicker
          startDateId="start_date_input"
          endDateId="end_date_input"
          noBorder
          numberOfMonths={1}
          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
          onDatesChange={({ startDate, endDate }) => {
            this.setState({ startDate, endDate });
            this.props.onChange([startDate, endDate]);
          }} // PropTypes.func.isRequired,
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
        />
      </div>
    );
  }
}

Rdate.defaultProps = {
  onChange: date => {},
  date: ""
};

Rdate.propTypes = {
  onDatesChange: React.PropTypes.func,
  date: React.PropTypes.date
};

export default Rdate;
