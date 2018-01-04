import _ from "lodash";
import React, { Component } from "react";
import classNames from "classnames/bind";

class Vehicle extends Component {
  state = {
    currentView: "default"
  };

  showDetailView = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      currentView: "detail"
    });
  };

  showPriceView = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      currentView: "price"
    });
  };

  showDefaultView = () => {
    this.setState({
      currentView: "default"
    });
  };

  renderExtraMilesLine = (dailyKMorMileageAllowed, kMorMileageCharge) => {
    if (dailyKMorMileageAllowed > 0) {
      return `${dailyKMorMileageAllowed} Miles Per Day, Miles Charge: $${kMorMileageCharge.toFixed(
        2
      )} Per Mile`;
    }
    return "Unlimited Miles Per Day";
  };

  render() {
    const { tax, oneWayFee } = this.props;
    const {
      vehicleTypeId,
      dailyKMorMileageAllowed,
      kMorMileageCharge,
      dailyQty,
      dailyRate,
      weeklyQty,
      weeklyRate,
      monthlyQty,
      monthlyRate,
      totalDays
    } = this.props.rate;
    const { vehicleType, sample, seats, doors } = this.props.vehicle;

    // total rate
    const totalWithoutTax =
      monthlyQty * monthlyRate + weeklyQty * weeklyRate + dailyQty * dailyRate;
    const taxFee = totalWithoutTax * tax / 100;
    const totalWithTax = totalWithoutTax * (1 + tax / 100) + oneWayFee;

    // i18n tweak
    let vehicleName = _.split(vehicleType, "|");
    let vehicleDesc = _.split(sample, "|");

    // if (lang === 'en') {
    //   vehicleName = _.first(vehicleName);
    //   vehicleDesc = _.first(vehicleDesc);
    // } else if (lang === 'zh-cn') {
    //   vehicleName = _.last(vehicleName);
    //   vehicleDesc = _.last(vehicleDesc);
    // }
    vehicleName = _.first(vehicleName);
    vehicleDesc = _.first(vehicleDesc);

    return (
      <div className="result-item" onClick={this.showDefaultView}>
        <div className="default-view">
          <a href="#" className="detail-link" onClick={this.showDetailView}>
            Details
          </a>
          <div className="image">
            <img
              src={`http://www.yalevanrental.com/uploads/rental/${vehicleTypeId}.jpg`}
            />
          </div>
          <div className="desc">
            <div className="desc-row">
              <div className="desc-title">Details</div>
              <div className="desc-content">
                <p>{vehicleName}</p>
                <p>{vehicleDesc}</p>
              </div>
            </div>
            <div className="desc-row">
              <div className="desc-title">Price</div>
              <div className="desc-content">
                <div className="price-content">
                  <div>
                    <strong>${dailyRate.toFixed(2)}</strong>
                    <p>Per Day</p>
                  </div>
                  <div>
                    <strong className="highlight">
                      ${totalWithTax.toFixed(2)}
                    </strong>
                    <p>Total</p>
                    <p>
                      <a href="#" onClick={this.showPriceView}>
                        Price Details
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={classNames({
            "price-view": true,
            open: this.state.currentView === "price"
          })}
        >
          <i
            className="fa fa-times-thin close-icon"
            onClick={this.showDefaultView}
          />
          <h4>{vehicleName}</h4>
          <p>{vehicleDesc}</p>
          <p>
            {this.renderExtraMilesLine(
              dailyKMorMileageAllowed,
              kMorMileageCharge
            )}
          </p>
          <ul className="list-unstyled price-chart">
            <li>
              <span>{totalDays} Day(s)</span>
              <span>${totalWithoutTax.toFixed(2)}</span>
            </li>
            <li>
              <span>Tax({tax}%)</span>
              <span>${taxFee.toFixed(2)}</span>
            </li>
            {oneWayFee > 0 && (
              <li>
                <span>One Way Fee</span>
                <span>${oneWayFee.toFixed(2)}</span>
              </li>
            )}
            <li>
              <span>Estimated Total</span>
              <strong className="highlight">${totalWithTax.toFixed(2)}</strong>
            </li>
          </ul>
        </div>
        <div
          className={classNames({
            "detail-view": true,
            open: this.state.currentView === "detail"
          })}
        >
          <i
            className="fa fa-times-thin close-icon"
            onClick={this.showDefaultView}
          />
          <h4>{vehicleName}</h4>
          <p>{vehicleDesc}</p>
          <p>
            {this.renderExtraMilesLine(
              dailyKMorMileageAllowed,
              kMorMileageCharge
            )}
          </p>
          <table className="detail-table">
            <tbody>
              <tr>
                <th>Switch Type</th>
                <th>Passenger Capacity</th>
                <th>Bags</th>
              </tr>
              <tr>
                <td>AUTOMATIC</td>
                <td>{seats}</td>
                <td>{doors}</td>
              </tr>
            </tbody>
          </table>
          <p>
            Automatic, Air Conditioning, Additional options available, AM/FM
            Stereo CD/MP3
          </p>
        </div>
        <button
          className="btn btn-block btn-danger rounded-0 select-button"
          onClick={() =>
            this.props.onVehicleSelect({
              vehicleTypeId,
              vehicleName,
              vehicleDesc,
              tax,
              oneWayFee,
              totalWithoutTax,
              taxFee,
              totalWithTax,
              totalDays
            })
          }
        >
          Select
        </button>
      </div>
    );
  }
}

export default Vehicle;
