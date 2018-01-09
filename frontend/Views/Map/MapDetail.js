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
    if (id.length === 8) {
      this.props.fetchAttrs();
    }
    this.props.fetchMapData();
  }

  renderDesc() {
    const { eachMapData } = this.props;
    if (!_.isEmpty(eachMapData.ph_no)) {
      return (
        <div>
          <h6>电话：</h6>
          <a href="tel:eachMapData.ph_no">
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
        <h6>类型：</h6>
        <blockquote>{eachMapData.category}</blockquote>
        <hr />
        <h6>位于：</h6>
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

  renderList() {
    const { eachMapData } = this.props;
    const imageURL = eachMapData.img;
    if (!eachMapData.id) {
      return <Loading />;
    }
    return (
      <div role="main" className="container">
        <br />
        {this.renderButton()}

        <hr />
        <div className="row">
          <div className="col-sm-6 blog-main">
            <div className="blog-post">
              <h4 className="blog-post-title">{eachMapData.name}</h4>
              <p className="blog-post-meta">
                <a href={`http://maps.google.com/maps?q=${eachMapData.coord}`}>
                  <i className="fa fa-compass fa-x" aria-hidden="true" />
                  {eachMapData.addr_coord} (点击导航)
                </a>
              </p>
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
            <h6>
              <hr />
              <h5>描述：</h5>
              <br />
              <p style={{ lineHeight: "180%" }}>{eachMapData.descr}</p>
            </h6>
          </div>
          <hr />
          <a href={imageURL}>
            <div
              className={classNames(styles.imageStyle, "col-sm-12 blog-main")}
            >
              <h6>
                <hr />
                图片：<hr />
                <img src={imageURL} width="90%" />
              </h6>
            </div>
          </a>
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
