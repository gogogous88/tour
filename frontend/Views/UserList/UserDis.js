import React, { Component } from "react";
import geodist from "geodist";
import _ from "lodash";
import styles from "./styles.css";

class UserDis extends Component {
  constructor(props) {
    super(props);
    this.state = { pos: {} };
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.setState({ pos });
      });
    }
  }

  renderList() {
    const { locations } = this.props;

    const users = _.mapKeys(locations, "_id");
    if (_.isEmpty(this.state.pos)) {
      return <div>loading</div>;
    }

    return _.map(users, eachUser => {
      const { name, pos, _id, avatarUrl, level, location } = eachUser;
      const mylat = this.state.pos.lat;
      const mylng = this.state.pos.lng;
      const userLat = !eachUser.pos ? 33.7489 : pos.lat;
      const userLng = !eachUser.pos ? -84.3881 : pos.lng;
      const userLevel = !level ? "3年半" : level;
      const userLocation = !location ? "美国" : location;
      const dist = geodist(
        { lat: mylat, lon: mylng },
        { lat: userLat, lon: userLng }
      );
      return (
        <li key={_id}>
          <div style={{ marginTop: 10 }}>
            <div className={styles.rowListStyle}>
              <div>
                <img src={avatarUrl} width="100px" height="100px" />
              </div>
              <div>
                <div>{name}</div>
                <div>实时距离:{dist}英里</div>
                <div>来自:{userLocation}</div>
                <div>说明:{userLevel}</div>
              </div>
            </div>
          </div>
        </li>
      );
    });
  }
  render() {
    return (
      <div>
        <ul>{this.renderList()}</ul>
      </div>
    );
  }
}

export default UserDis;
