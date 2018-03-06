import React, { Component } from "react";
import { Link } from "react-router";
import styles from "./styles";
import classnames from "classnames";

import Button from "Components/Button";

class SideBar extends Component {
  render() {
    const { currentForum } = this.props;

    return (
      <div className={classnames(styles.sidebarContainer, styles.zStyle)}>
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
              <Link to="/" className={styles.aStyle}>
                <i className={classnames(styles.iStyle, "material-icons")}>
                  home
                </i>
              </Link>
            </li>
            <li
              className={classnames("waves-effect waves-light", styles.liStyle)}
            >
              <Link to="/map" className={styles.aStyle}>
                <i className={classnames(styles.iStyle, "material-icons")}>
                  directions
                </i>
              </Link>
            </li>
            <li
              className={classnames("waves-effect waves-light", styles.liStyle)}
            >
              <Link to="/pin_fang" className={styles.aStyle}>
                <i className={classnames(styles.iStyle, "material-icons")}>
                  list
                </i>
              </Link>
            </li>
            <li
              className={classnames("waves-effect waves-light", styles.liStyle)}
            >
              <Link to="/car-rental" className={styles.aStyle}>
                <i className={classnames(styles.iStyle, "material-icons")}>
                  directions_car
                </i>
              </Link>
            </li>
            <li
              className={classnames("waves-effect waves-light", styles.liStyle)}
            >
              <a href="/user/login" className={styles.aStyle}>
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
