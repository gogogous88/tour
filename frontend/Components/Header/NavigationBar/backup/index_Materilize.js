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
        <nav className="nav-extended">
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">
              Logo
            </a>
            <a
              href="#"
              data-activates="mobile-demo"
              className="button-collapse"
            >
              <i className="material-icons">menu</i>
            </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <IndexLink to="/map" classNameName="nav-link">
                  团餐景点导航
                </IndexLink>
              </li>
              {navigationLinks.map(link => {
                if (link.id === 0) {
                  return (
                    <li key={_.uniqueId("navLink_")}>
                      <IndexLink classNameName="nav-link" to="/">
                        Home
                      </IndexLink>
                    </li>
                  );
                }

                return (
                  <li key={_.uniqueId("navLink_")}>
                    <Link classNameName="nav-link" to={link.link}>
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ul className="side-nav" id="mobile-demo">
              <li>
                <IndexLink to="/map" classNameName="nav-link">
                  团餐景点导航
                </IndexLink>
              </li>
              {navigationLinks.map(link => {
                if (link.id === 0) {
                  return (
                    <li key={_.uniqueId("navLink_")}>
                      <IndexLink classNameName="nav-link" to="/">
                        Home
                      </IndexLink>
                    </li>
                  );
                }

                return (
                  <li key={_.uniqueId("navLink_")}>
                    <Link classNameName="nav-link" to={link.link}>
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="nav-content">
            <ul className="tabs tabs-transparent">
              <li className="tab">
                <a href="#test1">Test 1</a>
              </li>
              <li className="tab">
                <a className="active" href="#test2">
                  Test 2
                </a>
              </li>
              <li className="tab disabled">
                <a href="#test3">Disabled Tab</a>
              </li>
              <li className="tab">
                <a href="#test4">Test 4</a>
              </li>
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
