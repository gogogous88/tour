import React, { Component } from "react";
import { Link, IndexLink } from "react-router";
import classnames from "classnames";
import _ from "lodash";

import Button from "../../Button";
import appLayout from "SharedStyles/appLayout.css";
import styles from "./styles";

class FrontNavi extends Component {
  constructor(props) {
    super(props);
    this.state = { activeSubMenu: false };
    this.toggleSubMenu = this.toggleSubMenu.bind(this);
  }

  toggleSubMenu() {
    this.setState(prevState => {
      return { activeSubMenu: !prevState.activeSubMenu };
    });
  }

  renderSubMenuContent() {
    const { navigationLinks } = this.props;
    const { signedIn, gitHandler } = this.props;
    if (navigationLinks) {
      return (
        <div className={styles.frontNaviSubMenu}>
          <Button
            className={styles.subMenuClose}
            onClick={this.toggleSubMenu}
            alwaysActive
          >
            <i className={classnames("fa fa-close")} />
          </Button>
          <ul>
            <li className={styles.signInLink}>
              <a
                href="/map/attr"
                className={styles.links}
                activeClassName={styles.linkActive}
              >
                <i
                  className={classnames("fa fa-github-alt", styles.subMenuOcto)}
                />
                <span style={{ color: "#000" }}>带团景点</span>
              </a>
            </li>
            <li className={styles.signInLink}>
              <a
                href="/map"
                className={styles.links}
                activeClassName={styles.linkActive}
              >
                <i
                  className={classnames("fa fa-github-alt", styles.subMenuOcto)}
                />
                <span style={{ color: "#000" }}>团餐餐厅</span>
              </a>
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
              const RedirectURI = `${link.link}`;
              return (
                <li key={_.uniqueId("navLink_")}>
                  <a
                    className={styles.links}
                    activeClassName={styles.linkActive}
                    href={RedirectURI}
                  >
                    <i
                      className={classnames(
                        "fa fa-github-alt",
                        styles.subMenuOcto
                      )}
                    />
                    <span className={styles.btnLabel}>{link.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
    return null;
  }

  renderSubMenu() {
    const { activeSubMenu } = this.state;

    if (activeSubMenu) {
      return this.renderSubMenuContent();
    }
    return null;
  }

  renderBurgerButton() {
    return (
      <div className={styles.container}>
        <Button
          alwaysActive
          className={classnames(styles.signInBtn, styles.title)}
          onClick={this.toggleSubMenu}
        >
          <i className="fa fa-bars fa-3x" aria-hidden="true" />
        </Button>
        {this.renderSubMenu()}
      </div>
    );
  }

  render() {
    const { navigationLinks } = this.props;

    if (navigationLinks) {
      return (
        <div className={styles.frontNavi}>{this.renderBurgerButton()}</div>
      );
    }

    return null;
  }
}

FrontNavi.defaultProps = {
  navigationLinks: [
    {
      id: 1,
      name: "回到论坛",
      link: "/"
    }
  ]
};

FrontNavi.propTypes = {
  navigationLinks: React.PropTypes.array
};

export default FrontNavi;
