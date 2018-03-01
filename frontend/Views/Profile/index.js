import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./actions";
import MultiSelect from "../../Components/MultiSelect/index";
import ImgUL from "../../Components/FormCommon/ImgUL4Profile";
import { Link } from "react-router";
import _ from "lodash";

class Profile extends Component {
  constructor(props) {
    super(props);
    const {
      name,
      level,
      location,
      photos,
      photos1,
      photos2,
      photos3,
      desc,
      tags,
      contact,
      vehicleTypes
    } = this.props.user;

    this.state = {
      name,
      level,
      location,
      pos: {},
      desc,
      vehicleTypes: [],
      title: [],
      image: photos,
      image1: photos1,
      image2: photos2,
      image3: photos3,
      contact: contact
    };
  }
  componentDidMount() {
    this.setState({
      title: this.props.user.tags,
      vehicleTypes: this.props.user.vehicleTypes
    });

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
  componentWillReceiveProps(nextProps) {
    if (this.props.user.tags !== nextProps.user.tages) {
      this.setState({ title: nextProps.user.tags });
    }
    if (this.props.user.vehicleTypes !== nextProps.user.vehicleTypes) {
      this.setState({ vehicleTypes: nextProps.user.vehicleTypes });
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
  onVehicleSelectChange = value => {
    this.setState({ vehicleTypes: value });
  };
  onUploadChange(value) {
    this.setState({
      image: value
    });
  }
  onUploadChange1(value) {
    this.setState({
      image1: value
    });
  }
  onUploadChange2(value) {
    this.setState({
      image2: value
    });
  }
  onUploadChange3(value) {
    this.setState({
      image3: value
    });
  }

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
      photos: this.state.image,
      photos1: this.state.image1,
      photos2: this.state.image2,
      photos3: this.state.image3,
      contact: this.state.contact,
      vehicleTypes: this.state.vehicleTypes
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

            <div>
              <label>旅游职能(可多选):</label>
              <MultiSelect
                choices={[
                  { label: "导游", value: "导游" },
                  { label: "车公司", value: "车公司" },
                  { label: "机场接送", value: "机场接送" },
                  { label: "发团社", value: "发团社" },
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
                value={this.state.title}
              />
            </div>

            <label>车型:</label>
            <MultiSelect
              choices={[
                { label: "5座SUV", value: "5座SUV" },
                { label: "奔驰GL450", value: "奔驰GL450" },
                { label: "凯迪拉克凯雷德", value: "凯迪拉克凯雷德" },
                { label: "7座商务车", value: "7座商务车" },
                { label: "12座福特", value: "12座福特" },
                { label: "12-15座高顶奔驰", value: "12-15座高顶奔驰" },
                { label: "25座小巴", value: "25座小巴" },
                { label: "35座中巴", value: "35座中巴" },
                { label: "40-45座巴士", value: "40-45座巴士" },
                { label: "45-55座大巴", value: "45-55座大巴" },
                { label: "其他", value: "其他" }
              ]}
              label="请选择..."
              onChange={this.onVehicleSelectChange.bind(this)}
              value={this.state.vehicleTypes}
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

            <div>
              <label>图片(上限为4MB/图)：</label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around"
                }}
              >
                <ImgUL index={0} onChange={this.onUploadChange.bind(this)} />

                <ImgUL index={1} onChange={this.onUploadChange1.bind(this)} />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 15,
                  justifyContent: "space-around"
                }}
              >
                <ImgUL index={2} onChange={this.onUploadChange2.bind(this)} />

                <ImgUL index={3} onChange={this.onUploadChange3.bind(this)} />
              </div>
            </div>
            <div
              style={{
                marginTop: 15,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <button type="submit" className="btn">
                提交
              </button>
              <Link className="btn" to={`user/${this.props.user.username}`}>
                取消修改
              </Link>
            </div>
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
