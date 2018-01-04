import React from "react";

const AgeDropdown = props => (
  <div className="col-12 col-lg-6">
    <div className="input-box-wrap">
      <label>Please Select an Age</label>
      <div className="input-box">
        <div className="select-wrap">
          <span>{props.value}</span>
          <select
            style={{ display: "flex", zIndex: 1 }}
            name={props.name}
            onChange={props.onInputChange}
            value={props.value}
          >
            <option value="18-20">18-20</option>
            <option value="21-24">21-24</option>
            <option value="25+">25+</option>
          </select>
        </div>
      </div>
    </div>
  </div>
);

export default AgeDropdown;
