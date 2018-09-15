import $ from "jquery";
import _ from "lodash";
import React, { Component } from "react";
import moment from "moment";
import "moment/locale/zh-cn";
import classNames from "classnames/bind";
import querystring from "querystring";

import { renderDateTime } from "../utils/yale";

class Navigator extends Component {
  constructor(props) {
    super(props);
    moment.locale(document.documentElement.lang || "en");
  }

  returnToSearch = stepId => {
    if (stepId === "step1" || stepId === "step2") {
      this.props.flushResults();
      this.props.router.push("/car-rental");
    } else if (stepId === "step3") {
      this.props.flushSelectedVehicle();
      this.props.router.push(
        `/result?${querystring.stringify(this.props.conditions)}`
      );
    } else if (stepId === "step4") {
      this.props.router.push("/extras");
    }
  };

  vehicleNameByLocale = vehicleType => {
    const vehicleNames = _.split(vehicleType, "|");

    return _.last(vehicleNames);
  };

  selectVehicleType = (e, vehicleTypeId) => {
    e.preventDefault();
    this.props.updateSearchConditions({ vehicleTypeId });
    $("#subMenu").css("display", "none");
  };

  handleMenuShow = () => {
    $("#subMenu").css("display", "block");
  };

  handleMenuHide = () => {
    $("#subMenu").css("display", "none");
  };

  showVehicleSelectTitle = () => {
    const { conditions, selectedVehicle, vehicleTypes } = this.props;
    const justSelectedVehicleName =
      conditions.vehicleTypeId > 0
        ? this.vehicleNameByLocale(
            _.get(vehicleTypes, [conditions.vehicleTypeId, "vehicleType"])
          )
        : "";
    return (
      _.get(selectedVehicle, "vehicleName") ||
      justSelectedVehicleName ||
      "All Vehicle Class"
    );
  };

  render() {
    const {
      conditions,
      locations,
      passedStep,
      selectedVehicle,
      vehicleTypes
    } = this.props;

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
            <i className="check-icon fa fa-check-circle" />
            <div
              className="detail"
              onClick={
                passedStep >= 1 ? () => this.returnToSearch("step1") : () => {}
              }
            >
              <h3>1. Rental Data & Time</h3>
              <p>{`${renderDateTime(conditions, "pick")} - ${renderDateTime(
                conditions,
                "return"
              )}`}</p>
            </div>
          </div>
          <div
            className={classNames({
              "condition-item": true,
              active: passedStep >= 2
            })}
          >
            <i className="check-icon fa fa-check-circle" />
            <div
              className="detail"
              onClick={
                passedStep >= 2 ? () => this.returnToSearch("step2") : () => {}
              }
            >
              <h3>2. Pickup & Return</h3>
              <p>{`${pickLocationName} - ${returnLocationName}`}</p>
            </div>
          </div>
          <div
            className={classNames({
              "condition-item": true,
              active: passedStep >= 3
            })}
          >
            <i className="check-icon fa fa-check-circle" />
            <div
              className="detail"
              onClick={
                passedStep >= 3 ? () => this.returnToSearch("step3") : () => {}
              }
              onMouseEnter={this.handleMenuShow}
              onMouseLeave={this.handleMenuHide}
            >
              <h3>3. Vehicle</h3>
              <div className="types-dropdown-wrap">
                <a href="#" className="current-name">
                  {this.showVehicleSelectTitle()}
                </a>
                {passedStep === 2 && (
                  <ul className="list-unstyled sub-menu" id="subMenu">
                    {conditions.vehicleTypeId > 0 && (
                      <li>
                        <a
                          href="#"
                          title="All Vehicle Class"
                          onClick={e => this.selectVehicleType(e, 0)}
                        >
                          All Vehicle Class
                        </a>
                      </li>
                    )}
                    {_.map(vehicleTypes, ({ vehicleTypeId, vehicleType }) => (
                      <li
                        key={vehicleTypeId}
                        className={classNames({
                          active:
                            vehicleTypeId === conditions.vehicleTypeId ||
                            vehicleTypeId ===
                              _.get(selectedVehicle, "vehicleTypeId")
                        })}
                      >
                        <a
                          href="#"
                          title={this.vehicleNameByLocale(vehicleType)}
                          onClick={e =>
                            this.selectVehicleType(e, vehicleTypeId)
                          }
                        >
                          {this.vehicleNameByLocale(vehicleType)}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div
            className={classNames({
              "condition-item": true,
              active: passedStep >= 4
            })}
          >
            <i className="check-icon fa fa-check-circle" />
            <div
              className="detail"
              onClick={
                passedStep >= 4 ? () => returnToSearch("step4") : () => {}
              }
            >
              <h3>4. Extras</h3>
              {passedStep >= 4 ? <p>Modify Extras</p> : <p>Select Extras</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navigator;
