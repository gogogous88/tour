import React, { Component } from "react";
import classnames from "classnames";
import styles from "./styles.css";

import Button from "../../Components/Button";

class Sup_or_req extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "提供" };
    this.props.onChange(this.state.value);
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    this.setState({ value });
  }

  onInputChange = ({ target }) => {
    const value = target.value;
    this.props.onChange(value);
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <div>
        <div className={styles.titleInput}>{this.props.title}</div>

        <div>
          <select
            className={styles.styledSelect}
            value={value}
            onChange={this.onInputChange}
          >
            <option value="提供">提供</option>
            <option value="寻求">寻求</option>
          </select>
        </div>
      </div>
    );
  }
}

Sup_or_req.defaultProps = {
  onChange: val => {},
  value: "提供"
};

Sup_or_req.propTypes = {
  onChange: React.PropTypes.func,
  value: React.PropTypes.string
};

export default Sup_or_req;
