import React, { Component } from "react";
import classnames from "classnames";
import styles from "./styles";

import Button from "../../../Components/Button";

class PinButton extends Component {
  constructor(props) {
    super(props);
    this.state = { value: false };
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    this.setState({ value });
  }

  updateValue(value) {
    this.props.onChange(value);
    this.setState({ value });
  }

  render() {
    const { value } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.label}>是否置顶？</div>

        <div className={styles.btnContainer}>
          <Button
            alwaysActive={value ? true : false}
            onClick={() => {
              this.updateValue(true);
            }}
          >
            是
          </Button>

          <Button
            alwaysActive={!value ? true : false}
            onClick={() => {
              this.updateValue(false);
            }}
          >
            否
          </Button>
        </div>
      </div>
    );
  }
}

PinButton.defaultProps = {
  onChange: val => {},
  value: false
};

PinButton.propTypes = {
  onChange: React.PropTypes.func,
  value: React.PropTypes.bool
};

export default PinButton;
