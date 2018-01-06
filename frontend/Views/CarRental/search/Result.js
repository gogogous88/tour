import _ from "lodash";
import React, { Component } from "react";
import moment from "moment";
import classNames from "classnames/bind";
import { connect } from "react-redux";
import querystring from "querystring";

import {
  fetchToken,
  fetchLocations,
  fetchVehicles,
  fetchTax,
  fetchRates,
  fetchOneWayFee,
  flushResults,
  updateSearchConditions,
  saveSelectedVehicle,
  flushSelectedVehicle
} from "../actions";

import Navigator from "./Navigator";
import Vehicle from "./Vehicle";
import Loading from "../../../Components/Loading";

import styles from "./styles/result.css";

class Result extends Component {
  componentDidMount = async () => {
    this.props.flushSelectedVehicle();

    // check access_token
    if (!this.props.access_token) {
      await this.props.fetchToken();
    }

    // check locations
    if (_.isEmpty(this.props.locations)) {
      await this.props.fetchLocations();
    }

    // parse conditons from url
    if (_.isEmpty(this.props.conditions)) {
      const conditions = querystring.parse(window.location.search.slice(1));
      if (_.isEmpty(conditions)) {
        this.props.history.push("/search");
        return;
      }
      this.props.updateSearchConditions(conditions);
    }

    // fetch vehicles
    await this.props.fetchVehicles();

    const {
      pickLocation,
      pickDate,
      pickTime,
      returnLocation,
      returnDate,
      returnTime,
      syncLocation
    } = this.props.conditions;

    // fetch tax
    await this.props.fetchTax(pickLocation);

    // fetch one way fee
    if (!syncLocation) {
      await this.props.fetchOneWayFee(pickLocation, returnLocation);
    }

    // fetch rates
    const startDate = moment(
      `${pickDate} ${moment(pickTime, "hhmm").format("HH:mm")}`
    ).format();

    const endDate = moment(
      `${returnDate} ${moment(returnTime, "hhmm").format("HH:mm")}`
    ).format();

    await this.props.fetchRates({
      locationId: pickLocation,
      startDate,
      endDate
    });
  };

  componentWillReceiveProps(nextProps) {
    // refetch token before expiration
    if (this.props.access_token !== nextProps.access_token) {
      setTimeout(() => {
        this.props.fetchToken();
      }, nextProps.expires_in * 1000);
    }
  }

  onVehicleSelect = selectedVehicle => {
    this.props.saveSelectedVehicle(selectedVehicle);
    this.props.history.push("/extras");
  };

  render() {
    const {
      conditions,
      locations,
      ratesResult,
      vehicleTypes,
      tax,
      oneWayFee
    } = this.props;

    if (
      !locations ||
      _.isEmpty(conditions) ||
      _.isEmpty(ratesResult) ||
      _.isEmpty(vehicleTypes) ||
      (!conditions.syncLocation && _.isNull(oneWayFee))
    ) {
      return <Loading />;
    }

    let ratesResultFlitered = ratesResult;
    if (conditions.vehicleTypeId > 0) {
      ratesResultFlitered = _.filter(
        ratesResultFlitered,
        o => o.vehicleTypeId === conditions.vehicleTypeId
      );
    }

    return (
      <div className="result-container">
        <Navigator passedStep={2} {...this.props} />
        <div className={styles.resultWrap}>
          <div
            className={classNames(
              styles.resultList,
              styles.resultEmpty,
              "container"
            )}
          >
            {_.map(ratesResultFlitered, rate => (
              <Vehicle
                key={rate.rateId}
                tax={tax}
                oneWayFee={!conditions.syncLocation ? oneWayFee : 0}
                rate={rate}
                vehicle={_.get(vehicleTypes, rate.vehicleTypeId)}
                onVehicleSelect={this.onVehicleSelect}
              />
            ))}
            {_.size(ratesResultFlitered) === 0 && <div>no result matched</div>}
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
  fetchToken,
  fetchLocations,
  fetchVehicles,
  fetchTax,
  fetchRates,
  fetchOneWayFee,
  updateSearchConditions,
  flushResults,
  saveSelectedVehicle,
  flushSelectedVehicle
})(Result);
