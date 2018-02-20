import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./styles.css";
import appLayout from "SharedStyles/appLayout.css";
import Button from "Components/Button";
import classnames from "classnames";

class Login extends Component {
  renderSubMenu() {
    const { authenticated } = this.props.user;

    // render only if we get the forum lists

    function isWeiXin() {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    }

    return (
      <div className={styles.subMenu}>
        {isWeiXin() ? (
          <img src="/src/static/images/openInSafari.png" width="100%" />
        ) : (
          <a className={styles.signInLink} href={"/auth/uber"}>
            <Button className={styles.gitLoginBtn} alwaysActive>
              <i className={classnames("fa fa-mobile", styles.subMenuOcto)} />
              <span className={styles.btnLabel}>手机及Uber登录</span>
            </Button>
          </a>
        )}

        {isWeiXin() ? (
          ""
        ) : (
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
      </div>
    );
  }

  render() {
    if (!this.props.user.authenticated) {
      return this.renderSubMenu();
    }
    return this.props.router.push(`/user/${this.props.user.username}`);
  }
}

function mapStateToProps({ user }) {
  return { user };
}
export default connect(mapStateToProps)(Login);
