import $ from "jquery";
import _ from "lodash";
import React, { Component } from "react";
import moment from "moment";
import "moment/locale/zh-cn";
import classNames from "classnames/bind";
import querystring from "querystring";
import styles from "./styles/navigator.css";
import appLayout from "SharedStyles/appLayout.css";

import { renderDateTime } from "../utils/yale";

class Navigator extends Component {
  constructor(props) {
    super(props);
    moment.locale(document.documentElement.lang || "en");
    this.state = {
      naviCondition: false,
      toggleSubMenu: true,
      vehicleSelected: null
    };
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
    this.setState({ naviCondition: false });
    this.props.updateSearchConditions({ vehicleTypeId });
    $("#subMenu").css("display", "none");
  };

  handleMenuShow = () => {
    $("#subMenu").css("display", "block");
    this.setState({ toggleSubMenu: true });
  };

  handleMenuHide = () => {
    $("#subMenu").css("display", "none");
    this.setState({ toggleSubMenu: false });
  };

  // 显示选择了哪种车型
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

    const pickLocationNameArray = _.get(locations, [
      conditions.pickLocation,
      "locationName"
    ]).split("|");
    const pickLocationName = pickLocationNameArray[1];
    const returnLocationNameArray = _.get(locations, [
      conditions.returnLocation,
      "locationName"
    ]).split("|");
    const returnLocationName = returnLocationNameArray[1];

    if (!this.state.naviCondition) {
      return (
        <div
          className={classNames(
            styles.searchConditionsWrap,
            appLayout.showOnSmallBP
          )}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around"
            }}
          >
            <div
              className={classNames(styles.detail, {
                active: passedStep >= 1
              })}
            >
              <div
                className={styles.detail}
                onClick={
                  passedStep >= 1
                    ? () => this.returnToSearch("step1")
                    : () => {}
                }
              >
                <h3>1. 租车日期</h3>
                <p style={{ paddingTop: 5 }}>{`${moment(
                  renderDateTime(conditions, "pick")
                ).format("MM/DD")} -${moment(
                  renderDateTime(conditions, "return")
                ).format("MM/DD")}`}</p>
              </div>
            </div>

            <div
              className={classNames(styles.detail, {
                active: passedStep >= 2
              })}
            >
              <div
                className={styles.detail}
                onClick={
                  passedStep >= 2
                    ? () => this.returnToSearch("step2")
                    : () => {}
                }
              >
                <h3>2. 取还地点</h3>
                <p style={{ paddingTop: 5 }}>
                  {pickLocationName === returnLocationName
                    ? pickLocationName
                    : ` ${pickLocationName} - ${returnLocationName}`}
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around"
            }}
          >
            <div
              className={classNames(styles.detail, {
                active: passedStep >= 3
              })}
            >
              <div
                className={styles.detail}
                onClick={
                  passedStep >= 3
                    ? () => this.returnToSearch("step3")
                    : () => {}
                }
              >
                <h3>3. 筛选车型</h3>
                <div style={{ paddingTop: 5 }}>
                  <button
                    onClick={() => {
                      this.setState({ naviCondition: true });
                    }}
                    className="grey lighten-3 flat-btn"
                  >
                    <span style={{ color: "black" }}>
                      {/* {this.state.vehicleSelected
                      ? this.state.vehicleSelected
                      : "筛选车型"} */}
                      {this.showVehicleSelectTitle()}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div
                className={classNames(styles.detail, {
                  active: passedStep >= 4
                })}
              >
                <div
                  className={styles.detail}
                  onClick={
                    passedStep >= 4
                      ? () => this.returnToSearch("step4")
                      : () => {}
                  }
                >
                  <h3>4.下一步</h3>
                  <p style={{ paddingTop: 5 }}>额外选项</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    const className = this.state.toggleSubMenu
      ? styles.displayFlex
      : styles.displayNone;
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
              onClick={this.handleMenuShow.bind(this)}
              onMouseLeave={this.handleMenuHide.bind(this)}
            >
              <h3>3. 选择车型</h3>
              <div className={styles.typesDropdownWrap}>
                <a
                  href="#"
                  className={styles.currentName}
                  onClick={
                    passedStep >= 3
                      ? () => this.returnToSearch("step3")
                      : () => {}
                  }
                >
                  {this.showVehicleSelectTitle()}
                </a>
                {passedStep === 2 && (
                  <ul
                    className={classNames(
                      styles.subMenu,
                      className,
                      "list-unstyled"
                    )}
                    id="subMenu"
                  >
                    {conditions.vehicleTypeId > 0 && (
                      <li>
                        <a
                          className={styles.aStyle}
                          href="#"
                          title="All Vehicle Class"
                          onClick={e => this.selectVehicleType(e, 0)}
                        >
                          所有车型
                        </a>
                      </li>
                    )}
                    {_.map(vehicleTypes, ({ vehicleTypeId, vehicleType }) => (
                      <li
                        key={vehicleTypeId}
                        className={classNames(
                          {
                            active:
                              vehicleTypeId === conditions.vehicleTypeId ||
                              vehicleTypeId ===
                                _.get(selectedVehicle, "vehicleTypeId")
                          },
                          styles.aStyle
                        )}
                      >
                        <a
                          href="#"
                          title={this.vehicleNameByLocale(vehicleType)}
                          onClick={e => {
                            this.selectVehicleType(e, vehicleTypeId);
                            this.setState({ toggleSubMenu: true });
                          }}
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

    const pickLocationNameArray = _.get(locations, [
      conditions.pickLocation,
      "locationName"
    ]).split("|");
    const pickLocationName = pickLocationNameArray[1];
    const returnLocationNameArray = _.get(locations, [
      conditions.returnLocation,
      "locationName"
    ]).split("|");
    const returnLocationName = returnLocationNameArray[1];

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
                <p>{`${moment(renderDateTime(conditions, "pick")).format(
                  "MM/DD"
                )} -${moment(renderDateTime(conditions, "return")).format(
                  "MM/DD"
                )}`}</p>
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
                    : ` ${pickLocationName} - ${returnLocationName}`}
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
                            className={styles.aStyle}
                            href="#"
                            title="All Vehicle Class"
                            onClick={e => this.selectVehicleType(e, 0)}
                          >
                            所有车型
                          </a>
                        </li>
                      )}
                      {_.map(vehicleTypes, ({ vehicleTypeId, vehicleType }) => (
                        <li
                          key={vehicleTypeId}
                          className={classNames(
                            {
                              active:
                                vehicleTypeId === conditions.vehicleTypeId ||
                                vehicleTypeId ===
                                  _.get(selectedVehicle, "vehicleTypeId")
                            },
                            styles.aStyle
                          )}
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
