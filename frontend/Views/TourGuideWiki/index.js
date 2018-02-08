import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import _ from "lodash";

import styles from "./styles";
import keys from "../../../../config/credentials";
import * as actions from "./actions";

class Logo extends Component {
  constructor(props) {
    super(props);
    this.state = { pos: {} };
  }

  componentDidMount() {
    if (this.props.user && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.renderLocation(pos);
      });
    }
  }

  renderLocation(pos) {
    this.setState({ pos });
    const value = { username: this.props.user.username, pos: this.state.pos };

    this.props.user && !_.isEmpty(value.pos)
      ? this.props.updateCoord(value)
      : "";
  }

  render() {
    return (
      <a className={styles.logoContainer} href="/">
        <div className={styles.logo}>
          {/* <g
            id="Group"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <path
              d="M51.1388842,81.5721454 L69.5667388,100 L92.0066458,100 C96.4114635,100 100,96.4212534 100,92.0066458 L100,7.99335421 C100,3.58853654 96.4212534,0 92.0066458,0 L7.99335421,0 C3.58853654,0 0,3.57874658 0,7.99335421 L0,92.0066458 C0,96.4114635 3.57874658,100 7.99335421,100 L10.5882353,100 L10.5882353,44.7058824 C10.7474244,24.5366987 27.1464843,8.23529412 47.3529412,8.23529412 C67.6575276,8.23529412 84.1176471,24.6954136 84.1176471,45 C84.1176471,64.0263195 69.6647717,79.676989 51.1388842,81.5721454 Z M24.2232146,73.5788183 L24.1176471,73.6843859 L50.4332612,100 L24.1176471,100 L24.1176471,73.4929507 C24.1527823,73.521637 24.1879715,73.5502596 24.2232146,73.5788183 Z"
              id="Combined-Shape"
              fill="#F1C40F"
            />
            <circle
              id="Oval"
              fill="#F1C40F"
              cx="47.6470588"
              cy="45.2941176"
              r="23.5294118"
            />
          </g> */}
          <img
            src="/src/static/images/shangche.png"
            style={{ width: "100%" }}
          />
        </div>
        <div className={styles.logoTitle}>途盖大导通</div>
      </a>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}
export default connect(mapStateToProps, actions)(Logo);
