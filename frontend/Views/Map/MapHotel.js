import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import _ from "lodash";
import Loading from "../../Components/Loading";

import MapButton from "../../Components/MapButton";
import appLayout from "SharedStyles/appLayout.css";
import * as actions from "./actions";

import MapHere from "./MapHere";
import FrontNavi from "../../Components/Header/NavigationBar/FrontNavi";

class MapHotel extends Component {
  constructor(props) {
    super(props);

    this.state = { locations: [] };
  }
  componentDidMount() {
    this.props.fetchHotels().then(() => {
      this.setState({ locations: this.props.MapDataMore.hotels });
    });
  }

  renderMap() {
    const location = { lat: 43, lng: -72.9 };

    return (
      <MapHere
        center={location}
        locations={this.state.locations}
        pin="https://png.icons8.com/map-pin/color/43/2980b9"
      />
    );
  }

  render() {
    if (_.isEmpty(this.state.locations)) {
      return <Loading />;
    }
    return (
      <div className={appLayout.constraintWidth}>
        {this.renderMap()}
        {/* <div style={{ zIndex: 1 }}>
          <FrontNavi />
        </div> */}
        <MapButton
          onClickDelis={() => {
            this.props.fetchMapData();
          }}
          onClickAttrs={() => {
            this.props.fetchAttrs();
          }}
        />
      </div>
    );
  }
}

function mapStateToProps({ MapDataMore }) {
  return { MapDataMore };
}

export default connect(mapStateToProps, actions)(MapHotel);
