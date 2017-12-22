import React, { Component } from "react";
import { Link } from "react-router";
import styles from "./styles";
import classnames from "classnames";

import Button from "Components/Button";

class MapButton extends Component {
  render() {
    const { currentForum } = this.props;

    return (
      <div className={styles.sidebarContainer}>
        {/* <Link to={`/${currentForum}/new_discussion/req`}>
          <Button className={styles.button} type="outline">
            <div className={styles.buttonContent}>+</div>
          </Button>
        </Link> */}
        <div className="fixed-action-btn toolbar">
          <a className="btn-floating btn-large red pulse">
            <i className="large material-icons">collections</i>
          </a>
          <ul>
            <li className="waves-effect waves-light pulse">
              <Link to={`/map/attr`}>全美景点</Link>
            </li>
            <li className="waves-effect waves-light pulse">
              <Link to={`/map`}>全美团餐</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

MapButton.defaultProps = {
  currentForum: "general"
};

MapButton.propTypes = {
  currentForum: React.PropTypes.string
};

export default MapButton;
