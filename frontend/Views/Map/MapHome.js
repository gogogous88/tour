import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import _ from "lodash";

import MapButton from "../../Components/MapButton";
import appLayout from "SharedStyles/appLayout.css";
import * as actions from "./actions";

import MapHere from "./MapHere";

class MapHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: [
        {
          id: 10001,
          name: "辽宁饭店",
          lat: 40.754123,
          lng: -73.822451,
          coord: "40.754123,-73.822451",
          addr: "14009 Cherry Ave, Flushing, NY 11355",
          addr_coord:
            "14009 Cherry Ave, Flushing, NY 11355,40.754123,-73.822451",
          ph_no: "718-886-4383",
          rate: "$",
          descr:
            "位于法拉盛地道的东北饭店，最特色的是老式锅包肉等，导游评价较高，出菜速度快,位于法拉盛地道的东北饭店，最特色的是老式锅包肉等，导游评价较高，出菜速度快位于法拉盛地道的东北饭店，最特色的是老式锅包肉等，导游评价较高，出菜速度快"
        }
      ]
    };
  }
  // componentDidMount() {
  //   this.props.fetchMapData().then(() => {
  //     this.setState({ locations: this.props.MapDataMore.delis });
  //   });
  // }

  renderDelis() {
    this.props.fetchMapData().then(() => {
      this.setState({ locations: this.props.MapDataMore.delis });
    });
  }

  renderAttrs() {
    this.props.fetchAttrs().then(() => {
      this.setState({ locations: this.props.MapDataMore.attrs });
    });
  }

  render() {
    if (_.isEmpty(this.state.locations)) {
      return <div>loading...</div>;
    }
    const location = { lat: 43, lng: -72.9 };
    console.log("checking", this.state.locations);
    return (
      <div>
        <MapHere center={location} locations={this.state.locations} />;
        {/* <MapButton
          onClickDelis={() => {
            this.props.fetchMapData();
          }}
          onClickAttrs={() => {
            this.props.fetchAttrs();
          }}
        /> */}
        <button onClick={this.renderDelis.bind(this)}>团餐</button>
        <br />
        <button onClick={this.renderAttrs.bind(this)}>景点</button>
      </div>
    );
  }
}

function mapStateToProps({ MapDataMore }) {
  return { MapDataMore };
}

export default connect(mapStateToProps, actions)(MapHome);
