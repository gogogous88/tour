//「 」【】
import React, { Component } from 'react';
import classnames from 'classnames';
import Moment from 'moment';
import moment from 'moment';
import styles from './styles';
import _ from 'lodash';

import Loading from '../../Components/Loading';
import DiscussionBox from './DiscussionBox';

import keys from '../../../config/credentials';

class FeedBox extends Component {
  renderSort() {
    const { activeSortingMethod, onChangeSortingMethod } = this.props;

    if (this.props.type === 'general') {
      return (
        <div className={styles.sortList}>
          <span
            className={classnames(
              styles.sort,
              activeSortingMethod === 'date' && styles.sortActive
            )}
            onClick={() => onChangeSortingMethod('date')}
          >
            Latest
          </span>
          <span
            className={classnames(
              styles.sort,
              activeSortingMethod === 'popularity' && styles.sortActive
            )}
            onClick={() => onChangeSortingMethod('popularity')}
          >
            Popular
          </span>
        </div>
      );
    }
    return null;
  }

  renderEmptyDiscussionLine(loading, discussions) {
    if (!loading) {
      if (!discussions || discussions.length === 0) {
        return <div className={styles.loading}>目前还未发表文章...</div>;
      }
    }
  }

  renderImageURL(discussion) {
    switch (discussion.forum.forum_slug) {
      case 'shun_feng_che':
        if (discussion.sup_or_req === '提供') {
          const shunFengURL = '/src/static/images/sup_shun_feng_che.png';
          return shunFengURL;
        } else {
          const shunFengURL = '/src/static/images/req_shun_feng_che.png';
          return shunFengURL;
        }

      case 'pin_fang':
        if (discussion.sup_or_req === '提供') {
          const pinFangURL = '/src/static/images/sup_pin_fang.png';
          return pinFangURL;
        } else {
          const pinFangURL = '/src/static/images/req_pin_fang.png';
          return pinFangURL;
        }

      case 'fa_tuan_jie_huo':
        if (discussion.sup_or_req === '提供') {
          const faTuanURL = '/src/static/images/sup_jie_tuan.png';
          return faTuanURL;
        } else {
          const faTuanURL = '/src/static/images/req_jie_tuan.png';
          return faTuanURL;
        }

      case 'market':
        if (discussion.sup_or_req === '提供') {
          const marketURL = '/src/static/images/sup_market.png';
          return marketURL;
        } else {
          const marketURL = '/src/static/images/sup_market.png';
          return marketURL;
        }

      case 'tour_wiki':
        if (discussion.sup_or_req === '提供') {
          const faTuanURL = '/src/static/images/baike.png';
          return faTuanURL;
        } else {
          const faTuanURL = '/src/static/images/gong_lve.png';
          return faTuanURL;
        }

      default:
        return discussion.title;
    }
  }

  renderTitle(discussion) {
    switch (discussion.forum.forum_slug) {
      case 'shun_feng_che':
        const shunFengTitle = `${discussion.sup_or_req}拼车-:「${moment(
          discussion.pdate
        ).format('MM/DD')}--${discussion.ploc}--->${discussion.rloc}」(${moment(
          discussion.pdate
        ).format('YYYY')}),我的联系方式...
        `;
        // 联系方式：「${discussion.ph_no}」
        return shunFengTitle;

      case 'pin_fang':
        const pinFangTitle = `${discussion.sup_or_req}拼房:「${
          discussion.ploc
        }--${moment(discussion.rdate[0]).format('MM/DD')}--->${moment(
          discussion.rdate[1]
        ).format('MM/DD')}」(${moment(discussion.rdate[0]).format(
          'YYYY'
        )}年),我的联系方式...
        `;
        return pinFangTitle;

      case 'market':
        if (discussion.sup_or_req === '提供') {
          const marketTitle = `「${discussion.ploc}」
            出售：「${discussion.title}」,价格「${
            discussion.rate
          }」,我的联系方式...
          `;
          return marketTitle;
        } else {
          const marketTitle = `「${discussion.ploc}」求购商品：「${
            discussion.title
          }」,我的联系方式...
          `;
          return marketTitle;
        }

      case 'fa_tuan_jie_huo':
        const {
          sup_or_req,
          rdate,
          ploc,
          rloc,
          ph_no,
          vehicleType,
        } = discussion;
        if (sup_or_req === '提供') {
          const faTuanTitle = `「${moment(rdate[0]).format(
            'MM/DD'
          )}-${ploc}」开始「${moment(rdate[1]).format(
            'MM/DD'
          )}-${rloc}」结束，需要「${vehicleType}」,有空的导游请与我取得联系.....`;
          return faTuanTitle;
        } else {
          const faTuanTitle = `我从「${moment(rdate[0]).format(
            'MM/DD'
          )}」到「${moment(rdate[1]).format(
            'MM/DD'
          )}」期间可接「${ploc}」开始的团......`;
          return faTuanTitle;
        }

      default:
        return discussion.title;
    }
  }

  renderDiscussion() {
    const {
      type,
      loading,
      discussions,
      currentForum,
      userProfile,
      searchDate,
    } = this.props;

    let discussionBoxTitle = '';
    if (type === 'general') discussionBoxTitle = 'Discussions';
    if (type === 'pinned') discussionBoxTitle = 'Pinned';
    const filterDiscussions =
      discussions &&
      discussions.filter(discussion => {
        if (this.props.searchStatus && discussion.pdate) {
          const theDate = moment(discussion.pdate).format('MM/DD');
          const searchDateToString = moment(this.props.searchDate).format(
            'MM/DD'
          );

          const { pdate } = discussion;
          const d = new Date(pdate);

          const d1 = d.getDate().toString();
          const m1 = d.getMonth().toString();
          const y1 = d.getFullYear().toString();
          const searchd = new Date(searchDate);
          const searchd1 = searchd.getDate().toString();
          const searchm1 = searchd.getMonth().toString();
          const searchy1 = searchd.getFullYear().toString();

          return (
            d1.indexOf(searchd1) !== -1 &&
            m1.indexOf(searchm1) !== -1 &&
            y1.indexOf(searchy1) !== -1
          );
        }
        if (this.props.searchStatus && discussion.rdate) {
          const checkInDate = new Date(discussion.rdate[0]);
          const checkOutDate = new Date(discussion.rdate[1]);

          const checkind = checkInDate.getDate().toString();
          const checkinm = checkInDate.getMonth().toString();
          const checkiny = checkInDate.getFullYear().toString();

          const checkoutd = checkOutDate.getDate().toString();
          const checkoutm = checkOutDate.getMonth().toString();
          const checkouty = checkOutDate.getFullYear().toString();

          const searchd = new Date(searchDate);
          const searchd1 = searchd.getDate().toString();
          const searchm1 = searchd.getMonth().toString();
          const searchy1 = searchd.getFullYear().toString();

          return (
            (checkind.indexOf(searchd1) !== -1 &&
              checkinm.indexOf(searchm1) !== -1 &&
              checkiny.indexOf(searchy1) !== -1) ||
            (checkoutd.indexOf(searchd1) !== -1 &&
              checkoutm.indexOf(searchm1) !== -1 &&
              checkouty.indexOf(searchy1) !== -1)
          );
        }

        if (!discussion.content) {
          return (
            discussion.ph_no.indexOf(this.props.searchTerm) !== -1 ||
            discussion.vehicleType.indexOf(this.props.searchTerm) !== -1 ||
            discussion.pname.indexOf(this.props.searchTerm) !== -1 ||
            discussion.rloc.indexOf(this.props.searchTerm) !== -1 ||
            discussion.ploc.indexOf(this.props.searchTerm) !== -1 ||
            discussion.title.indexOf(this.props.searchTerm) !== -1
          );
        }
        return (
          discussion.content.indexOf(this.props.searchTerm) !== -1 ||
          discussion.ph_no.indexOf(this.props.searchTerm) !== -1 ||
          discussion.vehicleType.indexOf(this.props.searchTerm) !== -1 ||
          discussion.pname.indexOf(this.props.searchTerm) !== -1 ||
          discussion.rloc.indexOf(this.props.searchTerm) !== -1 ||
          discussion.ploc.indexOf(this.props.searchTerm) !== -1 ||
          discussion.title.indexOf(this.props.searchTerm) !== -1
        );
      });
    return (
      <div>
        {loading && (
          <div>
            <Loading />
          </div>
        )}
        {this.renderEmptyDiscussionLine(loading, discussions)}
        {userProfile
          ? !loading && (
              <div className={styles.discussions}>
                {/* filterDiscussions &&
          filterDiscussions
            .filter(searchingFor(this.props.searchTerm))
            .map(discussion => { */}

                {discussions &&
                  discussions.map(discussion => {
                    return (
                      <DiscussionBox
                        userProfile={userProfile}
                        key={discussion._id}
                        userName={
                          discussion.user.name || discussion.user.username
                        }
                        userGitHandler={discussion.user.username}
                        discussionTitle={this.renderTitle(discussion)}
                        time={discussion.date}
                        tags={discussion.tags}
                        imageURL={this.renderImageURL(discussion)}
                        opinionCount={discussion.opinion_count}
                        voteCount={discussion.favorites.length}
                        link={`/${
                          userProfile
                            ? discussion.forum.forum_slug
                            : currentForum
                        }/discussion/${discussion.discussion_slug}`}
                      />
                    );
                  })}
              </div>
            )
          : !loading && (
              <div className={styles.discussions}>
                {/* filterDiscussions &&
          filterDiscussions
            .filter(searchingFor(this.props.searchTerm))
            .map(discussion => { */}

                {discussions &&
                  filterDiscussions.map(discussion => {
                    const discussionYear = `${moment(discussion.date).format(
                      'YYYY'
                    )}年`;
                    return (
                      <DiscussionBox
                        userProfile={userProfile}
                        key={discussion._id}
                        userName={
                          discussion.user.name || discussion.user.username
                        }
                        userGitHandler={discussion.user.username}
                        discussionTitle={this.renderTitle(discussion)}
                        time={discussion.date}
                        tags={discussion.tags}
                        imageURL={this.renderImageURL(discussion)}
                        opinionCount={discussion.opinion_count}
                        voteCount={discussion.favorites.length}
                        link={`/${
                          userProfile
                            ? discussion.forum.forum_slug
                            : currentForum
                        }/discussion/${discussion.discussion_slug}`}
                      />
                    );
                  })}
              </div>
            )}
      </div>
    );
  }

  render() {
    const {
      type,
      loading,
      discussions,
      currentForum,
      userProfile,
      searchDate,
    } = this.props;

    let discussionBoxTitle = '';
    if (type === 'general') discussionBoxTitle = 'Discussions';
    if (type === 'pinned') discussionBoxTitle = 'Pinned';

    //shun_feng_che, pin_fang, fa_tuan_jie_huo, market

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.title}>{discussionBoxTitle}</span>
          {!userProfile && this.renderSort()}
        </div>
        {this.renderDiscussion(loading, discussions)}
      </div>
    );
  }
}

FeedBox.defaultProps = {
  type: 'general',
  loading: false,
  discussions: [],
  currentForum: 'general',
  activeSortingMethod: 'date',
  onChangeSortingMethod: val => {},
  userProfile: false,
};

FeedBox.propTypes = {
  type: React.PropTypes.oneOf(['general', 'pinned']),
  loading: React.PropTypes.bool,
  discussions: React.PropTypes.array,
  currentForum: React.PropTypes.string,
  activeSortingMethod: React.PropTypes.string,
  onChangeSortingMethod: React.PropTypes.func,
  userProfile: React.PropTypes.bool,
};

export default FeedBox;
