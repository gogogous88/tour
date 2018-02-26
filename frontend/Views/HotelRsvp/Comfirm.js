import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./actions";
import HotelRsvp from "./index";
import { browserHistory } from "react-router";

class Comfirm extends Component {
  constructor(props) {
    super(props);
    this.state = { confirm: false, confirmation: false };
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
      // browserHistory.push("/");
      this.setState({ confirmation: true });
    });
  };

  showIndex = () => {
    this.setState({ confirm: true });
  };

  renderConfirmation = () => {
    const { email, amount, ph_no, name, addr, rdate } = this.props;
    return (
      <div className="card text-center">
        <div className="card-header">询价已提交:</div>
        <div className="card-block">
          <h4 className="card-title">酒店:{name}</h4>
          <blockquote>位于:{addr}</blockquote>
          <p>
            您的询价已经提交,请保持手机畅通，该酒店将在24小时内与您奉上报价及预定结果。如有任何问题请与mark取得联系:7182165319
          </p>
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
        </div>
        <div className="card-footer text-muted">
          请保持手机开机，email畅通，以便预定后续工作
        </div>
      </div>
    );
  };

  render() {
    const { email, amount, ph_no, name, addr, rdate } = this.props;
    const { confirm, confirmation } = this.state;
    if (!confirmation) {
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
    return this.renderConfirmation();
  }
}

export default connect(null, actions)(Comfirm);
