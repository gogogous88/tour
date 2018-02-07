import React, { Component } from "react";
import Next from "./Next";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "你好" };
  }
  onInputChange(e) {
    this.setState({ value: e.target.value });
  }

  renderSubmit(e) {
    e.preventDefault();
    return <Next value={this.state.value} />;
  }

  render() {
    console.log(this.state.value);
    return (
      <form onSubmit={this.renderSubmit.bind(this)}>
        <input
          value={this.state.value}
          onChange={this.onInputChange.bind(this)}
        />
        <button type="submit">提交</button>
      </form>
    );
  }
}

export default Test;
