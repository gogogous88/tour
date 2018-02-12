import React, { Component } from "react";
import * as actions from "./actions";
import { connect } from "react-redux";
import _ from "lodash";
import MapHere from "./MapHere";

class UserList extends Component {
  componentDidMount() {
    this.props.getAllUsersArray();
  }

  renderUsers() {
    const { userList } = this.props;

    return (
      <MapHere locations={userList} pin="/src/static/icons/pins/redhead.svg" />
    );
  }

  render() {
    const { userList } = this.props;

    if (!_.isEmpty(userList)) {
      return <ul>{this.renderUsers()}</ul>;
    }
    return <h1>loading</h1>;
  }
}

function mapStateToProps({ userList }) {
  return { userList };
}

export default connect(mapStateToProps, actions)(UserList);
