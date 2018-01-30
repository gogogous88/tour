import React, { Component } from "react";
import { Link } from "react-router";
import classnames from "classnames";
import onClickOutside from "react-onclickoutside";
import styles from "./styles";
import appLayout from "SharedStyles/appLayout.css";
import Button from "Components/Button";

class UserMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { activeSubMenu: false, activeNaviMenu: false };
    this.toggleSubMenu = this.toggleSubMenu.bind(this);
    this.toggleNaviMenu = this.toggleNaviMenu.bind(this);
  }

  componentWillReceiveProps = async () => {
    await this.setState({
      activeSubMenu: this.props.hello
    });
  };

  handleClickOutside() {
    this.setState({ activeSubMenu: false });
  }

  toggleSubMenu() {
    this.setState(prevState => {
      return { activeSubMenu: !prevState.activeSubMenu };
    });
  }

  renderNaviMenu() {
    const { activeNaviMenu } = this.state;

    if (activeNaviMenu) {
      return this.renderNaviContent();
    }
    return null;
  }

  renderNaviContent() {
    const { navigationLinks } = this.props;
    const { signedIn, gitHandler } = this.props;
    if (navigationLinks) {
      return (
        <div className={styles.subMenu}>
          <Button
            className={styles.subMenuClose}
            onClick={this.toggleNaviMenu}
            alwaysActive
          >
            <i className={classnames("fa fa-close")} />
          </Button>
          <ul>
            <li className={styles.signInLink}>
              <a
                href="/"
                className={styles.links}
                activeClassName={styles.linkActive}
              >
                <i
                  className={classnames("fa fa-github-alt", styles.subMenuOcto)}
                />
                <span style={{ color: "#339ce6" }}>途盖首页</span>
              </a>
            </li>
            <li className={styles.signInLink}>
              <Link
                to="/map"
                onClick={() => {
                  this.setState(prevState => {
                    return { activeNaviMenu: !prevState.activeNaviMenu };
                  });
                }}
                className={styles.links}
                activeClassName={styles.linkActive}
              >
                <i
                  className={classnames("fa fa-github-alt", styles.subMenuOcto)}
                />
                <span style={{ color: "#339ce6" }}>团餐景点导航</span>
              </Link>
            </li>
            <li className={styles.signInLink}>
              <Link
                onClick={() => {
                  this.setState(prevState => {
                    return { activeNaviMenu: !prevState.activeNaviMenu };
                  });
                }}
                to="/car-rental"
                className={styles.links}
                activeClassName={styles.linkActive}
              >
                <i
                  className={classnames("fa fa-github-alt", styles.subMenuOcto)}
                />
                <span style={{ color: "#339ce6" }}>商务租车</span>
              </Link>
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
    const { signedIn, gitHandler } = this.props;

    if (activeSubMenu) {
      return (
        <div className={styles.subMenu}>
          <Button
            className={styles.subMenuClose}
            onClick={this.toggleSubMenu}
            alwaysActive
          >
            <i className={classnames("fa fa-close")} />
          </Button>

          {!signedIn && (
            <a className={styles.signInLink} href={"/auth/uber"}>
              <Button className={styles.gitLoginBtn} alwaysActive>
                <i className={classnames("fa fa-mobile", styles.subMenuOcto)} />
                <span className={styles.btnLabel}>手机及Uber登录</span>
              </Button>
            </a>
          )}

          {/* {!signedIn && (
            <a className={styles.signInLink} href={"/api/user/authViaGitHub"}>
              <Button className={styles.gitLoginBtn} alwaysActive>
                <i
                  className={classnames("fa fa-github-alt", styles.subMenuOcto)}
                />
                <span className={styles.btnLabel}>Github登录</span>
              </Button>
            </a>
          )} */}

          {!signedIn && (
            <a className={styles.signInLink} href={"/auth/google"}>
              <Button className={styles.gitLoginBtn} alwaysActive>
                <i
                  className={classnames(
                    "fa fa-google-plus-official",
                    styles.subMenuOcto
                  )}
                />
                <span className={styles.btnLabel}>Google登录</span>
              </Button>
            </a>
          )}

          {/* {!signedIn && (
            <a className={styles.signInLink} href={"/auth/google"}>
              <Button className={styles.gitLoginBtn} alwaysActive>
                <i
                  className={classnames("fa fa fa-weixin", styles.subMenuOcto)}
                />
                <span className={styles.btnLabel}>微信用户登录</span>
              </Button>
            </a>
          )} */}

          {signedIn && (
            <span onClick={this.toggleSubMenu}>
              <Link className={styles.subMenuItem} to={`/user/${gitHandler}`}>
                我的论坛
              </Link>
            </span>
          )}
          {/* { signedIn && <a className={styles.subMenuItem} href={'#'}>Settings</a> } */}
          {signedIn && (
            <a className={styles.subMenuItem} href={"/api/user/signout"}>
              登出
            </a>
          )}
        </div>
      );
    }

    return null;
  }

  toggleNaviMenu() {
    this.setState(prevState => {
      return { activeNaviMenu: !prevState.activeNaviMenu };
    });
  }

  render() {
    const { signedIn, userName, avatar, signOutAction } = this.props;

    console.log("this.props.hello", this.props.hello);

    if (signedIn) {
      return (
        <div style={{ position: "relative" }}>
          <div className={styles.container}>
            <img
              onClick={this.toggleSubMenu.bind(this)}
              className={styles.userAvatar}
              src={avatar}
              alt={`${userName} Avatar`}
            />
            <span
              className={styles.title}
              onClick={this.toggleSubMenu.bind(this)}
            >
              {userName}
            </span>

            <img
              style={{ marginLeft: 15 }}
              src="/src/static/icons/buttons/burger-menu.svg"
              onClick={this.toggleNaviMenu.bind(this)}
              width="35px"
            />
          </div>
          {this.renderNaviMenu()}
          {this.renderSubMenu()}
        </div>
      );
    }
    console.log("check", this.state.activeSubMenu);
    return (
      <div className={styles.container}>
        <div className={appLayout.showExSmallBP}>
          <Button
            alwaysActive
            className={classnames(styles.signInBtn, styles.title)}
            onClick={this.toggleSubMenu}
          >
            注册 / 登录
          </Button>
        </div>
        <div className={appLayout.showOnSmallBP}>
          <div>
            <img
              src="/src/static/icons/buttons/login.svg"
              alwaysActive
              className={classnames(styles.loginStyle)}
              onClick={this.toggleSubMenu}
            />
          </div>
          <div style={{ marginRight: 20, marginLeft: 15, marginTop: 3 }}>
            <img
              src="/src/static/icons/buttons/burger-menu.svg"
              onClick={this.toggleNaviMenu}
              width="35px"
            />
          </div>
        </div>
        {this.renderNaviMenu()}
        {this.renderSubMenu()}
      </div>
    );
  }
}

UserMenu.defaultProps = {
  signedIn: false,
  userName: "",
  gitHandler: "",
  avatar: ""
};

UserMenu.propTypes = {
  signedIn: React.PropTypes.bool.isRequired,
  userName: React.PropTypes.string,
  gitHandler: React.PropTypes.string,
  avatar: React.PropTypes.string
};

export default onClickOutside(UserMenu);
