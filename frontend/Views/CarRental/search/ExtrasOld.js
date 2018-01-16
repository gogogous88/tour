import React, { Component } from "react";
import { connect } from "react-redux";

import {
  fetchUploadToken,
  uploadPhoto,
  flushResults,
  fetchMisCharges,
  flushSelectedVehicle
} from "../actions";
import Navigator from "./Navigator";
import Loading from "./Loading";
import Equipment from "./Equipment";
import LocationDelivery from "./LocationDelivery";
import FileUploader from "../common/FileUploader";

class Extras extends Component {
  state = {
    misCharges: {}
  };

  componentDidMount = async () => {
    // redirect to search page if it comes without locations or conditions
    if (_.isEmpty(this.props.locations) || _.isEmpty(this.props.conditions)) {
      this.props.router.push("/car-rental");
      return;
    }

    if (_.isEmpty(this.props.uploadToken)) {
      const uploadToken = await this.props.fetchUploadToken();
      this.setState({ uploadToken });
    }

    await this.props.fetchMisCharges({
      vehicleTypeId: this.props.selectedVehicle.vehicleTypeId,
      locationId: this.props.conditions.pickLocation
    });

    this.initMiscCharges();
  };

  initMiscCharges = () => {
    const { selectedVehicle, misCharges } = this.props;

    const childSeat = _.find(misCharges, ["name", "Child Seat"]);
    const childSeatEuipment = {
      title: _.get(childSeat, "name"),
      price: _.get(childSeat, "value"),
      days: selectedVehicle.totalDays,
      amount: 0,
      multipliable: true
    };

    const gps = _.find(misCharges, ["name", "GPS"]);
    const gpsEuipment = {
      title: _.get(gps, "name"),
      price: _.get(gps, "value"),
      days: selectedVehicle.totalDays,
      amount: 0,
      multipliable: false
    };

    const cdw = _.find(misCharges, ["name", "CDW No Tax"]);
    const cdwEuipment = {
      title: _.get(cdw, "name"),
      price: _.get(cdw, "value"),
      days: selectedVehicle.totalDays,
      amount: 0,
      multipliable: false
    };

    this.setState({
      misCharges: {
        childSeatEuipment,
        gpsEuipment,
        cdwEuipment
      }
    });
  };

  handleAddClick = name => {
    const equipment = _.get(this.state.misCharges, name);
    this.setState({
      misCharges: {
        ...this.state.misCharges,
        [name]: {
          ...equipment,
          amount: equipment.amount + 1
        }
      }
    });
  };

  handleRemoveClick = name => {
    const equipment = _.get(this.state.misCharges, name);
    this.setState({
      misCharges: {
        ...this.state.misCharges,
        [name]: {
          ...equipment,
          amount: 0
        }
      }
    });
  };

  handleIncreaseClick = name => {
    this.handleAddClick(name);
  };

  handleDecreaseClick = name => {
    const equipment = _.get(this.state.misCharges, name);
    this.setState({
      misCharges: {
        ...this.state.misCharges,
        [name]: {
          ...equipment,
          amount: Math.max(equipment.amount - 1, 0)
        }
      }
    });
  };

  handleUploadComplete = (imageHash, name) => {
    // TODO: add result to redux
    console.log("handleUploadComplete", imageHash, name);
  };

  handleDelete = name => {
    // TODO: remove uploaded image
    console.log("handleonDelete", name);
  };

  onSubmit = () => {
    this.props.router.push("/form");
  };

  renderMisChargeItems = misCharges => (
    <table className="table table-striped">
      <tbody>
        {_.map(misCharges, (misCharge, k) => (
          <Equipment
            key={k}
            name={k}
            {...misCharge}
            onAddClick={() => this.handleAddClick(k)}
            onRemoveClick={() => this.handleRemoveClick(k)}
            onIncreaseClick={() => this.handleIncreaseClick(k)}
            onDecreaseClick={() => this.handleDecreaseClick(k)}
          />
        ))}
      </tbody>
    </table>
  );

  render() {
    const { conditions, locations, misCharges } = this.props;

    if (!locations || _.isEmpty(conditions)) {
      return <Loading />;
    }

    return (
      <div className="result-container">
        <Navigator passedStep={3} {...this.props} />
        <div className="extras-wrap">
          <div className="container">
            <div className="extras-items">
              <div className="extra-item">
                <div className="header">
                  <h3>Additional Options</h3>
                  <em>A best way to make the total > $300.00</em>
                </div>
                <div className="body">
                  {_.isEmpty(misCharges) ? (
                    <Loading containerClass="mischarge-loading" smallDots />
                  ) : (
                    this.renderMisChargeItems(this.state.misCharges)
                  )}
                </div>
              </div>

              <div className="extra-item">
                <div className="header">
                  <h3>Pick-up & Return Location</h3>
                  <em>Free Delivery if total is more than $300</em>
                </div>
                <div className="body">
                  <div className="location-group">
                    <LocationDelivery
                      name="pickLocation"
                      labelText="Pickup Location"
                      checkboxText="Deliver the Vehicle to Me"
                      addresses={["317 E. Foothill Blvd #105"]}
                    />
                    <LocationDelivery
                      name="returnLocation"
                      labelText="Return Location"
                      checkboxText="Pickup the Vehicle from Me"
                      addresses={[
                        "1577 Morris ave",
                        "133-53 37th ave, Flushing NY 11354"
                      ]}
                    />
                  </div>
                </div>
              </div>

              <div className="extra-item">
                <div className="header">
                  <h3>Documents upload</h3>
                </div>
                <div className="body">
                  <div className="upload-group">
                    <div className="upload-item">
                      <h4>Driver’s License Info</h4>
                      <FileUploader
                        name="driverLicense"
                        uploadToken={this.props.uploadToken}
                        onUploadPhoto={this.props.uploadPhoto}
                        onUploadComplete={this.handleUploadComplete}
                        onDelete={this.handleDelete}
                      />
                    </div>
                    <div className="upload-item">
                      <h4>Insurance Info</h4>
                      <FileUploader
                        name="insuranceInfo"
                        uploadToken={this.props.uploadToken}
                        onUploadPhoto={this.props.uploadPhoto}
                        onUploadComplete={this.handleUploadComplete}
                        onDelete={this.handleDelete}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="extra-item">
                <div className="body">
                  <div className="extra-submit">
                    <div className="total">
                      Total
                      <strong>$92.07</strong>
                    </div>
                    <button
                      className="btn btn-danger rounded-0 select-button"
                      onClick={this.onSubmit}
                      disabled={_.isEmpty(misCharges)}
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.rentalReducer
  };
}

export default connect(mapStateToProps, {
  fetchUploadToken,
  uploadPhoto,
  flushResults,
  fetchMisCharges,
  flushSelectedVehicle
})(Extras);
