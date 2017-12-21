import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import * as actions from "./actions";

import MapHere from "./MapHere";

class MapHome extends Component {
  componentDidMount() {
    this.props.fetchMapData();
  }

  renderMap() {
    const location = { lat: 43, lng: -72.9 };

    if (!_.isEmpty(this.props.MapDataMore)) {
      console.log(this.props.MapDataMore);
      return <MapHere center={location} />;
    }
    return <div>loading</div>;
  }

  render() {
    return <div>{this.renderMap()}</div>;
  }
}

function mapStateToProps(state) {
  return { MapDataMore: state.MapDataMore };
}

export default connect(mapStateToProps, actions)(MapHome);
