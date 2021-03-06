import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";

import appLayout from "SharedStyles/appLayout";
import styles from "./styles";

// components for Header
import UserMenu from "Components/Header/UserMenu";
import Logo from "Components/Header/Logo";
import NavigationBar from "Components/Header/NavigationBar";
import PlaceholderImage from "SharedStyles/placeholder.jpg";

class Header extends Component {
  renderNavLinks() {
    const { forums, router } = this.props;

    if (forums) {
      return forums.map(forum => {
        return {
          id: forum._id,
          name: forum.forum_name,
          link: `/${forum.forum_slug}`
        };
      });
    }

    return null;
  }

  render() {
    const { authenticated, name, username, avatarUrl } = this.props.user;

    const currentForum = this.props;

    const { router } = this.props;

    return (
      <div className={classnames(appLayout.constraintWidth)}>
        <div className={styles.headerTop}>
          <Logo router={router} />
          <UserMenu
            signedIn={authenticated}
            userName={name || username}
            gitHandler={username}
            avatar={avatarUrl}
            currentForum={currentForum}
            navigationLinks={this.renderNavLinks()}
          />
        </div>
        <NavigationBar
          currentForum={currentForum}
          navigationLinks={this.renderNavLinks()}
          path={this.props.path}
        />
      </div>
    );
  }
}

export default connect(state => {
  return {
    user: state.user,
    forums: state.app.forums
  };
})(Header);
