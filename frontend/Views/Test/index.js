import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./actions";

class Test extends Component {
  componentDidMount() {
    this.props.postGetCity({
      lat: this.props.pos.lat,
      lng: this.props.pos.lng
    });
  }
  componentWillReceiveProps = nextProps => {
    if (nextProps.pos.lat !== this.props.pos.lat) {
      this.props.postGetCity({
        lat: nextProps.pos.lat,
        lng: nextProps.pos.lng
      });
    }
  };
  render() {
    const { city, pos } = this.props;
    const { lat, lng } = pos;

    if (city && lat && lng) {
      return (
        <div style={{ color: "red" }}>
          {city.city}, {city.state}
        </div>
      );
    }
    return <h1>loading...</h1>;
  }
}
function mapStateToProps({ city }) {
  return { city };
}

export default connect(mapStateToProps, actions)(Test);
