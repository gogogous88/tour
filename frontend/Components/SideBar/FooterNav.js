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
        <div className={styles.toolbarFixed}>
          <ul className={styles.ulStyle}>
            <li
              className={classnames("waves-effect waves-light", styles.liStyle)}
            >
              <a className={styles.aStyle} href="/">
                <i className={classnames(styles.iStyle, "material-icons")}>
                  home
                </i>
              </a>
            </li>
            <li
              className={classnames("waves-effect waves-light", styles.liStyle)}
            >
              <a className={styles.aStyle} href="/map">
                <i className={classnames(styles.iStyle, "material-icons")}>
                  map
                </i>
              </a>
            </li>
            <li
              className={classnames("waves-effect waves-light", styles.liStyle)}
            >
              <a className={styles.aStyle} href="/pin_fang">
                <i className={classnames(styles.iStyle, "material-icons")}>
                  list
                </i>
              </a>
            </li>
            <li
              className={classnames("waves-effect waves-light", styles.liStyle)}
            >
              <a className={styles.aStyle} href="/user/login">
                <i className={classnames(styles.iStyle, "material-icons")}>
                  person
                </i>
              </a>
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
