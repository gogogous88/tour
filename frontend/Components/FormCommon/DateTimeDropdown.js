import React from "react";
import moment from "moment";

import styles from "./styles.css";

const DateTimeDropdown = props => {
  return (
    <div className="col-12 col-lg-6">
      <div className="input-box-wrap">
        <label>Pickup Date & Time</label>
        <div className="input-box">
          <div
            className="text-wrap"
            onClick={() =>
              props.onDateOverlayVisible(props.dateValue, props.dateSelectName)
            }
          >
            {props.dateValue.format("ll")}
          </div>

          <i className="fa fa-calendar fa-1" />
        </div>
      </div>
    </div>
  );
};

export default DateTimeDropdown;
