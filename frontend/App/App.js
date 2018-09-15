import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';
import { Link } from 'react-router';
import Header from 'Containers/Header';
import Footer from 'Components/Footer';
import SlideShow from 'Components/SlideShow';
import appLayout from 'SharedStyles/appLayout.css';
import styles from './styles.css';
import FooterNav from 'Components/SideBar/FooterNav';
import axios from 'axios';
import _ from 'lodash';

import { getForums, updateCurrentForum, getUser } from './actions';

class AppContainer extends Component {
  state = { news: [] };
  componentDidMount() {
    const { params, updateCurrentForum, getForums, getUser } = this.props;

    // get all forum list
    getForums();

    // check for authenticated user
    getUser();

    // set current forum based on route
    const currentForum = params.forum || '';
    updateCurrentForum(currentForum);
  }

  componentDidUpdate() {
    const { forums, params, currentForum, updateCurrentForum } = this.props;

    let newCurrentForum = '';
    if (params.forum) newCurrentForum = params.forum;
    else if (forums) newCurrentForum = forums[0].forum_slug;

    // update current forum if necessery
    if (newCurrentForum !== currentForum) updateCurrentForum(newCurrentForum);
  }

  renderHomePage() {
    const { forums, currentForum, router } = this.props;

    if (this.props.location.pathname === '/') {
      return (
        <div style={{ marginLeft: 10, marginRight: 10, marginTop: 25 }}>
          <div ref="wechat" />
          <div className={classnames(appLayout.showOnMediumBP)}>
            <div className="card-body">
              <div className={styles.blockContainer}>
                <div className={styles.rowAround}>
                  <Link to="/shun_feng_che" className={styles.buttonStyle}>
                    <span className={styles.buttonFontStyle}>顺风车</span>
                  </Link>
                  <Link to="/pin_fang" className={styles.buttonStyle}>
                    <span className={styles.buttonFontStyle}>拼房</span>
                  </Link>
                  <Link to="/market" className={styles.buttonStyle}>
                    <span className={styles.buttonFontStyle}>市场</span>
                  </Link>
                  <Link to="/fa_tuan_jie_huo" className={styles.buttonStyle}>
                    <span className={styles.buttonFontStyle}>发团</span>
                  </Link>
                </div>
                <div className={styles.rowAround}>
                  <Link to="/map" className={styles.buttonStyle}>
                    <span className={styles.buttonFontStyle}>团餐</span>
                  </Link>
                  <Link to="/map/hotel" className={styles.buttonStyle}>
                    <span className={styles.buttonFontStyle}>酒店</span>
                  </Link>
                  <Link to="/car-rental" className={styles.buttonStyle}>
                    <span className={styles.buttonFontStyle}>租车</span>
                  </Link>
                  <Link to="/tour_wiki" className={styles.buttonStyle}>
                    <span className={styles.buttonFontStyle}>百科</span>
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

    // function isWeiXin() {
    //   var ua = window.navigator.userAgent.toLowerCase();
    //   if (ua.match(/MicroMessenger/i) == "micromessenger") {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }

    // render only if we get the forum lists
    // if (isWeiXin()) {
    //   return <img src="/src/static/images/openInSafari.png" width="100%" />;
    // }
    if (forums) {
      // console.log('======>', news);
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
          <Header
            router={this.props.router}
            currentForum={currentForum}
            path={this.props.location.pathname}
          />

          <div className={appLayout.showOnMediumBP}>
            {this.props.location.pathname === '/' ? (
              <SlideShow
                img1="/src/static/banners/zu_che_banner.jpg"
                link1="/car-rental"
                img2="/src/static/banners/tuan_can_banner.jpg"
                link2="/map"
                img3="/src/static/images/HomeGNC.jpeg"
                link3="/wiki"
              />
            ) : (
              ''
            )}
          </div>
          <div>{this.renderHomePage()}</div>

          <div className={appLayout.showOnLargeBP}>{this.props.children}</div>
          <div className={classnames(appLayout.showOnMediumBP)}>
            <div style={{ marginLeft: 10, marginRight: 10 }}>
              {this.props.children}
              {/* <FeedBox currentForum="tour_wiki" /> */}
            </div>
          </div>
          <div style={{ marginLeft: 10, marginRight: 10 }}>
            <Footer />
          </div>
          <div className={appLayout.showOnMediumBP}>
            <FooterNav />
          </div>
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
      currentForum: state.app.currentForum,
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
      },
    };
  }
)(AppContainer);
