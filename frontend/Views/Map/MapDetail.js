import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./actions";
import { Link } from "react-router";
import _ from "lodash";
import MapAttr from "./MapAttr";
import MapHome from "./MapHome";

class MapDetail extends Component {
  componentWillMount() {
    this.fetchData();

    // this.props.fetchAttrs();
  }

  renderButton() {
    if (this.props.eachMapData.ph_no) {
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
    console.log("length", this.props.params.id.length);
    if (this.props.params.id.length === 8) {
      this.props.fetchAttrs();
    }
    this.props.fetchMapData();
  }

  renderDesc() {
    const { eachMapData } = this.props;
    if (!_.isEmpty(eachMapData.ph_no)) {
      return (
        <div>
          <h5>电话：</h5>
          <p className="blog-post-meta">{eachMapData.ph_no}</p>
          <hr />
          <h5>价格：</h5>
          <p>{eachMapData.price_rate}</p>
          <hr />
          <h5>描述：</h5>
          <blockquote>{eachMapData.descr}</blockquote>
        </div>
      );
    }
    return (
      <div>
        <h5>描述：</h5>
        <blockquote>{eachMapData.descr}</blockquote>
      </div>
    );
  }

  renderList() {
    const { eachMapData } = this.props;
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
              <img
                src="https://4d6e2fb69029ba36990b-4ef77e602e2f02dfb7fb07a25d14325f.ssl.cf4.rackcdn.com/2015/06/GPS-Map-Pin.jpg"
                alt=""
                width="90%"
              />
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
              {this.renderDesc()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { eachMapData } = this.props;
    if (_.isEmpty(eachMapData)) {
      return <h1>Loading...</h1>;
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
  if (ownProps.params.id.length === 8) {
    console.log("attrsDetailMap", AttrData);
    return { eachMapData: AttrData[ownProps.params.id] };
  }
  console.log("delisDetailMap", MapData);
  return { eachMapData: MapData[ownProps.params.id] };
}
export default connect(mapStateToProps, actions)(MapDetail);
