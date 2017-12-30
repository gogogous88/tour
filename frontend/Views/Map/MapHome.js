import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import _ from "lodash";

import MapButton from "../../Components/MapButton";
import appLayout from "SharedStyles/appLayout.css";
import * as actions from "./actions";

import MapHere from "./MapHere";
import FrontNavi from "../../Components/Header/NavigationBar/FrontNavi";

class MapHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: []
    };
  }
  componentDidMount() {
    this.props.fetchMapData().then(() => {
      this.setState({ locations: this.props.MapDataMore.delis });
    });
  }

  renderDelis(event) {
    event.preventDefault();
    this.props.fetchMapData().then(() => {
      this.setState({ locations: this.props.MapDataMore.delis });
    });
  }

  renderAttrs(event) {
    event.preventDefault();
    this.props.fetchAttrs().then(() => {
      this.setState({ locations: this.props.MapDataMore.attrs });
    });
  }
  renderMap() {
    const location = { lat: 38.998459, lng: -97.563037 };
    console.log("checking", this.state.locations);

    return (
      <MapHere
        center={location}
        locations={this.state.locations}
        pin="/src/static/images/icons8-map-pin-orange-48 2.png"
      />
    );
  }

  render() {
    if (_.isEmpty(this.state.locations)) {
      return <div>loading...</div>;
    }
    return (
      <div>
        {this.renderMap()}
        <div style={{ zIndex: 1 }}>
          <FrontNavi />
        </div>
        <MapButton
          onClickDelis={() => {
            this.props.fetchMapData();
          }}
          onClickAttrs={() => {
            this.props.fetchAttrs();
          }}
        />
        {/* <button onClick={this.renderDelis.bind(this)}>团餐</button>
        <br />
        <button onClick={this.renderAttrs.bind(this)}>景点</button> */}
      </div>
    );
  }
}

function mapStateToProps({ MapDataMore }) {
  return { MapDataMore };
}

export default connect(mapStateToProps, actions)(MapHome);
