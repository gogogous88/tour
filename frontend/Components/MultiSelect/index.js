import React, { Component } from "react";
import createClass from "create-react-class";
import PropTypes from "prop-types";
import Select from "react-select";

//props of choices can be 传下来 as options

var MultiSelect = createClass({
  displayName: "MultiSelectField",
  propTypes: {
    label: PropTypes.string
  },
  getInitialState() {
    return {
      removeSelected: true,
      disabled: false,
      crazy: false,
      stayOpen: false,
      value: this.props.value,
      rtl: false
    };
  },
  handleSelectChange(value) {
    this.setState({ value });
    this.props.onChange(value);
  },
  toggleCheckbox(e) {
    this.setState({
      [e.target.name]: e.target.checked
    });
  },
  toggleRtl(e) {
    let rtl = e.target.checked;
    this.setState({ rtl });
  },

  render() {
    const FLAVOURS = this.props.choices;

    const WHY_WOULD_YOU = [
      {
        label: "Chocolate (are you crazy?)",
        value: "chocolate",
        disabled: true
      }
    ].concat(FLAVOURS.slice(1));
    const { crazy, disabled, stayOpen, value } = this.state;
    const options = crazy ? WHY_WOULD_YOU : FLAVOURS;

    return (
      <div className="section">
        <Select
          closeOnSelect={!stayOpen}
          disabled={disabled}
          multi
          onChange={this.handleSelectChange}
          options={options}
          placeholder={this.props.label}
          removeSelected={this.state.removeSelected}
          rtl={this.state.rtl}
          simpleValue
          value={value}
        />

        <div className="checkbox-list">
          <label className="checkbox">
            <input
              type="checkbox"
              className="checkbox-control"
              name="removeSelected"
              checked={this.state.removeSelected}
              onChange={this.toggleCheckbox}
            />
            {/* <span className="checkbox-label">删除已选选项</span> */}
          </label>
          <label className="checkbox">
            <input
              type="checkbox"
              className="checkbox-control"
              name="disabled"
              checked={this.state.disabled}
              onChange={this.toggleCheckbox}
            />
            {/* <span className="checkbox-label">Disable the control</span> */}
          </label>
          <label className="checkbox">
            <input
              type="checkbox"
              className="checkbox-control"
              name="crazy"
              checked={crazy}
              onChange={this.toggleCheckbox}
            />
            {/* <span className="checkbox-label">
              I don't like Chocolate (disabled the option)
            </span> */}
          </label>
          <label className="checkbox">
            <input
              type="checkbox"
              className="checkbox-control"
              name="stayOpen"
              checked={stayOpen}
              onChange={this.toggleCheckbox}
            />
            {/* <span className="checkbox-label">
              Stay open when an Option is selected
            </span> */}
          </label>
          <label className="checkbox">
            <input
              type="checkbox"
              className="checkbox-control"
              name="rtl"
              checked={this.state.rtl}
              onChange={this.toggleCheckbox}
            />
            {/* <span className="checkbox-label">rtl</span> */}
          </label>
        </div>
      </div>
    );
  }
});

export default MultiSelect;
