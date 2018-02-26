import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./actions";
import HotelRsvp from "./index";
import { browserHistory } from "react-router";

class Comfirm extends Component {
  constructor(props) {
    super(props);
    this.state = { confirm: false };
  }

  onFormSubmit = () => {
    const {
      email,
      amount,
      ph_no,
      name,
      addr,
      id,
      hotelName,
      lat,
      lng,
      rate,
      user,
      rdate
    } = this.props;

    const value = {
      hotel: {
        id,
        name: hotelName,
        lat,
        lng,
        rate
      },
      user,
      ph_no,
      email,
      detail: { rdate, amount }
    };
    this.props.comfrimPostHotelRsvp(value, () => {
      browserHistory.push("/");
    });
  };

  showIndex = () => {
    this.setState({ confirm: true });
  };
  render() {
    const { email, amount, ph_no, name, addr, rdate } = this.props;
    const { confirm } = this.state;
    if (!confirm) {
      return (
        <div>
          <div className="card text-center">
            <div className="card-header">请核实:</div>
            <div className="card-block">
              <h4 className="card-title">酒店:{name}</h4>
              <blockquote>位于:{addr}</blockquote>
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
                    <td>电话</td>
                    <td>{ph_no}</td>
                  </tr>
                  <tr>
                    <td>email</td>
                    <td>{email}</td>
                  </tr>
                  <tr>
                    <td>房间数</td>

                    <td>{amount}</td>
                  </tr>
                </tbody>
              </table>

              <p className="card-text" />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={this.showIndex.bind(this)}
                  >
                    修改
                  </button>
                </div>
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={this.onFormSubmit.bind(this)}
                  >
                    确认并预定
                  </button>
                </div>
              </div>
            </div>
            <div className="card-footer text-muted">
              请保持手机开机，email畅通，以便预定后续工作
            </div>
          </div>
        </div>
      );
    }
    console.log("browse", browserHistory);
    return (
      <HotelRsvp
        email={email}
        pdate={rdate[0]}
        enDdate={rdate[1]}
        ph_no={ph_no}
        email={email}
        amount={amount}
      />
    );
  }
}

export default connect(null, actions)(Comfirm);
