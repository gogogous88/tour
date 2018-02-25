import React from "react";
import createClass from "create-react-class";
import PropTypes from "prop-types";
import Select from "react-select";

var ValuesAsNumbersField = createClass({
  displayName: "ValuesAsNumbersField",
  propTypes: {
    label: PropTypes.string
  },
  getInitialState() {
    return {
      options: [
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
        { value: 5, label: "5" },
        { value: 6, label: "6" },
        { value: 7, label: "7" },
        { value: 8, label: "8" },
        { value: 9, label: "9" },
        { value: 10, label: "10" },
        { value: 11, label: "11" },
        { value: 12, label: "12" },
        { value: 13, label: "13" },
        { value: 14, label: "14" },
        { value: 15, label: "15" },
        { value: 16, label: "16" },
        { value: 17, label: "17" },
        { value: 18, label: "18" },
        { value: 19, label: "19" },
        { value: 20, label: "20" },
        { value: 21, label: "21" },
        { value: 22, label: "22" },
        { value: 23, label: "23" },
        { value: 24, label: "24" },
        { value: 25, label: "25" },
        { value: 26, label: "26" },
        { value: 27, label: "27" },
        { value: 28, label: "28" },
        { value: 29, label: "29" }
      ],
      matchPos: "any",
      matchValue: true,
      matchLabel: true,
      value: this.props.value,
      multi: false
    };
  },
  onChangeMatchStart(event) {
    this.setState({
      matchPos: event.target.checked ? "start" : "any"
    });
  },
  onChangeMatchValue(event) {
    this.setState({
      matchValue: event.target.checked
    });
  },
  onChangeMatchLabel(event) {
    this.setState({
      matchLabel: event.target.checked
    });
  },
  onChange(value) {
    this.setState({ value });
    //下面是传出去的value
    this.props.onValueChange(value);
  },
  onChangeMulti(event) {
    this.setState({
      multi: event.target.checked
    });
  },
  render() {
    var matchProp = "any";
    if (this.state.matchLabel && !this.state.matchValue) {
      matchProp = "label";
    }
    if (!this.state.matchLabel && this.state.matchValue) {
      matchProp = "value";
    }
    return (
      <div className="section">
        <h3 className="section-heading">
          {this.props.label}{" "}
          {/* <a href="https://github.com/JedWatson/react-select/tree/master/examples/src/components/NumericSelect.js">
            (Source)
          </a> */}
        </h3>
        <Select
          matchPos={this.state.matchPos}
          matchProp={matchProp}
          multi={this.state.multi}
          onChange={this.onChange}
          options={this.state.options}
          simpleValue
          value={this.state.value}
        />
        <div className="checkbox-list">
          <label className="checkbox">
            <input
              type="checkbox"
              className="checkbox-control"
              checked={this.state.multi}
              onChange={this.onChangeMulti}
            />
            {/* <span className="checkbox-label">Multi-Select</span> */}
          </label>
          <label className="checkbox">
            <input
              type="checkbox"
              className="checkbox-control"
              checked={this.state.matchValue}
              onChange={this.onChangeMatchValue}
            />
            {/* <span className="checkbox-label">Match value</span> */}
          </label>
          <label className="checkbox">
            <input
              type="checkbox"
              className="checkbox-control"
              checked={this.state.matchLabel}
              onChange={this.onChangeMatchLabel}
            />
            {/* <span className="checkbox-label">Match label</span> */}
          </label>
          <label className="checkbox">
            <input
              type="checkbox"
              className="checkbox-control"
              checked={this.state.matchPos === "start"}
              onChange={this.onChangeMatchStart}
            />
            {/* <span className="checkbox-label">
              Only include matches from the start of the string
            </span> */}
          </label>
        </div>
        {/* <div className="hint">This example uses simple numeric values</div> */}
      </div>
    );
  }
});

module.exports = ValuesAsNumbersField;
