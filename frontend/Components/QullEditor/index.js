import React, { Component } from "react";
import ReactQuill from "react-quill";

import renderHTML from "react-render-html";
import draftToHtml from "draftjs-to-html";

import Button from "Components/Button";

export default class QuillEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" }; // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ text: value });
    this.props.onChange(this.state.text);
  }

  render() {
    return (
      <div>
        <ReactQuill
          // modules={modules}
          value={this.state.text}
          onChange={this.handleChange}
        />
        <div
          style={{
            marginLeft: 10,
            marginTop: 15,
            marginRight: 10,
            marginBottom: 10,
            backgroundColor: "#f6f6f6"
          }}
        >
          <h5>发表前请预览：</h5>

          {renderHTML(this.state.text)}
        </div>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "flex-end",
            marginRight: 30,
            marginTop: 40
          }}
        >
          <button
            noUppercase
            onClick={this.props.onSave}
            className="waves-effect red lighten-2 btn"
          >
            <i className="material-icons right">send</i>
            发表
          </button>
        </div>

        {/* <button
          type="button"
          className="btn btn-primary btn-lg btn-block gray lignten-3"
          onClick={onSave}
        >
          点击发布
        </button> */}
      </div>
    );
  }
}
