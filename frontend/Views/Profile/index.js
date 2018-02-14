import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./actions";
import MultiSelect from "../../Components/MultiSelect/index";
import ImgUL from "../../Components/FormCommon/ImgUL";

class Profile extends Component {
  constructor(props) {
    super(props);
    const {
      name,
      level,
      location,
      // photos,
      desc,
      tags,
      contact
    } = this.props.user;
    this.state = {
      name,
      level,
      location,
      pos: {},
      desc,
      title: tags,
      // image: photos,
      contact: contact
    };
  }
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.renderLocation(pos);
      });
    }
  }

  renderLocation(pos) {
    this.setState({ pos });
  }

  onInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSelectChange(value) {
    this.setState({
      title: value
    });
  }

  // onUploadChange(value) {
  //   this.setState({
  //     image: value
  //   });
  // }

  onFormSubmit(e) {
    e.preventDefault();
    const { username } = this.props.user;
    const value = {
      username: this.props.user.username,
      name: this.state.name,
      level: this.state.level,
      location: this.state.location,
      pos: this.state.pos,
      desc: this.state.desc,
      tags: this.state.title,
      // photos: this.state.image,
      contact: this.state.contact
    };
    this.props.postProfile(
      value,
      () => {
        this.props.router.push(`/user/${username}`);
      }
      // name: this.state.term
    );
  }

  render() {
    if (this.props.user.username && !_.isEmpty(this.props.user.username)) {
      return (
        <div className="container">
          <form onSubmit={this.onFormSubmit.bind(this)}>
            <label>昵称:</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.onInputChange.bind(this)}
            />
            <label>旅游职能(可多选):</label>
            <MultiSelect
              choices={[
                { label: "导游", value: "导游" },
                { label: "地接社", value: "地接社" },
                { label: "翻译", value: "翻译" },
                { label: "地产经济", value: "地产经纪" },
                { label: "提供导游之家", value: "提供导游之家" },
                { label: "门票代理", value: "门票代理" },
                { label: "项目提供人", value: "项目提供人" },
                { label: "其他", value: "其他" }
              ]}
              label="请选择..."
              onChange={this.onSelectChange.bind(this)}
              value={this.props.user.tags}
            />
            <label>经验:</label>
            <input
              type="text"
              name="level"
              value={this.state.level}
              onChange={this.onInputChange.bind(this)}
            />
            <label>长期驻扎地:</label>
            <input
              type="text"
              name="location"
              value={this.state.location}
              onChange={this.onInputChange.bind(this)}
            />

            <label>联系方式:</label>
            <input
              type="text"
              name="contact"
              value={this.state.contact}
              onChange={this.onInputChange.bind(this)}
            />

            <label>简介:</label>
            <textarea
              style={{ height: 100 }}
              type="text"
              name="desc"
              value={this.state.desc}
              onChange={this.onInputChange.bind(this)}
            />

            {/* <div>
              <label>图片:</label>
              <div>
                <ImgUL onChange={this.onUploadChange.bind(this)} />
              </div>
            </div> */}

            <button type="submit" className="btn">
              提交
            </button>
          </form>
        </div>
      );
    }

    return <div>请先进行登录</div>;
  }
}
function mapStateToProps(state) {
  return { user: state.user };
}
export default connect(mapStateToProps, actions)(Profile);
