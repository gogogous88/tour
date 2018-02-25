import React, { Component } from "react";
import Rdate from "../../Components/FormCommon/Rdate";
import moment from "moment";
import { connect } from "react-redux";
import * as actions from "./actions";
import ValuesAsNumbersField from "../../Components/Select/Single";
import MaterialUiForm from "../../Components/Form/RsvpForm";

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pdate: "",
      enDdate: "",
      rdate: [],
      ph_no: "",
      email: "",
      amount: 1
    };
  }

  render() {
    const value = [this.state.pdate, this.state.endDate];

    return (
      <div className="row">
        <div className="col s12">
          {/* <form
            onSubmit={e => {
              e.preventDefault();
              this.props.postHotelRsvp({
                // console.log({
                hotel: {
                  id: 1,
                  name: "Mark Hotel",
                  lat: 41,
                  lng: -121,
                  rate: "$155"
                },
                user: this.props.user,
                ph_no: this.state.ph_no,
                email: this.state.email,
                detail: { rdate: value, amount: this.state.amount }
              });
            }}
          >
            <label>我的电话:</label>

            <input
              name="ph_no"
              value={this.state.ph_no}
              onChange={e =>
                this.setState({
                  ph_no: e.target.value
                })
              }
            />
            <label>我的email:</label>

            <input
              name="email"
              value={this.state.email}
              onChange={e =>
                this.setState({
                  email: e.target.value
                })
              }
            />
            <label>房间数：</label>

            <ValuesAsNumbersField
              value={this.state.amount}
              onValueChange={value => {
                this.setState({ amount: value });
              }}
            />
            <label>请选择入住日期-出住日期：</label>

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
            <button type="submit" className="btn">
              提交
            </button>
          </form> */}
          <MaterialUiForm />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps, actions)(Test);
