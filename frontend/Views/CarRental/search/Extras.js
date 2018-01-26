import React, { Component } from "react";
import { connect } from "react-redux";
import querystring from "querystring";
import classNames from "classnames/bind";
import styles from "./styles/extras.css";

import {
  fetchUploadToken,
  uploadPhoto,
  flushResults,
  fetchMisCharges,
  flushSelectedVehicle,
  updateSavedEquipments,
  updateSelectedAddresses,
  updateFinalPrice,
  updateUploadedDocuments,
  removeUploadedDocuments
} from "../actions";
import Navigator from "./Navigator";
import Loading from "./Loading";
import Equipment from "./Equipment";
import LocationDelivery from "./LocationDelivery";
import FileUploader from "../common/FileUploader";
import { formatMoney, getTotalDays } from "../utils/yale";

class Extras extends Component {
  state = {
    misCharges: {}
  };

  componentDidMount = async () => {
    // redirect to search page
    if (_.isEmpty(this.props.locations) || _.isEmpty(this.props.conditions)) {
      this.props.router.push("/car-rental");
      return;
    }

    // redirect to result page
    if (
      _.isEmpty(this.props.selectedVehicle) &&
      !_.isEmpty(this.props.conditions)
    ) {
      this.props.router.push(
        `/result?${querystring.stringify(this.props.conditions)}`
      );
    }

    this.proceedTotal();

    this.selectDefaultAddress();

    if (_.isEmpty(this.props.uploadToken)) {
      const uploadToken = await this.props.fetchUploadToken();
      this.setState({ uploadToken });
    }

    if (_.isEmpty(this.props.misCharges)) {
      await this.props.fetchMisCharges({
        vehicleTypeId: this.props.selectedVehicle.vehicleTypeId,
        locationId: this.props.conditions.pickLocation
      });
    }

    this.initMiscCharges();
  };

  formatMiscChargeItem = name => {
    const item = _.find(this.props.misCharges, ["name", name]);

    return {
      id: _.get(item, "miscChargeID"),
      title: _.get(item, "name"),
      price: _.get(item, "value"),
      days: getTotalDays(this.props.conditions),
      amount: 0,
      multipliable: name === "Child Seat"
    };
  };

  initMiscCharges = () => {
    this.setState({
      misCharges: {
        childSeatEuipment: this.formatMiscChargeItem("Child Seat"),
        gpsEuipment: this.formatMiscChargeItem("GPS"),
        cdwEuipment: this.formatMiscChargeItem("CDW No Tax")
      }
    });
  };

  selectDefaultAddress = () => {
    const { locations, conditions } = this.props;

    const pickLocation = _.get(locations, [
      conditions.pickLocation,
      "address1"
    ]);

    const returnLocation = _.get(locations, [
      conditions.returnLocation,
      "address1"
    ]);

    this.props.updateSelectedAddresses({
      pickLocation,
      returnLocation
    });
  };

  handleAddClick = async name => {
    const equipment = _.get(this.state.misCharges, name);
    await this.setState(
      {
        misCharges: {
          ...this.state.misCharges,
          [name]: {
            ...equipment,
            amount: equipment.amount + 1
          }
        }
      },
      this.props.updateSavedEquipments(equipment.id, equipment.amount + 1)
    );
    this.proceedTotal();
  };

  handleRemoveClick = async name => {
    const equipment = _.get(this.state.misCharges, name);
    await this.setState(
      {
        misCharges: {
          ...this.state.misCharges,
          [name]: {
            ...equipment,
            amount: 0
          }
        }
      },
      this.props.updateSavedEquipments(equipment.id, 0)
    );
    this.proceedTotal();
  };

  handleIncreaseClick = name => {
    this.handleAddClick(name);
  };

  handleDecreaseClick = async name => {
    const equipment = _.get(this.state.misCharges, name);
    await this.setState(
      {
        misCharges: {
          ...this.state.misCharges,
          [name]: {
            ...equipment,
            amount: Math.max(equipment.amount - 1, 0)
          }
        }
      },
      this.props.updateSavedEquipments(
        equipment.id,
        Math.max(equipment.amount - 1, 0)
      )
    );
    this.proceedTotal();
  };

  handleUploadComplete = (imageHash, name) => {
    this.props.updateUploadedDocuments({ [name]: imageHash });
  };

  handleDelete = name => {
    this.props.removeUploadedDocuments(name);
  };

  proceedTotal = () => {
    const {
      selectedVehicle,
      selectedEquipments,
      misCharges,
      conditions,
      selectedAddresses
    } = this.props;

    const vehicleTotal = selectedVehicle.totalWithTax;
    const vehicleTotalWithoutTax = selectedVehicle.totalWithoutTax;

    const equipmentTotal = _.reduce(
      selectedEquipments,
      (result, value, id) => {
        const chargeItem = _.find(
          misCharges,
          o => o.miscChargeID === _.toInteger(id)
        );

        return (
          result + value.amount * chargeItem.value * getTotalDays(conditions)
        );
      },
      0
    );

    const pickAddresses = this.extractAddresses(conditions.pickLocation);
    const returnAddresses = this.extractAddresses(conditions.returnLocation);
    const isDriveForPick = selectedAddresses.pickLocation
      ? !_.includes(pickAddresses, selectedAddresses.pickLocation)
      : false;
    const isDriveForReturn = selectedAddresses.returnLocation
      ? !_.includes(returnAddresses, selectedAddresses.returnLocation)
      : false;

    const driveForPickFee = isDriveForPick ? 50 : 0;
    const driveForReturnFee = isDriveForReturn ? 50 : 0;

    const driveFeeTotal =
      vehicleTotal + equipmentTotal < 300
        ? driveForPickFee + driveForReturnFee
        : 0;

    const total = vehicleTotal + equipmentTotal + driveFeeTotal;

    this.props.updateFinalPrice({
      vehicleTotal,
      vehicleTotalWithoutTax,
      equipmentTotal,
      driveFeeTotal,
      driveForPickFee,
      driveForReturnFee,
      total
    });
  };

  refreshErrorUI = () => {
    const { selectedAddresses, uploadedDocuments } = this.props;
    let errorText = "";

    if (_.isEmpty(uploadedDocuments)) {
      errorText +=
        "Please upload photos of your driver's license and vehicle insurance";
    }

    if (!_.isEmpty(_.filter(selectedAddresses, o => _.isEmpty(_.trim(o))))) {
      errorText += "Please complete Pick-up & Return address";
    }

    alert(errorText);
  };

  isSubmittable = () => {
    const { misCharges, uploadedDocuments, selectedAddresses } = this.props;
    // if (
    //   _.isEmpty(misCharges) ||
    //   _.isEmpty(uploadedDocuments) ||
    //   !_.isEmpty(_.filter(selectedAddresses, o => _.isEmpty(_.trim(o))))
    // ) {
    //   return false;
    // }

    return true;
  };

  onSubmit = () => {
    if (this.isSubmittable()) {
      this.props.router.push("/form");
    } else {
      this.refreshErrorUI();
    }
  };

  renderMisChargeItems = misCharges => {
    const { selectedEquipments } = this.props;

    return (
      <table className={classNames(styles.tableStyle, "table-striped")}>
        <tbody>
          {_.map(misCharges, (misCharge, k) => (
            <Equipment
              key={k}
              name={k}
              {...misCharge}
              amount={_.get(selectedEquipments, [misCharge.id, "amount"]) || 0}
              onAddClick={() => this.handleAddClick(k)}
              onRemoveClick={() => this.handleRemoveClick(k)}
              onIncreaseClick={() => this.handleIncreaseClick(k)}
              onDecreaseClick={() => this.handleDecreaseClick(k)}
            />
          ))}
        </tbody>
      </table>
    );
  };

  extractAddresses = locationId => {
    const addresses = [];

    // extract addresses from 'address1' and 'address2'
    _.each([1, 2], i => {
      const address = _.get(this.props.locations, [locationId, `address${i}`]);
      if (address) {
        addresses.push(address);
      }
    });

    return addresses;
  };

  render() {
    const { conditions, locations, misCharges, finalPrice } = this.props;
    // console.log("here", this.props);
    if (!locations || _.isEmpty(conditions)) {
      return <Loading />;
    }

    const pickAddresses = this.extractAddresses(conditions.pickLocation);
    const returnAddresses = this.extractAddresses(conditions.returnLocation);

    console.log("extras", this.props);

    return (
      <div className="result-container">
        <Navigator passedStep={3} {...this.props} />
        <div className={styles.extrasWrap}>
          <div className="container">
            <div className={styles.extrasItems}>
              <div className={styles.extraItem}>
                <div className={styles.headerStyle}>
                  <h3>额外选项</h3>
                  {/* {finalPrice.total < 300 && (
                    <em>A best way to make the total > $300</em>
                  )} */}
                </div>
                <div className={styles.bodyStyle}>
                  {_.isEmpty(misCharges) ? (
                    <Loading containerClass="mischarge-loading" smallDots />
                  ) : (
                    this.renderMisChargeItems(this.state.misCharges)
                  )}
                </div>
              </div>

              <div className={styles.extraItem}>
                <div className={styles.headerStyle}>
                  <h3>取还地</h3>
                  {/* {finalPrice.total < 300 && (
                    <em>Free Delivery if total is more than $300</em>
                  )} */}
                </div>
                <div className={styles.bodyStyle}>
                  <div className={styles.locationGroup}>
                    <LocationDelivery
                      name="pickLocation"
                      labelText="Pickup Location"
                      checkboxText="Deliver the Vehicle to Me"
                      addresses={pickAddresses}
                      onAddressSelect={this.props.updateSelectedAddresses}
                      onAddressChange={this.props.updateSelectedAddresses}
                      proceedTotal={this.proceedTotal}
                    />
                    <LocationDelivery
                      name="returnLocation"
                      labelText="Return Location"
                      checkboxText="Pickup the Vehicle from Me"
                      addresses={returnAddresses}
                      onAddressSelect={this.props.updateSelectedAddresses}
                      onAddressChange={this.props.updateSelectedAddresses}
                      proceedTotal={this.proceedTotal}
                    />
                  </div>
                </div>
              </div>

              {/* <div className="extra-item">
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
              </div> */}

              <div className={styles.extraItem}>
                <div className={styles.bodyStyle}>
                  <div className={styles.extraSubmit}>
                    <div className={styles.totalStyle}>
                      Total
                      <strong className={styles.strongStyle}>
                        {formatMoney(finalPrice.total)}
                      </strong>
                    </div>
                    <button
                      className={classNames({
                        btn: true,
                        "btn-danger": true,
                        "rounded-0": true,
                        "select-button": true,
                        disabled: !this.isSubmittable()
                      })}
                      onClick={this.onSubmit}
                      disabled={_.isEmpty(misCharges)}
                    >
                      下一步
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
  flushSelectedVehicle,
  updateSavedEquipments,
  updateSelectedAddresses,
  updateFinalPrice,
  updateUploadedDocuments,
  removeUploadedDocuments
})(Extras);
