import React from "react";
import ReactDOM from "react-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styles from "./styles.css";
import Button from "Components/Button";
import classnames from "classnames";

class Share extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSubMenu: false,
      value: `${this.props.content}${this.props.link}`,
      copied: false
    };
    // this.toggleSubMenu = this.toggleSubMenu.bind(this);
  }

  render() {
    return (
      <div>
        {/* <textarea
          value={this.state.value}
          onChange={({ target: { value } }) =>
            this.setState({ value, copied: false })
          }
        /> */}

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

        <div>
          {this.state.copied ? (
            <div className={styles.subMenu}>
              <Button
                onClick={() => this.setState({ copied: false })}
                className={styles.subMenuClose}
              >
                <i className={classnames("fa fa-close")} />
              </Button>
              <span style={{ color: "red" }}>
                信息及链接已复制，请前往微信进行分享！
              </span>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const appRoot = document.createElement("div");
document.body.appendChild(appRoot);

export default Share;
