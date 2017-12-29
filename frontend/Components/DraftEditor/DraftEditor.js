import React, { Component } from "react";
import PropTypes from "prop-types";
import { EditorState, Modifier, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import draftToHtml from "draftjs-to-html";
import styles from "./styles.css";
import ImgUL from "../FormCommon/ImgUL";

class CustomOption extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object
  };

  addStar: Function = (): void => {
    const { editorState, onChange } = this.props;
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      "hello",
      editorState.getCurrentInlineStyle()
    );
    onChange(EditorState.push(editorState, contentState, "insert-characters"));
  };

  render() {
    return <div onClick={this.addStar}>⭐</div>;
  }
}

class DraftEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }

  onEditorStateChange: Function = editorState => {
    const value = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    this.setState({
      editorState
    });
    this.props.onChange(value);
  };

  render() {
    const { editorState } = this.state;
    const { onSave, onChange } = this.props;

    return (
      <div>
        <span style={{ backgroundColor: "#f6f6f6" }}>
          <ImgUL />
          <Editor
            editorStyle={{
              borderStyle: "groove",
              borderTopWidth: 0,
              height: 300
            }}
            editorState={editorState}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            onEditorStateChange={this.onEditorStateChange}
            toolbarCustomButtons={[<CustomOption />]}
            toolbar={{
              image: {
                upLoadEnabled: true,
                uploadCallback: true,
                previewImage: true
              }
            }}
          />
        </span>

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
          <FroalaEditorView
            model={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
          />
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

export default DraftEditor;
