import $ from "jquery";
import _ from "lodash";
import React, { Component } from "react";
import moment from "moment";
import "moment/locale/zh-cn";
import classNames from "classnames/bind";
import querystring from "querystring";
import styles from "./styles/navigator.css";
import appLayout from "SharedStyles/appLayout.css";

class Navigator extends Component {
  constructor(props) {
    super(props);
    moment.locale(document.documentElement.lang || "en");
  }

  renderTime = timeStr => moment(timeStr, "hhmm").format("h:mm a");

  returnToSearch = stepId => {
    if (stepId === "step1" || stepId === "step2") {
      this.props.flushResults();
      this.props.history.push("/search");
    } else if (stepId === "step3") {
      this.props.flushSelectedVehicle();
      this.props.history.push(
        `/result?${querystring.stringify(this.props.conditions)}`
      );
    } else if (stepId === "step4") {
      this.props.history.push("/extras");
    }
  };

  vehicleNameByLocale = vehicleType => {
    const vehicleNames = _.split(vehicleType, "|");

    // if (lang === 'en') {
    //   return _.first(vehicleNames);
    // }

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
    const { conditions, selectedVehicle } = this.props;
    const justSelectedVehicleName =
      conditions.vehicleTypeId > 0
        ? vehicleNameByLocale(
            _.get(vehicleTypes, [conditions.vehicleTypeId, "vehicleType"])
          )
        : "";
    return (
      _.get(selectedVehicle, "vehicleName") ||
      justSelectedVehicleName ||
      "所有车型"
    );
  };

  renderSmallBP() {
    const {
      conditions,
      locations,
      passedStep,
      selectedVehicle,
      vehicleTypes
    } = this.props;
    return (
      <div
        className={classNames(
          styles.searchConditionsWrap,
          appLayout.showOnSmallBP
        )}
      >
        <div className={classNames(styles.searchConditions, { container })}>
          <div
            className={classNames(styles.conditionItem, {
              active: passedStep >= 3
            })}
          >
            <i
              className={classNames(
                styles.checkIcon,
                "check-icon fa fa-check-circle"
              )}
            />
            <div
              className={styles.detail}
              onClick={
                passedStep >= 3 ? () => this.returnToSearch("step3") : () => {}
              }
              onMouseEnter={this.handleMenuShow.bind(this)}
              onMouseLeave={this.handleMenuHide.bind(this)}
            >
              <div className={styles.typesDropdownWrap}>
                <a href="#" className={styles.currentName}>
                  <h3>筛选车型: {this.showVehicleSelectTitle()}</h3>
                </a>

                {passedStep === 2 && (
                  <ul
                    className={classNames(styles.subMenu, "list-unstyled")}
                    id="subMenu"
                  >
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
        </div>
      </div>
    );
  }

  render() {
    const {
      conditions,
      locations,
      passedStep,
      selectedVehicle,
      vehicleTypes
    } = this.props;

    const pickDateTimeStr = `${moment(conditions.pickDate).format(
      "ll"
    )} ${this.renderTime(conditions.pickTime)}`;

    const returnDateTimeStr = `${moment(conditions.returnDate).format(
      "ll"
    )} ${this.renderTime(conditions.returnTime)}`;

    const pickLocationName = _.get(locations, [
      conditions.pickLocation,
      "locationName"
    ]);
    const returnLocationName = _.get(locations, [
      conditions.returnLocation,
      "locationName"
    ]);

    return (
      <div>
        <div
          className={classNames(
            styles.searchConditionsWrap,
            appLayout.secondaryNavContent
          )}
        >
          <div className={classNames(styles.searchConditions, { container })}>
            <div
              className={classNames(styles.conditionItem, {
                active: passedStep >= 1
              })}
            >
              <i
                className={classNames(
                  styles.checkIcon,
                  "check-icon fa fa-check-circle"
                )}
              />
              <div
                className={styles.detail}
                onClick={
                  passedStep >= 1
                    ? () => this.returnToSearch("step1")
                    : () => {}
                }
              >
                <h3>1. 租车日期</h3>
                <p>{`${pickDateTimeStr} - ${returnDateTimeStr}`}</p>
              </div>
            </div>
            <div
              className={classNames(styles.conditionItem, {
                active: passedStep >= 2
              })}
            >
              <i
                className={classNames(
                  styles.checkIcon,
                  "check-icon fa fa-check-circle"
                )}
              />
              <div
                className={styles.detail}
                onClick={
                  passedStep >= 2
                    ? () => this.returnToSearch("step2")
                    : () => {}
                }
              >
                <h3>2. 取还地点</h3>
                <p>
                  {pickLocationName === returnLocationName
                    ? pickLocationName
                    : pickLocationName - returnLocationName}
                </p>
              </div>
            </div>
            <div
              className={classNames(styles.conditionItem, {
                active: passedStep >= 3
              })}
            >
              <i
                className={classNames(
                  styles.checkIcon,
                  "check-icon fa fa-check-circle"
                )}
              />
              <div
                className={styles.detail}
                onClick={
                  passedStep >= 3
                    ? () => this.returnToSearch("step3")
                    : () => {}
                }
                onMouseEnter={this.handleMenuShow}
                onMouseLeave={this.handleMenuHide}
              >
                <h3>3. 筛选车型</h3>
                <div className={styles.typesDropdownWrap}>
                  <a href="#" className={styles.currentName}>
                    {this.showVehicleSelectTitle()}
                  </a>
                  {passedStep === 2 && (
                    <ul
                      className={classNames(styles.subMenu, "list-unstyled")}
                      id="subMenu"
                    >
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
              className={classNames(styles.conditionItem, {
                active: passedStep >= 4
              })}
            >
              <i
                className={classNames(
                  styles.checkIcon,
                  "check-icon fa fa-check-circle"
                )}
              />
              <div
                className={styles.detail}
                onClick={
                  passedStep >= 4 ? () => returnToSearch("step4") : () => {}
                }
              >
                <h3>4. 额外选项</h3>
                {passedStep >= 4 ? <p>Modify Extras</p> : <p>Select Extras</p>}
              </div>
            </div>
          </div>
        </div>
        {this.renderSmallBP()}
      </div>
    );
  }
}

export default Navigator;
