import React, { Component } from "react";
import * as actions from "./actions";
import { connect } from "react-redux";
import _ from "lodash";

class UserList extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }

  renderUsers() {
    const { userList } = this.props;
    console.log("userList", userList);
    if (!_.isEmpty(userList)) {
      return _.map(userList, eachData => {
        const { _id, name } = eachData;
        return <li key={_id}>{name}</li>;
      });
    }
    return <h1>loading</h1>;
  }

  render() {
    return this.renderUsers();
  }
}

function mapStateToProps({ userList }) {
  return { userList };
}

export default connect(mapStateToProps, actions)(UserList);
