import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMapData } from "./actions";
// import { Link } from "react-router-dom";
import _ from "lodash";

class MapDetail extends Component {
  componentDidMount() {
    this.props.fetchMapData();
  }

  renderList() {
    console.log(this.props.MapDataMore);
    const { eachMapData } = this.props;
    return (
      <div role="main" className="container">
        <br />
        {/* <Link className="btn btn-danger" to="/map">
          《 返回地图
        </Link> */}
        <hr />
        <div className="row">
          <div className="col-sm-6 blog-main">
            <div className="blog-post">
              <h3 className="blog-post-title">{eachMapData.name}</h3>
              <p className="blog-post-meta">{eachMapData.addr_coord}</p>
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
              <h5>电话：</h5>
              <p>{eachMapData.ph_no}</p>
              <hr />
              <h5>价格：</h5>
              <p>{eachMapData.rate}</p>
              <hr />
              <h5>描述：</h5>
              <blockquote>{eachMapData.descr}</blockquote>
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
        <h1> MapDetail Page is Here </h1>
        <ul>{this.renderList()}</ul>
      </div>
    );
  }
}

function mapStateToProps({ MapDataMore }, ownProps) {
  const MapData = _.mapKeys(MapDataMore.delis, "id");
  console.log("ownProps", ownProps);
  return { eachMapData: MapData[ownProps.params.id] };
}
export default connect(mapStateToProps, { fetchMapData })(MapDetail);
