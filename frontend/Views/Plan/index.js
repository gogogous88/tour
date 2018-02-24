import React, { Component } from "react";

class Plan extends Component {
  constructor(props) {
    super(pros);
    this.state = { ploc: "", rloc: "", pdate: "", hotel: "", vType: "" };
  }

  onInputChange(e) {
    this.setState({ ploc: e.target.value, rloc: e.target.value });
  }

  render() {
    return (
      <div>
        <input
          value={this.state.ploc}
          onChange={this.onInputChange.bind(this)}
        />
        <input
          value={this.state.rloc}
          onChange={this.onInputChange.bind(this)}
        />
      </div>
    );
  }
}

export default Plan;
