// import React, { Component } from "react";
// import { connect } from "react-redux";
// import _ from "lodash";
// import { Link } from "react-router-dom";
// import * as actions from "./actions";
// import MapHere from "./MapHere";

// class MapHome extends Component {
//   componentDidMount() {
//     this.props.fetchMapData();
//   }
//   renderMap() {
//     const location = { lat: 43, lng: -72.9 };
//     return <MapHere center={location} locations={this.props.MapDataMore} />;
//   }

//   render() {
//     if (this.props.MapDataMore) {
//       return <div>{this.renderMap()}</div>;
//     }
//   }
// }

// export default connect(state => {
//   return {
//     MapDataMore: state.MapDataMore
//   };
// }, actions)(MapHome);
