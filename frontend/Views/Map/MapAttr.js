import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import _ from "lodash";

import MapButton from "../../Components/MapButton";
import appLayout from "SharedStyles/appLayout.css";
import * as actions from "./actions";

import MapHere from "./MapHere";

class MapAttr extends Component {
  constructor(props) {
    super(props);

    this.state = { locations: [] };
  }
  componentDidMount() {
    this.props.fetchAttrs().then(() => {
      this.setState({ locations: this.props.MapDataMore.attrs });
    });
  }

  renderMap() {
    const location = { lat: 43, lng: -72.9 };

    return <MapHere center={location} locations={this.state.locations} />;
  }

  render() {
    if (_.isEmpty(this.state.locations)) {
      return <div>loading...</div>;
    }
    return (
      <div className={appLayout.constraintWidth}>
        {this.renderMap()}
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

export default connect(mapStateToProps, actions)(MapAttr);
