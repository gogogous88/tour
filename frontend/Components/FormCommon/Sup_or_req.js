import React, { Component } from "react";
import classnames from "classnames";
import styles from "./styles.css";

import Button from "../../Components/Button";

class Sup_or_req extends Component {
  componentDidMount() {
    const value1 = this.props.value;
    this.props.onHave(value1);
  }

  render() {
    return (
      <div>
        <p style={{ fontSize: 16 }}>
          您正在发布一个{this.props.value}
          {this.props.title}的信息:
        </p>
      </div>
    );
  }
}

export default Sup_or_req;
