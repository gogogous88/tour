import React from "react";
import styles from "./styles/search.css";

const AgeDropdown = props => (
  <div className="col-12 col-lg-6">
    <div className={styles.labelPadding}>
      <label className={styles.labelStyle}>驾驶人年龄</label>
      <div className={styles.inputBox}>
        <div className={styles.selectWrap}>
          <span className={styles.spanInWrap}>{props.value}</span>
          <select
            className={styles.selectInWrap}
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
