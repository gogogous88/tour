import React from 'react';
import moment from 'moment';

const DateTimeDropdown = props => {
  function renderTime(timeStr) {
    return moment(timeStr, 'hhmm').format('h:mm a');
  }

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
            {props.dateValue.format('ll')}
          </div>
          <div className="select-wrap">
            <span>{renderTime(props.timeValue)}</span>
            <select
              name={props.timeSelectName}
              onChange={props.onTimeChange}
              value={props.timeValue}
            >
              <optgroup label="Midnight">
                <option value="0000">12:00am</option>
                <option value="0030">12:30am</option>
                <option value="0100">1:00am</option>
                <option value="0130">1:30am</option>
                <option value="0200">2:00am</option>
                <option value="0230">2:30am</option>
                <option value="0300">3:00am</option>
                <option value="0330">3:30am</option>
                <option value="0400">4:00am</option>
                <option value="0430">4:30am</option>
                <option value="0500">5:00am</option>
                <option value="0530">5:30am</option>
                <option value="0600">6:00am</option>
                <option value="0630">6:30am</option>
                <option value="0700">7:00am</option>
                <option value="0730">7:30am</option>
                <option value="0800">8:00am</option>
                <option value="0830">8:30am</option>
                <option value="0900">9:00am</option>
                <option value="0930">9:30am</option>
                <option value="1000">10:00am</option>
                <option value="1030">10:30am</option>
                <option value="1100">11:00am</option>
                <option value="1130">11:30am</option>
              </optgroup>
              <optgroup label="Noon">
                <option value="1200">12:00pm</option>
                <option value="1230">12:30pm</option>
                <option value="1300">1:00pm</option>
                <option value="1330">1:30pm</option>
                <option value="1400">2:00pm</option>
                <option value="1430">2:30pm</option>
                <option value="1500">3:00pm</option>
                <option value="1530">3:30pm</option>
                <option value="1600">4:00pm</option>
                <option value="1630">4:30pm</option>
                <option value="1700">5:00pm</option>
                <option value="1730">5:30pm</option>
                <option value="1800">6:00pm</option>
                <option value="1830">6:30pm</option>
                <option value="1900">7:00pm</option>
                <option value="1930">7:30pm</option>
                <option value="2000">8:00pm</option>
                <option value="2030">8:30pm</option>
                <option value="2100">9:00pm</option>
                <option value="2130">9:30pm</option>
                <option value="2200">10:00pm</option>
                <option value="2230">10:30pm</option>
                <option value="2300">11:00pm</option>
                <option value="2330">11:30pm</option>
              </optgroup>
            </select>
          </div>

          <i className="fa fa-calendar fa-1" />
        </div>
      </div>
    </div>
  );
};

export default DateTimeDropdown;
