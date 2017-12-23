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
        <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <a className="navbar-brand" href="#">
            首页
          </a>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <IndexLink to="/map" className="nav-link">
                  团餐景点导航
                </IndexLink>
              </li>
              {navigationLinks.map(link => {
                if (link.id === 0) {
                  return (
                    <li
                      className="nav-item active"
                      key={_.uniqueId("navLink_")}
                    >
                      <IndexLink className="nav-link" to="/">
                        Home
                      </IndexLink>
                    </li>
                  );
                }

                return (
                  <li className="nav-item active" key={_.uniqueId("navLink_")}>
                    <Link className="nav-link" to={link.link}>
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
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
