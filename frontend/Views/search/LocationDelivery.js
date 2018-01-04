import _ from 'lodash';
import React, { Component } from 'react';

import GeoSuggestInput from '../common/GeoSuggestInput';

class LocationDelivery extends Component {
  state = {
    typedAddress: false
  };

  toggleTypedAddress = ({ target }) => {
    this.setState({ typedAddress: target.checked });
  };

  onAddressChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  onAddressSelected = address => {
    console.log(`onAddressSelected ${address}`);
  };

  render() {
    const { name, labelText, checkboxText, addresses } = this.props;
    const { typedAddress } = this.state;

    return (
      <div className="location-item">
        <div className="input-box-wrap">
          <label>{labelText}</label>
          {!typedAddress && (
            <div className="input-box">
              <div className="select-wrap">
                <span>{_.get(this.state, [name]) || _.first(addresses)}</span>
                <select name={name} onChange={this.onAddressChange}>
                  {_.map(addresses, address => (
                    <option key={address} value={address}>
                      {address}
                    </option>
                  ))}
                </select>
              </div>
              <i className="fa fa-map-marker fa-1" />
            </div>
          )}
        </div>

        <div className="custom-address">
          <label>
            <input
              type="checkbox"
              checked={typedAddress}
              onChange={this.toggleTypedAddress}
            />
            {checkboxText}
          </label>
        </div>

        {typedAddress && (
          <GeoSuggestInput onSelected={this.onAddressSelected} />
        )}
      </div>
    );
  }
}

export default LocationDelivery;
