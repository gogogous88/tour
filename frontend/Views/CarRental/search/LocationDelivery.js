import _ from "lodash";
import React, { Component } from "react";

import GeoSuggestInput from "../common/GeoSuggestInput";
import styles from "./styles/extras.css";
import searchStyles from "./styles/search.css";

class LocationDelivery extends Component {
  state = {
    typedAddress: false
  };

  componentDidMount() {
    this.setState({
      [this.props.name]: _.first(this.props.addresses)
    });
  }

  toggleTypedAddress = async ({ target }) => {
    await this.setState({ typedAddress: target.checked });

    const { name } = this.props;

    if (!target.checked) {
      // select from list
      const value = this.state[name];
      if (value) {
        this.props.onAddressSelect({
          [name]: value
        });
      }
    }

    this.props.proceedTotal();
  };

  onAddressChange = async ({ target }) => {
    await this.setState({
      [target.name]: target.value
    });

    this.props.onAddressSelect({
      [this.props.name]: target.value
    });

    this.props.proceedTotal();
  };

  onAddressSelected = ({ description }) => {
    this.props.onAddressSelect({
      [this.props.name]: description
    });

    this.props.proceedTotal();
  };

  render() {
    const { name, labelText, checkboxText, addresses } = this.props;
    const { typedAddress } = this.state;

    return (
      <div className={styles.locationItem}>
        <div>
          <label
          // className={styles.inputBoxWrapLabel}
          >
            {labelText === "Pickup Location" ? "取车地址:" : "还车地址:"}
          </label>
          {!typedAddress && (
            <div
            // className={searchStyles.inputBox}
            >
              <div
              // className={searchStyles.selectWrap}
              >
                <span>{_.get(this.state, [name]) || _.first(addresses)}</span>
                <select
                  // className={searchStyles.selectStyle}
                  name={name}
                  onChange={this.onAddressChange}
                  defaultValue={this.state[name]}
                >
                  {_.map(addresses, address => (
                    <option key={address} value={address}>
                      {address}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* <div className={styles.customAddress}>
          <label className={styles.customAddresslabel}>
            <input
              type="checkbox"
              className={styles.customAddressinput}
              checked={typedAddress}
              onChange={this.toggleTypedAddress}
            />
            {checkboxText}
          </label>
        </div> */}

        {/* {typedAddress && (
          <GeoSuggestInput onSelected={this.onAddressSelected} />
        )} */}
      </div>
    );
  }
}

export default LocationDelivery;
