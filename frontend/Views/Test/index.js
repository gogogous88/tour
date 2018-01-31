import React from "react";
import ReactDOM from "react-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

class Test extends React.Component {
  state = {
    value: "",
    copied: false
  };

  render() {
    return (
      <div>
        <textarea
          value={this.state.value}
          onChange={({ target: { value } }) =>
            this.setState({ value, copied: false })
          }
        />

        {/* <CopyToClipboard
          text={this.state.value}

          onCopy={() => this.setState({ copied: true })}
        >
          <span>Copy to clipboard with span</span>
        </CopyToClipboard> */}

        <CopyToClipboard
          className="btn"
          text={this.state.value}
          onCopy={() => this.setState({ copied: true })}
        >
          <button>复制并分享</button>
        </CopyToClipboard>

        {this.state.copied ? (
          <span style={{ color: "red" }}>
            信息及链接已复制，请前往微信进行分享！
          </span>
        ) : null}
      </div>
    );
  }
}

const appRoot = document.createElement("div");
document.body.appendChild(appRoot);

export default Test;
