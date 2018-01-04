import _ from "lodash";
import React from "react";
import moment from "moment";
import classNames from "classnames/bind";

const Navigator = props => {
  const {
    conditions,
    locations,
    passedStep,
    flushResults,
    selectedVehicle,
    flushSelectedVehicle,
    vehicleTypes
  } = props;

  function renderTime(timeStr) {
    return moment(timeStr, "hhmm").format("h:mm a");
  }

  function returnToSearch(stepId) {
    if (stepId === "step1" || stepId === "step2") {
      flushResults();
      props.history.push("/search");
    } else if (stepId === "step3") {
      flushSelectedVehicle();
      props.history.push("/result");
    } else if (stepId === "step4") {
      props.history.push("/extras");
    }
  }

  function vehicleNameByLocale(vehicleType) {
    const vehicleNames = _.split(vehicleType, "|");

    return _.first(vehicleNames);

    // if (lang === 'en') {
    //   return _.first(vehicleNames);
    // }

    // return _.last(vehicleNames);
  }

  const pickDateTimeStr = `${moment(conditions.pickDate).format(
    "ll"
  )} ${renderTime(conditions.pickTime)}`;

  const returnDateTimeStr = `${moment(conditions.returnDate).format(
    "ll"
  )} ${renderTime(conditions.returnTime)}`;

  const pickLocationName = _.get(locations, [
    conditions.pickLocation,
    "locationName"
  ]);
  const returnLocationName = _.get(locations, [
    conditions.returnLocation,
    "locationName"
  ]);

  return (
    <div className="search-conditions-wrap">
      <div className="container search-conditions">
        <div
          className={classNames({
            "condition-item": true,
            active: passedStep >= 1
          })}
        >
          <div
            className="detail"
            onClick={passedStep >= 1 ? () => returnToSearch("step1") : () => {}}
          >
            <h5>
              <i className="check-icon fa fa-check-circle" />
              1. Rental Data & Time
            </h5>
            <p>{`${pickDateTimeStr} - ${returnDateTimeStr}`}</p>
          </div>
        </div>
        <div
          className={classNames({
            "condition-item": true,
            active: passedStep >= 2
          })}
        >
          <div
            className="detail"
            onClick={passedStep >= 2 ? () => returnToSearch("step2") : () => {}}
          >
            <h5>
              <i className="check-icon fa fa-check-circle" />2. Pickup & Return
            </h5>
            <p>{`${pickLocationName} - ${returnLocationName}`}</p>
          </div>
        </div>
        <div
          className={classNames({
            "condition-item": true,
            active: passedStep >= 3
          })}
        >
          <div
            className="detail"
            onClick={passedStep >= 3 ? () => returnToSearch("step3") : () => {}}
          >
            <h5>
              <i className="check-icon fa fa-check-circle" />3. Vehicle
            </h5>
            <div className="types-dropdown-wrap">
              <a href="#" className="current-name">
                {_.get(selectedVehicle, "vehicleName") || "All Vehicle Class"}
              </a>
              <ul className="list-unstyled sub-menu">
                {_.map(vehicleTypes, ({ vehicleTypeId, vehicleType }) => (
                  <li key={vehicleTypeId}>
                    <a href="#" title={vehicleNameByLocale(vehicleType)}>
                      {vehicleNameByLocale(vehicleType)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div
          className={classNames({
            "condition-item": true,
            active: passedStep >= 4
          })}
        >
          <div
            className="detail"
            onClick={passedStep >= 4 ? () => returnToSearch("step4") : () => {}}
          >
            <h5>
              <i className="check-icon fa fa-check-circle" />4. Extras
            </h5>
            {passedStep >= 4 ? <p>Modify Extras</p> : <p>Select Extras</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigator;