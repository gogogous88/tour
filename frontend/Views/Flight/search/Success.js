import React, { Component } from "react";
import { connect } from "react-redux";

class Success extends Component {
  render() {
    return (
      <div>
        <div
          className="container payment-success-wrap"
          dangerouslySetInnerHTML={{ __html: this.props.paymentResult.content }}
        />
        <p className="payment-print-wrap">
          <button
            className="btn btn-danger rounded-0"
            onClick={() => window.print()}
          >
            打印
          </button>
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.rentalReducer
  };
}

export default connect(mapStateToProps)(Success);
