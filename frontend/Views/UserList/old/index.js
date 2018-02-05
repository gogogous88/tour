import React, { Component } from "react";
import * as actions from "./actions";
import { connect } from "react-redux";
import _ from "lodash";

class UserList extends Component {
  componentDidMount() {
    this.props.getAllUsersArray();
    this.props.getAllUsers();
  }

  renderUsers() {
    const { userList } = this.props;

    return _.map(userList, eachUser => {
      const { name, pos } = eachUser;
      return <li key={eachUser._id}>{pos ? pos.lat : ""}</li>;
    });
  }

  render() {
    const { userList } = this.props;
    console.log(userList);
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
