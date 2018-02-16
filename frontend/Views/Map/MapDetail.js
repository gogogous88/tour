import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./actions";
import { Link } from "react-router";
import _ from "lodash";
import MapAttr from "./MapAttr";
import MapHome from "./MapHome";
import Loading from "../../Components/Loading";
import classNames from "classnames/bind";
import styles from "./styles.css";
import WrapMap from "./WrapMap";

class MapDetail extends Component {
  componentWillMount() {
    this.fetchData();

    // this.props.fetchAttrs();
  }

  renderButton() {
    const { eachMapData } = this.props;
    const id = eachMapData.id.toString();
    if (id.length === 5) {
      return (
        <Link className="btn btn-danger" to="/map">
          《 返回团餐地图
        </Link>
      );
    }
    return (
      <Link className="btn btn-danger" to="/map/attr">
        《 返回景点地图
      </Link>
    );
  }

  fetchData() {
    const id = this.props.params.id.toString();
    // console.log(id.length);
    if (id.length === 8) {
      return this.props.fetchAttrs();
    }
    this.props.fetchMapData();
  }

  renderDesc() {
    const { eachMapData } = this.props;
    if (!_.isEmpty(eachMapData.ph_no)) {
      return (
        <div>
          <span>电话：</span>
          <a href={`tel:${eachMapData.ph_no}`}>
            <p className="blog-post-meta">{eachMapData.ph_no}</p>
          </a>
          <hr />
          <div className={styles.rowStyle}>
            <div style={{ display: "flex", flex: 1 }}>
              <blockquote>
                类型：
                {eachMapData.category}
              </blockquote>
            </div>
            <div style={{ display: "flex", flex: 2 }}>
              <blockquote>
                位于：
                {eachMapData.location}
              </blockquote>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <span>类型：</span>
        <blockquote>{eachMapData.category}</blockquote>
        <hr />
        <span>位于：</span>
        <blockquote>{eachMapData.location}</blockquote>
      </div>
    );
  }

  renderMap() {
    const { eachMapData } = this.props;
    const id = eachMapData.id.toString();

    return (
      <WrapMap
        lat={eachMapData.lat}
        lng={eachMapData.lng}
        location={eachMapData}
      />
    );
  }

  renderNavi() {
    const { coord } = this.props.eachMapData;

    const isWeiXin = () => {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    };

    const coordArray = coord.split(",");
    if (!isWeiXin()) {
      if (
        /* if we're on iOS, open in Apple Maps */
        navigator.platform.indexOf("iPhone") != -1 ||
        navigator.platform.indexOf("iPad") != -1 ||
        navigator.platform.indexOf("iPod") != -1
      ) {
        window.open(`maps://maps.google.com/maps?daddr=${coord}&amp;ll=`);
      } else {
        /* else use Google */ window.open(
          `https://maps.google.com/maps?daddr=${coord}&amp;ll=`
        );
      }
    } else {
      wx.openLocation({
        latitude: 5, // 纬度，浮点数，范围为90 ~ -90

        longitude: 5, // 经度，浮点数，范围为180 ~ -180。

        name: "", // 位置名

        address: "", // 地址详情说明

        scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大

        infoUrl: "" // 在查看位置界面底部显示的超链接,可点击跳转
      });
    }
  }

  renderInWechat() {
    const { eachMapData } = this.props;
    return (
      <a href={`https://maps.google.com/maps?q=${eachMapData.coord}`}>
        {!_.isEmpty(eachMapData.addr)
          ? `${addrArray[0] + "," + addrArray[1]}`
          : eachMapData.coord}
        (点击)
      </a>
    );
  }

  renderList() {
    const { eachMapData } = this.props;
    const imageURL = eachMapData.img;

    const streetURL = !_.isEmpty(eachMapData.addr)
      ? `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${
          eachMapData.addr
        }
    &fov=90&heading=90&pitch=10 &key=AIzaSyBoHhk8Y-oh2rfaRt9IbBFgCOv175YFOyQ`
      : `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${
          eachMapData.lat
        },${eachMapData.lng}
    &fov=90&heading=90&pitch=10 &key=AIzaSyBoHhk8Y-oh2rfaRt9IbBFgCOv175YFOyQ`;

    const addrArray = eachMapData.addr.split(",");
    const isWeiXin = () => {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    };

    if (!eachMapData.id) {
      return <Loading />;
    }
    return (
      <div role="main" className="container">
        <br />
        {this.renderButton()}
        {/* changed */}
        <hr />
        <div className="row">
          <div className="col-sm-6 blog-main">
            <div className="blog-post">
              <h4 className="blog-post-title">{eachMapData.name}</h4>
              <span className="blog-post-meta">
                {isWeiXin() ? (
                  this.renderInWechat()
                ) : (
                  <span onClick={this.renderNavi.bind(this)}>
                    <i
                      className="fa fa-location-arrow fa-x"
                      aria-hidden="true"
                    />{" "}
                    &nbsp;
                    {!_.isEmpty(eachMapData.addr)
                      ? `${addrArray[0] + "," + addrArray[1]}`
                      : eachMapData.coord}
                    (点击导航)
                  </span>
                )}
              </span>
              <hr />
              {this.renderDesc()}
            </div>
          </div>
          <div className="col-sm-6 blog-main">
            <div className="blog-post">
              {/* <h5>电话：</h5>
              <p className="blog-post-meta">{eachMapData.ph_no}</p>
              <hr />
              <h5>价格：</h5>
              <p>{eachMapData.price_rate}</p>
              <hr />
              <h5>描述：</h5>
              <blockquote>{eachMapData.descr}</blockquote> */}
              {this.renderMap()}
            </div>
          </div>
          <div className="col-sm-12 blog-main">
            <span>
              <hr />
              <h5>描述：</h5>
              <br />
              <p style={{ lineHeight: "180%" }}>{eachMapData.descr}</p>
            </span>
          </div>
          <hr />

          <div className={classNames(styles.imageStyle, "col-sm-12 blog-main")}>
            <span>
              <hr />
              图片：<hr />
              <div>
                <div>
                  <img src={streetURL} width="90%" />
                </div>

                <a href={imageURL}>
                  <img src={imageURL} width="90%" />
                </a>
              </div>
            </span>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { eachMapData } = this.props;
    if (_.isEmpty(eachMapData)) {
      return <Loading />;
    }
    // console.log(this.props.eachMapData);
    return (
      <div>
        <ul>{this.renderList()}</ul>
      </div>
    );
  }
}

function mapStateToProps({ MapDataMore }, ownProps) {
  const MapData = _.mapKeys(MapDataMore.delis, "id");
  const AttrData = _.mapKeys(MapDataMore.attrs, "id");
  const idToString = ownProps.params.id.toString();
  if (idToString.length === 8) {
    return { eachMapData: AttrData[ownProps.params.id] };
  }

  return { eachMapData: MapData[ownProps.params.id] };
}
export default connect(mapStateToProps, actions)(MapDetail);
