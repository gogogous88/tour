import React, { Component } from "react";
import FroalaEditor from "react-froala-wysiwyg";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

class Froala extends Component {
  constructor(props) {
    super(props);

    this.handleModelChange = this.handleModelChange.bind(this);

    this.state = {
      model: ""
    };
  }

  handleModelChange(model) {
    this.setState({ model });
    this.props.onChange(model);
  }

  render() {
    const { onSave } = this.props;
    return (
      <div>
        <FroalaEditor
          model={this.state.model}
          onModelChange={this.handleModelChange}
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
          <FroalaEditorView model={this.state.model} />
        </div>
        <button
          type="button"
          className="btn btn-primary btn-lg btn-block gray lignten-3"
          onClick={onSave}
        >
          点击发布
        </button>
      </div>
    );
  }
}

export default Froala;
