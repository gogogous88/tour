import React, { Component } from "react";
import { Link, IndexLink } from "react-router";
import classnames from "classnames";
import _ from "lodash";
import styles from "./styles";

class NavigationBar extends Component {
  render() {
    const { navigationLinks } = this.props;

    if (navigationLinks) {
      return (
        <ul className={styles.navigationBar}>
          <li>
            <IndexLink
              to="/"
              className={styles.links}
              activeClassName={styles.linkActive}
            >
              北美团餐厅导航
            </IndexLink>
          </li>
          {navigationLinks.map(link => {
            if (link.id === 0) {
              return (
                <li key={_.uniqueId("navLink_")}>
                  <IndexLink
                    className={styles.links}
                    activeClassName={styles.linkActive}
                    to="/"
                  >
                    Home
                  </IndexLink>
                </li>
              );
            }

            return (
              <li key={_.uniqueId("navLink_")}>
                <Link
                  className={styles.links}
                  activeClassName={styles.linkActive}
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      );
    }

    return null;
  }
}

NavigationBar.defaultProps = {
  navigationLinks: [
    {
      id: 1,
      name: "General",
      link: "/"
    }
  ]
};

NavigationBar.propTypes = {
  navigationLinks: React.PropTypes.array
};

export default NavigationBar;
