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
        <label>
          <i className="fa fa-map-marker fa-1x" />
          {props.labelText === "Pickup Location" ? "取车地点:" : "还车地点:"}
        </label>
        <div
          className={classNames({
            "input-box": true,
            disabled: props.isDisabled
          })}
        >
          <div className="select-wrap">
            {/* <span>{renderLocationName(props.value)}</span> */}

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
        </div>
        {props.name === "pickLocation" && (
          <div className="form-check">
            <label className="form-check-label">
              <input
                style={{ zIndex: 1, display: "flex" }}
                type="checkbox"
                name="syncLocation"
                className="form-check-input"
                onChange={props.onInputChange}
                checked={!props.syncLocation}
              />
              在其他城市还车
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationDropdown;
