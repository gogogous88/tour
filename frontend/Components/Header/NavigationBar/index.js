import React, { Component } from "react";
import { Link, IndexLink } from "react-router";
import classnames from "classnames";
import _ from "lodash";

import Button from "../../Button";
import appLayout from "SharedStyles/appLayout.css";
import styles from "./styles.css";

const forums = {
  shun_feng_che: "顺风车",
  pin_fang: "拼房",
  fa_tuan_jie_huo: "发团接活",
  market: "商品信息",
  tour_wiki: "攻略信息"
};

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = { activeSubMenu: false, searchToggle: false };
    this.toggleSubMenu = this.toggleSubMenu.bind(this);
  }

  toggleSearchMenu() {
    this.setState(prevState => {
      return { searchToggle: !prevState.searchToggle };
    });
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
        <div className={styles.subMenu}>
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
                href="/map"
                className={styles.links}
                activeClassName={styles.linkActive}
              >
                <i
                  className={classnames("fa fa-github-alt", styles.subMenuOcto)}
                />
                <span style={{ color: "#339ce6" }}>团餐景点导航</span>
              </a>
            </li>
            <li className={styles.signInLink}>
              <a
                href="/car-rental"
                className={styles.links}
                activeClassName={styles.linkActive}
              >
                <i
                  className={classnames("fa fa-github-alt", styles.subMenuOcto)}
                />
                <span style={{ color: "#339ce6" }}>商务租车</span>
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

  renderSearchContent() {
    const { currentForum, navigationLinks, signedIn, gitHandler } = this.props;
    const currentForumURL = `/${currentForum.currentForum}`;

    // const forumName = currentForum ? forums.currentForum.currentForum : "";
    // console.log(forumName);

    if (navigationLinks) {
      return (
        <div className={styles.subMenu}>
          <Button
            className={styles.subMenuClose}
            onClick={this.toggleSearchMenu.bind(this)}
            alwaysActive
          >
            <i className={classnames("fa fa-close")} />
          </Button>
          <ul>
            <li className={styles.signInLink}>
              <Link
                className={styles.links}
                onClick={this.toggleSearchMenu.bind(this)}
                to={{
                  pathname: `${currentForumURL}`,
                  query: { search: "word" }
                }}
              >
                <i className={classnames("fa fa-search", styles.subMenuOcto)} />

                <span style={{ color: "#339ce6" }}>按文字搜索</span>
              </Link>
            </li>
            <li className={styles.signInLink}>
              <Link
                onClick={() => {
                  this.setState(prevState => {
                    return { searchToggle: !prevState.searchToggle };
                  });
                }}
                className={styles.links}
                to={{
                  pathname: `${currentForumURL}`,
                  query: { search: "date" }
                }}
              >
                <i className={classnames("fa fa-search", styles.subMenuOcto)} />
                <span style={{ color: "#339ce6" }}>按日期搜索</span>
              </Link>
            </li>
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

  renderSearchMenu() {
    const { searchToggle } = this.state;

    if (searchToggle) {
      return this.renderSearchContent();
    }
    return null;
  }

  renderBurgerButton() {
    return (
      <div className={classnames(appLayout.showOnSmallBP)}>
        <div className={styles.container}>
          {/* <Button
            alwaysActive
            className={classnames(styles.signInBtn, styles.title)}
            onClick={this.toggleSubMenu}
          >
            <img
              src="/src/static/icons/buttons/blacksquare.svg"
              aria-hidden="true"
            />
          </Button> */}

          <div className="file-field input-field" />

          <div className="input-field col s6">
            <span>
              <textarea
                onClick={this.renderSearchOptions.bind(this)}
                id="icon_prefix"
                type="text"
                style={{
                  borderBottomLeftRadius: "10px",
                  borderTopLeftRadius: "10px",
                  borderBottomRightRadius: "10px",
                  borderTopRightRadius: "10px",
                  width: "80%",
                  borderColor: "#e4e1e1a8",
                  borderWidth: "4px"
                }}
                // className="validate"
                readOnly="true"
              />
              <label htmlFor="icon_prefix" style={{ paddingLeft: "20px" }}>
                <span>
                  <i
                    className={classnames(styles.iconA, "fa fa-search fa-2x")}
                  />
                </span>&nbsp;&nbsp;按日期/城市等搜索
              </label>
            </span>
          </div>
          {/* <div>
            <img src="/src/static/icons/buttons/searchBar.png" width="100%" />
          </div> */}

          <div className="file-field input-field">
            <button
              className="btn-floating btn grey lighten-3 pulse "
              onClick={this.toggleSubMenu}
            >
              <i className="material-icons black-text">menu</i>
            </button>
          </div>

          {this.renderSubMenu()}
        </div>
      </div>
    );
  }

  renderSearchOptions() {
    this.setState(prevState => {
      return { searchToggle: !prevState.searchToggle };
    });
  }

  renderSearchBar() {
    return (
      <div>
        <button
          className="btn-floating btn grey lighten-3"
          onClick={this.renderSearchOptions.bind(this)}
        >
          <i className="material-icons black-text">search</i>
        </button>
      </div>
    );
  }

  render() {
    const { navigationLinks, currentForum } = this.props;

    console.log("navigation bar", this.props);

    const currentForumURL = `/${currentForum.currentForum}`;

    if (navigationLinks) {
      return (
        <div>
          <div className={appLayout.secondaryNavContent}>
            <ul className={styles.navigationBar}>
              <li>
                <a
                  href="/map"
                  className={styles.links}
                  activeClassName={styles.linkActive}
                >
                  团餐景点导航
                </a>
              </li>
              <li>
                <a
                  href="/car-rental"
                  className={styles.links}
                  activeClassName={styles.linkActive}
                >
                  商务租车
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

                return (
                  <li key={_.uniqueId("navLink_")}>
                    <a
                      className={styles.links}
                      activeClassName={styles.linkActive}
                      href={link.link}
                    >
                      {link.name}
                    </a>
                  </li>
                );
              })}
              <li className={styles.links}>{this.renderSearchBar()}</li>
            </ul>
          </div>

          {this.renderSearchMenu()}
          {this.renderBurgerButton()}
        </div>
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
