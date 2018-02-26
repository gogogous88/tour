import React, { Component } from "react";
import Rdate from "../../Components/FormCommon/Rdate";
import moment from "moment";
import { connect } from "react-redux";
import * as actions from "./actions";
import ValuesAsNumbersField from "../../Components/Select/Single";
import _ from "lodash";
import appLayout from "SharedStyles/appLayout.css";
import classnames from "classnames";
import Comfirm from "./Comfirm";

class HotelRsvp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pdate: "",
      enDdate: "",
      rdate: [],
      ph_no: "",
      email: "",
      amount: 1,
      ph_no_validate: false,
      email_validate: false,
      comfirm: false
    };
  }
  onInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value });
    if (!_.isEmpty(value)) {
      this.setState({ ph_no_validate: false, email_validate: false });
    }
  };
  render() {
    const value = [this.state.pdate, this.state.endDate];
    const { id, name, lat, lng, rate } = this.props;

    if (!this.state.comfirm) {
      return (
        <div className="row">
          <form
            className="col s12"
            onSubmit={e => {
              e.preventDefault();

              if (
                !_.isEmpty(this.state.ph_no) &&
                !_.isEmpty(this.state.email)
              ) {
                this.props.postHotelRsvp(
                  {
                    hotel: {
                      id,
                      name,
                      lat,
                      lng,
                      rate
                    },
                    user: this.props.user,
                    ph_no: this.state.ph_no,
                    email: this.state.email,
                    detail: { rdate: value, amount: this.state.amount }
                  },
                  () => {
                    this.setState({ comfirm: true });
                  }
                );
              } else if (_.isEmpty(this.state.ph_no)) {
                this.setState({ ph_no_validate: true });
              } else if (_.isEmpty(this.state.email)) {
                this.setState({ email_validate: true });
              }
            }}
          >
            <div className={appLayout.showOnLargeBP}>
              <div className="row">
                <div className="input-field col s6">
                  <div style={{ fontSize: 14, color: "grey" }}>
                    入住-出住日期：
                  </div>

                  <Rdate
                    name="rdate"
                    value={value}
                    onChange={value =>
                      this.setState({
                        pdate: moment(value[0]).format("YYYY-MM-DD"),
                        endDate: moment(value[1]).format("YYYY-MM-DD")
                      })
                    }
                  />
                </div>

                <div className="input-field col s6">
                  <div style={{ fontSize: 14, color: "grey" }}>房间数：</div>

                  <ValuesAsNumbersField
                    value={this.state.amount}
                    onValueChange={value => {
                      this.setState({ amount: value });
                    }}
                  />
                </div>
              </div>
            </div>

            <div className={appLayout.showOnMediumBP}>
              <div style={{ fontSize: 14, color: "grey" }}>入住-出住日期：</div>

              <Rdate
                name="rdate"
                value={value}
                onChange={value =>
                  this.setState({
                    pdate: moment(value[0]).format("YYYY-MM-DD"),
                    endDate: moment(value[1]).format("YYYY-MM-DD")
                  })
                }
              />

              <div style={{ fontSize: 14, color: "grey" }}>房间数：</div>

              <ValuesAsNumbersField
                value={this.state.amount}
                onValueChange={value => {
                  this.setState({ amount: value });
                }}
              />
            </div>
            <div className="row">
              <div className="input-field col s6">
                <div style={{ fontSize: 14, color: "grey" }}>我的电话:</div>

                <input
                  name="ph_no"
                  value={this.state.ph_no}
                  onChange={this.onInputChange}
                />
                <div>{this.state.ph_no_validate ? "请填写电话" : ""}</div>
              </div>
              <div className="input-field col s6">
                <div style={{ fontSize: 14, color: "grey" }}>我的email:</div>

                <input
                  name="email"
                  value={this.state.email}
                  onChange={this.onInputChange}
                />
                <div>{this.state.email_validate ? "请填写E-mail" : ""}</div>
              </div>
            </div>

            <button type="submit" className="btn">
              预定
            </button>
          </form>
        </div>
      );
    }

    return (
      <Comfirm
        email={this.state.email}
        amount={this.state.amount}
        ph_no={this.state.ph_no}
        name={this.props.name}
        addr={this.props.addr}
        rdate={value}
        user={this.props.user}
        id={id}
        hotelName={name}
        lat={lat}
        lng={lng}
        rate={rate}
      />
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps, actions)(HotelRsvp);
