import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import classnames from "classnames";
import { Link } from "react-router";
import Header from "Containers/Header";
import Footer from "Components/Footer";
import SlideShow from "Components/SlideShow";
import appLayout from "SharedStyles/appLayout.css";
import styles from "./styles.css";

import { getForums, updateCurrentForum, getUser } from "./actions";

class AppContainer extends Component {
  componentDidMount() {
    const { params, updateCurrentForum, getForums, getUser } = this.props;

    // get all forum list
    getForums();

    // check for authenticated user
    getUser();

    // set current forum based on route
    const currentForum = params.forum || "";
    updateCurrentForum(currentForum);
  }

  componentDidUpdate() {
    const { forums, params, currentForum, updateCurrentForum } = this.props;

    let newCurrentForum = "";
    if (params.forum) newCurrentForum = params.forum;
    else if (forums) newCurrentForum = forums[0].forum_slug;

    // update current forum if necessery
    if (newCurrentForum !== currentForum) updateCurrentForum(newCurrentForum);
  }

  renderHomePage() {
    const { forums, currentForum } = this.props;
    if (this.props.location.pathname === "/") {
      return (
        <div style={{ marginLeft: 10, marginRight: 10 }}>
          <div
            className={classnames(
              appLayout.showOnMediumBP,

              "card my-4"
            )}
          >
            <div className="card-header">板块</div>
            <div className="card-body">
              <div className={styles.blockContainer}>
                <div className={styles.rowAround}>
                  <Link to="/shun_feng_che">
                    <img src="/src/static/icons/buttons/shun_feng_che.png" />
                  </Link>
                  <Link to="/pin_fang">
                    <img src="/src/static/icons/buttons/pin_fang.png" />
                  </Link>
                  <Link to="/market">
                    <img src="/src/static/icons/buttons/mai_mai.png" />
                  </Link>
                  <Link to="/fa_tuan_jie_huo">
                    <img src="/src/static/icons/buttons/fa_tuan.png" />
                  </Link>
                </div>
                <div className={styles.rowAround}>
                  <Link to="/map">
                    <img src="/src/static/icons/buttons/tuan_can.png" />
                  </Link>
                  <Link to="/map/attr">
                    <img src="/src/static/icons/buttons/jing_dian.png" />
                  </Link>
                  <Link to="/car-rental">
                    <img src="/src/static/icons/buttons/zu_che.png" />
                  </Link>
                  <Link to="/tour_wiki">
                    <img src="/src/static/icons/buttons/bai_ke.png" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  render() {
    const { forums, currentForum } = this.props;

    // render only if we get the forum lists
    if (forums) {
      return (
        <div>
          <Helmet>
            <title>途盖大导通</title>
          </Helmet>
          {/* <div className={styles.gitForkTag}>
            <a className={styles.gitLink} href="#" target="_blank">
              下载途盖儿通App
            </a>
          </div> */}
          <Header currentForum={currentForum} />
          <div className={appLayout.showOnMediumBP}>
            {this.props.location.pathname === "/" ? (
              <SlideShow
                img1="/src/static/banners/zu_che_banner.jpg"
                link1="/car-rental"
                img2="/src/static/banners/tuan_can_banner.jpg"
                link2="/map"
              />
            ) : (
              ""
            )}
          </div>

          {this.renderHomePage()}

          <div>{this.props.children}</div>
          <Footer />
        </div>
      );
    }

    return <div className={styles.loadingWrapper}>Loading...</div>;
  }
}

export default connect(
  state => {
    return {
      forums: state.app.forums,
      currentForum: state.app.currentForum
    };
  },
  dispatch => {
    return {
      getForums: () => {
        dispatch(getForums());
      },
      updateCurrentForum: currentForum => {
        dispatch(updateCurrentForum(currentForum));
      },
      getUser: () => {
        dispatch(getUser());
      }
    };
  }
)(AppContainer);
