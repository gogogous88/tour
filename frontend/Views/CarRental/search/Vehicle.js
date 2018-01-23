import _ from "lodash";
import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./styles/result.css";

import { formatMoney, getTotalDays } from "../utils/yale";

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
      return `${dailyKMorMileageAllowed} Miles Per Day, Miles Charge: ${formatMoney(
        kMorMileageCharge
      )} 每英里`;
    }
    return "不限英里数";
  };

  render() {
    const { tax, oneWayFee, conditions } = this.props;
    const {
      vehicleTypeId,
      dailyKMorMileageAllowed,
      kMorMileageCharge,
      dailyQty,
      dailyRate,
      weeklyQty,
      weeklyRate,
      monthlyQty,
      monthlyRate
    } = this.props.rate;
    const { vehicleType, baggages, sample, seats, doors } = this.props.vehicle;
    //doors is the coordinates
    const totalDays = getTotalDays(conditions);

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
      <div className={styles.resultItem} onClick={this.showDefaultView}>
        <div className={styles.defaultView}>
          <a
            href="#"
            className={classNames(styles.detialLink, styles.aStyle)}
            onClick={this.showDetailView}
          >
            查看配置
          </a>
          <div className={styles.image}>
            <img
              className={styles.imageStyle}
              src={`http://www.yalevanrental.com/uploads/rental/${vehicleTypeId}.jpg`}
            />
          </div>
          <div className={styles.desc}>
            <div className={styles.descRow}>
              <div className={styles.descTitle}>车型</div>
              <div className={styles.descContent}>
                <p>{vehicleName}</p>
                <p>{vehicleDesc}</p>
              </div>
            </div>
            <div className={styles.descRow}>
              <div className={styles.descTitle}>价格</div>
              <div className={styles.descContent}>
                <div className={styles.priceContent}>
                  <div className={styles.divContainer}>
                    <strong>{formatMoney(dailyRate)}</strong>
                    <p>每天</p>
                  </div>
                  <div className={styles.divContainer}>
                    <strong className={styles.highlight}>
                      {formatMoney(totalWithTax)}
                    </strong>
                    <p>总价</p>
                    <p>
                      <a
                        className={styles.aStyle}
                        href="#"
                        onClick={this.showPriceView}
                      >
                        价格明细
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={classNames(
            styles.priceView,
            this.state.currentView === "price" ? styles.open : ""
          )}
        >
          <div className={styles.closeIcon}>
            <img
              src="/src/static/icons/buttons/whiteingrayclose.svg"
              onClick={this.showDefaultView}
            />
          </div>
          <h4>{vehicleName}</h4>
          <p>{vehicleDesc}</p>
          <p>
            {this.renderExtraMilesLine(
              dailyKMorMileageAllowed,
              kMorMileageCharge
            )}
          </p>
          <ul className={classNames(styles.priceChart, "list-unstyled")}>
            <li className={styles.liStyle}>
              <span>{totalDays} 天(天数)</span>
              <span>{formatMoney(totalWithoutTax)}</span>
            </li>
            <li className={styles.liStyle}>
              <span>税率({tax}%)</span>
              <span>{formatMoney(taxFee)}</span>
            </li>
            {oneWayFee > 0 && (
              <li className={styles.liStyle}>
                <span>异地还车费</span>
                <span>{formatMoney(oneWayFee)}</span>
              </li>
            )}
            <li className={styles.liStyle}>
              <span>小计</span>
              <strong className={styles.highlight}>
                {formatMoney(totalWithTax)}
              </strong>
            </li>
          </ul>
        </div>
        <div
          className={classNames(
            styles.detailView,
            this.state.currentView === "detail" ? styles.open : ""
          )}
        >
          <div className={styles.closeIcon}>
            <img
              src="/src/static/icons/buttons/whiteingrayclose.svg"
              onClick={this.showDefaultView}
            />
          </div>
          <h4>{vehicleName}</h4>
          <p>{vehicleDesc}</p>
          <p>
            {this.renderExtraMilesLine(
              dailyKMorMileageAllowed,
              kMorMileageCharge
            )}
          </p>
          <table className={styles.detailTable}>
            <tbody>
              <tr>
                <th className={styles.thStyle}>自动/手动</th>
                <th className={styles.thStyle}>座位数</th>
                <th className={styles.thStyle}>行粒数</th>
              </tr>
              <tr>
                <td className={styles.tdStyle}>自动挡</td>
                <td className={styles.tdStyle}>{seats}</td>
                <td className={styles.tdStyle}>{baggages}</td>
              </tr>
            </tbody>
          </table>
          <p>自动挡，空调，AM/FM/CD系统及其他可选项</p>
        </div>
        <button
          className={classNames(
            styles.selectButton,
            "btn btn-block btn-danger rounded-0"
          )}
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
          选择
        </button>
      </div>
    );
  }
}

export default Vehicle;
