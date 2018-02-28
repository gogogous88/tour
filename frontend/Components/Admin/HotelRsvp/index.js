import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./actions";
import _ from "lodash";

class HotelRsvp extends Component {
  constructor(props) {
    super(props);
    this.state = { ph_no: false, email: false };
  }
  componentDidMount() {
    this.props.getHotelRsvp();
  }

  renderHotels = () => {
    const { allHotelRsvp } = this.props;
    console.log("in page", this.props.allHotelRsvp);
    return _.map(allHotelRsvp.hotelRsvp, eachRsvp => {
      const { detail, email, hotel, ph_no, user } = eachRsvp;
      const { amount, rdate } = detail;
      const { name, id, lat, lng } = hotel;
      return (
        <li className="list-group-item" key={eachRsvp.createDate}>
          <div className="card center">
            <div className="card-header">询价:</div>
            <div className="card-block">
              <h4 className="card-title">酒店:{name}</h4>
              <blockquote>
                位于:{lat},{lng}
              </blockquote>
              <table className="table">
                <thead />
                <tbody>
                  <tr>
                    <td>入住日期</td>
                    <td>{rdate[0]}</td>
                  </tr>

                  <tr>
                    <td>出住日期</td>
                    <td>{rdate[1]}</td>
                  </tr>
                  <tr>
                    <td>房间数</td>

                    <td>{amount}</td>
                  </tr>
                  <tr>
                    <td>电话</td>
                    <td>
                      {!this.state.ph_no ? (
                        <button
                          className="btn"
                          onClick={() => {
                            this.setState({ ph_no: true });
                          }}
                        >
                          7182165319
                        </button>
                      ) : (
                        ph_no
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>email</td>
                    <td>
                      {!this.state.email ? (
                        <button
                          className="btn"
                          onClick={() => {
                            this.setState({ email: true });
                          }}
                        >
                          markblueplan@gmail.com
                        </button>
                      ) : (
                        email
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>

              <p className="card-text" />
            </div>
            <div className="card-footer text-muted">以上</div>
          </div>
        </li>
      );
    });
  };
  render() {
    if (this.props.allHotelRsvp) {
      return (
        <div className="card text-center">
          <div className="card-header">酒店订阅:</div>
          <ul className="list-group list-group-flush">{this.renderHotels()}</ul>
        </div>
      );
    }
    return <div>loading...</div>;
  }
}

function mapStateToProps({ allHotelRsvp }) {
  return { allHotelRsvp };
}
export default connect(mapStateToProps, actions)(HotelRsvp);
