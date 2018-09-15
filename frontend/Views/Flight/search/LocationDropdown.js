import _ from 'lodash';
import React from 'react';
import classNames from 'classnames/bind';
import styles from './styles/search.css';

class LocationDropdown extends React.Component {
  // renderToggle() {
  //   if (this.props.syncLocation) {
  //     return (
  //       <div style={{ color: '#fff' }}>
  //         异地还车 &nbsp;&nbsp;&nbsp;
  //         <img src="/src/static/icons/toggleButtons/toggleOffGreen.svg" />
  //       </div>
  //     );
  //   }
  //   return (
  //     <div style={{ color: '#fff' }}>
  //       异地还车 &nbsp;&nbsp;&nbsp;
  //       <img src="/src/static/icons/toggleButtons/toggleOnGreen.svg" />
  //     </div>
  //   );
  // }
  render() {
    function renderLocationName(locationId) {
      const showName = _.get(props.locations, [locationId, 'locationName']);
      const showNameZh = showName.split('|');
      return showNameZh[1];
    }

    const { props } = this;
    const disabled = styles.disabled;
    return (
      <div className="col-12 col-lg-6">
        <div className="input-box-wrap">
          <label className={styles.labelStyle}>{props.labelText}</label>
          <div
            className={classNames(
              styles.inputBox
              // props.isDisabled === true ? disabled : ''
            )}
          >
            <div className={styles.selectWrap}>
              <span className={styles.spanInWrap}>
                {renderLocationName(props.value)}
              </span>
              <select
                className={styles.selectInWrap}
                name={props.name}
                value={props.value}
                onChange={props.onInputChange}
                // disabled={props.isDisabled}
              >
                {_.map(props.locations, ({ locationId, locationName }) => {
                  const locationNameZh = locationName.split('|');

                  return (
                    <option key={locationId} value={locationId}>
                      {locationNameZh[1]}
                    </option>
                  );
                })}
              </select>
            </div>
            <i className="fa fa-map-marker fa-1" />
          </div>
          {/* {props.name === 'pickLocation' && (
            <div className={styles.formCheck}>
              <label className={styles.formCheckLabel}>
                <input
                  className={classNames(
                    styles.inputInWrap,
                    styles.formCheckInput
                  )}
                  type="checkbox"
                  name="syncLocation"
                  className="form-check-input"
                  onChange={props.onInputChange}
                  checked={!props.syncLocation}
                />
                {this.renderToggle()}
              </label>
            </div>
          )} */}
        </div>
      </div>
    );
  }
}

export default LocationDropdown;
