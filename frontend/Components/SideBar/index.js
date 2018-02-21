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
        <div className="fixed-action-btn toolbar" style={{ bottom: "10%" }}>
          <a className="btn-floating btn-large red pulse">
            <i className="large material-icons">add</i>
          </a>
          <ul>
            <li className="waves-effect waves-light">
              <Link to={`/${currentForum}/new_discussion/req`}>
                {this.props.title.reqTitle}
              </Link>
            </li>
            <li className="waves-effect waves-light">
              <Link to={`/${currentForum}/new_discussion/sup`}>
                {this.props.title.supTitle}
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
