import React, { Component } from "react";
import Button from "../../Components/Button";
import { connect } from "react-redux";
import * as actions from "./actions";
import _ from "lodash";

class GoogleSheet extends Component {
  componentDidMount() {
    this.props.fetchNightData();
  }

  renderList() {
    return this.props.nightData.map((eachnight, i) => {
      if (!_.isEmpty(eachnight.pdate)) {
        return <li key={i}>{eachnight.pdate}</li>;
      }
      return null;
    });
  }

  render() {
    if (this.props.nightData) {
      return (
        <div>
          <ul>{this.renderList()}</ul>
        </div>
      );
    }
    return <h1>loading...</h1>;
  }
}

function mapStateToProps({ nightData }) {
  return { nightData };
}

export default connect(mapStateToProps, actions)(GoogleSheet);
