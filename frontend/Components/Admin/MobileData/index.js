import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import { fetchAllFirebaseData } from './actions';
import _ from 'lodash';
import moment from 'moment';

var config = {
  apiKey: 'AIzaSyCXMhVRR_-l9NXmRFSqhcoIbMkG_yjvVPQ',
  authDomain: 'mark-tinder-clone.firebaseapp.com',
  databaseURL: 'https://mark-tinder-clone.firebaseio.com',
  projectId: 'mark-tinder-clone',
  storageBucket: 'mark-tinder-clone.appspot.com',
  messagingSenderId: '655843029305',
};
firebase.initializeApp(config);

class MobileData extends Component {
  state = { allFirebaseData: {} };

  componentDidMount = async () => {
    await this.props.fetchAllFirebaseData();
    // await this.setState({ allFirebaseData: this.props.allFirebaseData });
  };

  componentWillReceiveProps = newProps => {
    this.props.allFirebaseData !== newProps.allFirebaseData &&
      this.setState({ allFirebaseData: newProps.allFirebaseData });
  };

  render() {
    if (this.state.allFirebaseData && !_.isEmpty(this.state.allFirebaseData)) {
      let { users, geoData } = this.state.allFirebaseData;

      return (
        <div>
          <table>
            <thead>
              <tr>
                <th>名字</th>
                <th>驻扎地</th>
                <th>电话</th>
                <th>注册时间</th>
                <th>uid</th>
                <th>个人照片</th>
              </tr>
            </thead>
            <tbody>
              {_.map(users, (each, i) => {
                if (each && each.userDetails && each.userDetails.uid) {
                  if (
                    !_.isEmpty(each.userDetails.uid) &&
                    !_.isEmpty(each.userDetails.phoneNumber)
                  ) {
                    return (
                      <tr key={each.userDetails.uid}>
                        <td>{each.userDetails.displayName}</td>
                        <td>
                          {String(each.userDetails.location).substring(0, 4)}
                        </td>
                        <td>
                          {each.userDetails.contryCode}
                          {each.userDetails.phoneNumber}
                        </td>
                        <td>
                          {moment(Number(each.userDetails.createdAt)).format(
                            'YY-MM-DD'
                          )}
                        </td>
                        <td>{each.userDetails.uid}</td>
                      </tr>
                    );
                  }
                  return null;
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
      );
    }
    return <p />;
  }
}

const mapStateToProps = ({ allFirebaseData }) => {
  return { allFirebaseData: allFirebaseData.allFirebaseData };
};

export default connect(
  mapStateToProps,
  { fetchAllFirebaseData }
)(MobileData);
