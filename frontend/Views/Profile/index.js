import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./actions";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", level: "", location: "" };
  }

  onInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onFormSubmit(e) {
    e.preventDefault();
    const value = {
      username: "markblueplan@gmail.com",
      name: this.state.name,
      level: this.state.level,
      location: this.state.location
    };
    this.props.postProfile(
      value
      // name: this.state.term
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.onInputChange.bind(this)}
          />
          <input
            type="text"
            name="level"
            value={this.state.level}
            onChange={this.onInputChange.bind(this)}
          />
          <input
            type="text"
            name="location"
            value={this.state.location}
            onChange={this.onInputChange.bind(this)}
          />

          <button type="submit" className="btn">
            提交
          </button>
        </form>
      </div>
    );
  }
}

export default connect(null, actions)(Profile);
