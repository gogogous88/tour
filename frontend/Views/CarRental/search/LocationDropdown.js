import _ from "lodash";
import React from "react";
import classNames from "classnames/bind";

class LocationDropdown extends React.Component {
  renderToggle() {
    if (this.props.syncLocation) {
      return (
        <div>
          <p style={{ fontSize: 14 }}>
            异地还车
            <img src="/src/static/icons/toggleButtons/toggleOffGreen.svg" />
          </p>
        </div>
      );
    }
    return (
      <div>
        <p style={{ fontSize: 14 }}>
          异地还车
          <img src="/src/static/icons/toggleButtons/toggleOnGreen.svg" />
        </p>
      </div>
    );
  }
  render() {
    function renderLocationName(locationId) {
      return _.get(this.props.locations, [locationId, "locationName"]);
    }

    return (
      <div className={classNames({ "col-12": true, "col-lg-6": true })}>
        <div className="input-box-wrap">
          <label>
            <i className="fa fa-map-marker fa-1x" />
            {this.props.labelText === "Pickup Location"
              ? "取车地点:"
              : "还车地点:"}
          </label>
          <div
            className={classNames({
              "input-box": true,
              disabled: this.props.isDisabled
            })}
          >
            <div className="select-wrap">
              {/* <span>{renderLocationName(props.value)}</span> */}

              <select
                style={{ display: "flex", zIndex: 1 }}
                name={this.props.name}
                value={this.props.value}
                onChange={this.props.onInputChange}
                disabled={this.props.isDisabled}
              >
                {_.map(this.props.locations, ({ locationId, locationName }) => (
                  <option key={locationId} value={locationId}>
                    {locationName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {this.props.name === "pickLocation" && (
            <div className="form-check">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  name="syncLocation"
                  className="form-check-input"
                  onChange={this.props.onInputChange}
                  checked={!this.props.syncLocation}
                />
                {this.renderToggle()}
              </label>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default LocationDropdown;
