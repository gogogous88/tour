import _ from "lodash";
import React from "react";
import classNames from "classnames/bind";

const LocationDropdown = props => {
  function renderLocationName(locationId) {
    return _.get(props.locations, [locationId, "locationName"]);
  }

  return (
    <div className={classNames({ "col-12": true, "col-lg-6": true })}>
      <div className="input-box-wrap">
        <label>{props.labelText}</label>
        <div
          className={classNames({
            "input-box": true,
            disabled: props.isDisabled
          })}
        >
          <div className="select-wrap">
            <span>{renderLocationName(props.value)}</span>
            <select
              style={{ display: "flex", zIndex: 1 }}
              name={props.name}
              value={props.value}
              onChange={props.onInputChange}
              disabled={props.isDisabled}
            >
              {_.map(props.locations, ({ locationId, locationName }) => (
                <option key={locationId} value={locationId}>
                  {locationName}
                </option>
              ))}
            </select>
          </div>
          <i className="fa fa-map-marker fa-1" />
        </div>
        {props.name === "pickLocation" && (
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="checkbox"
                name="syncLocation"
                className="form-check-input"
                onChange={props.onInputChange}
                checked={!props.syncLocation}
              />
              Return car to a different location
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationDropdown;
