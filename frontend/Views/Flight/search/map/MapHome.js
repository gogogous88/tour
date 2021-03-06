import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import classNames from "classnames/bind";
import _ from "lodash";
import querystring from "querystring";

import {
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
} from "../../actions";

import Loading from "../../../../Components/Loading";

import MapButton from "../../../../Components/MapButton";
import appLayout from "SharedStyles/appLayout.css";

import MapHere from "./MapHere";
import styles from "./styles.css";

class MapResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: [
        { lat: 38.998459, lng: -97.563037 },
        { lat: 39.998519, lng: -97.563037 }
      ],
      location: { lat: null, lng: null }
    };
  }

  componentDidMount = async () => {
    this.centerPloc();
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
        this.props.router.push("/car-rental");
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

  centerPloc() {
    const { pickLocation } = this.props.location.query;

    if (pickLocation) {
      const plocString = toString(pickLocation);

      if (pickLocation === "5764") {
        return this.setState({
          location: { lat: 37.785903, lng: -122.433826 }
        });
      }
      if (pickLocation === "5761") {
        return this.setState({
          location: { lat: 34.074779, lng: -118.238744 }
        });
      }
      if (pickLocation === "5763") {
        return this.setState({
          location: { lat: 40.756763, lng: -73.982317 }
        });
      }
      if (pickLocation === "6916") {
        return this.setState({
          location: { lat: 40.783283, lng: -111.955515 }
        });
      }
      if (pickLocation === "5765") {
        return this.setState({
          location: { lat: 33.639293, lng: 117.770864 }
        });
      }
      return this.setState({ location: { lat: 43, lng: -122 } });

      // switch (plocString) {
      //   case "5761":
      //     this.setState({ location: { lat: 34.074779, lng: -118.238744 } });
      //   //5761, losangeles 34.074779, -118.238744
      //   // 5763: "new york city, NY",40.756763, -73.982317
      //   // 5765: "Orange County, CA",33.639293, -117.770864
      //   // 6916: "Salt Lake City, UT",40.783283, -111.955515
      //   // 5764: "San Francisco, CA",37.785903, -122.433826
      //   case "5763":
      //     this.setState({ location: { lat: 40.756763, lng: -73.982317 } });

      //   case "5765":
      //     this.setState({ location: { lat: 33.639293, lng: 117.770864 } });

      //   case "6916":
      //     this.setState({ location: { lat: 40.783283, lng: -111.955515 } });

      //   case "5764":
      //     this.setState({ location: { lat: 37.785903, lng: -122.433826 } });
      //   default:
      //     this.setState({ location: { lat: 34.074779, lng: -118.238744 } });
    }
  }

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
    this.props.router.push("/extras");
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

    if (_.isEmpty(ratesResultFlitered)) {
      return <Loading />;
    }

    if (!this.state.location.lat) {
      return <Loading />;
    }

    return (
      <div>
        {/* <Navigator passedStep={2} {...this.props} /> */}
        <div>
          <div>
            {/* {_.map(ratesResultFlitered, rate => {
              const vehicle = _.get(vehicleTypes, rate.vehicleTypeId);
              const coords = vehicle.doors; */}

            <MapHere
              center={this.state.location}
              locations={this.state.locations}
              pin="/src/static/images/icons8-map-pin-orange-48 2.png"
              tax={tax}
              conditions={this.props.conditions}
              oneWayFee={!conditions.syncLocation ? oneWayFee : 0}
              ratesResultFlitered={ratesResultFlitered}
              // vehicle={coords}
              vehicleTypes={vehicleTypes}
              onVehicleSelect={this.onVehicleSelect}
            />

            {/* })} */}
            {_.size(ratesResultFlitered) === 0 && <div>no result matched</div>}
          </div>
        </div>
        <div className="fixed-action-btn toolbar">
          <a className="btn-floating btn-large red">
            <i className="large material-icons">view_list</i>
          </a>
          <ul>
            <li className="waves-effect waves-light">
              <a
                onClick={e => {
                  e.preventDefault();
                  this.props.router.push(
                    `/result/map?${querystring.stringify(
                      this.props.conditions
                    )}`
                  );
                }}
              >
                地图显示
              </a>
            </li>
            <li className="waves-effect waves-light">
              <a
                onClick={e => {
                  e.preventDefault();
                  this.props.router.push(
                    `/result?${querystring.stringify(this.props.conditions)}`
                  );
                }}
              >
                列表显示
              </a>
            </li>
          </ul>
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
})(MapResult);
