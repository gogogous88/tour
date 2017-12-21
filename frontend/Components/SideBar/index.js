import React, { Component } from "react";
import { Link } from "react-router";
import styles from "./styles";
import classnames from "classnames";

import Button from "Components/Button";

class SideBar extends Component {
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
          <a className="btn-floating btn-large red">
            <i className="large material-icons">add</i>
          </a>
          <ul>
            <li className="waves-effect waves-light">
              <Link to={`/${currentForum}/new_discussion/req`}>
                发布寻求信息
              </Link>
            </li>
            <li className="waves-effect waves-light">
              <Link to={`/${currentForum}/new_discussion/sup`}>
                发布提供信息
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

SideBar.defaultProps = {
  currentForum: "general"
};

SideBar.propTypes = {
  currentForum: React.PropTypes.string
};

export default SideBar;
