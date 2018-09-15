import _ from "lodash";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import classNames from "classnames/bind";

import { fetchPlaces, fetchPlaceDetail } from "../actions";

class GeoSuggestInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overlayOpen: false,
      isFetching: false,
      resultData: {},
      value: "",
      activeIndex: -1
    };
    this.doQueryGeo = _.debounce(this.doQueryGeo.bind(this), 300);
  }

  componentDidMount() {
    document.addEventListener("click", this.handleDocumentClick);

    if (_.isEmpty(this.state.value)) {
      this.refs.suggestInput.focus();
    }
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleDocumentClick);
  }

  handleDocumentClick = e => {
    const suggest = ReactDOM.findDOMNode(this.refs.suggest);

    if (!suggest.contains(e.target)) {
      this.setState({
        overlayOpen: false
      });
    }
  };

  doQueryGeo = async q => {
    await this.props.fetchPlaces({ q });
    this.setState({
      resultData: this.props.placesResult,
      isFetching: false
    });
  };

  onHandleChange = async ({ target }) => {
    const { value } = target;

    await this.setState({
      activeIndex: -1
    });

    if (_.isEmpty(value)) {
      this.setState({
        value: "",
        resultData: {},
        overlayOpen: false,
        isFetching: false
      });

      return;
    }

    await this.setState({
      value,
      overlayOpen: true,
      isFetching: true
    });

    this.props.onSelected({
      description: value
    });

    this.doQueryGeo(value);
  };

  highlightPrevious() {
    const { activeIndex, resultData } = this.state;

    const previousIndex =
      activeIndex > 0 ? activeIndex - 1 : _.size(resultData) - 1;

    this.setState({
      activeIndex: previousIndex
    });
  }

  highlightNext() {
    const { activeIndex, resultData } = this.state;

    const nextIndex =
      activeIndex < _.size(resultData) - 1 ? activeIndex + 1 : 0;

    this.setState({
      activeIndex: nextIndex
    });
  }

  onHandleKeyDown = e => {
    switch (e.keyCode) {
      case 38:
        this.highlightPrevious();
        break;
      case 40:
        this.highlightNext();
        break;
      case 13:
        this.onSelectItem();
        break;
      case 27:
        this.onEscape();
        break;
      default:
        break;
    }
  };

  onEscape() {
    this.setState({
      overlayOpen: false
    });
    this.refs.suggestInput.blur();
  }

  onHandleFocus = () => {
    const { value, resultData } = this.state;
    if (!_.isEmpty(value) && !_.isEmpty(resultData)) {
      this.setState({
        overlayOpen: true
      });
    }
  };

  handleGeoMouseEnter = index => {
    this.setState({
      activeIndex: index
    });
  };

  onSelectItem = async () => {
    const { resultData } = this.state;

    if (this.state.activeIndex === -1) {
      await this.setState({ activeIndex: 0 });
    }

    const { activeIndex } = this.state;

    await this.setState({
      overlayOpen: false,
      value: _.get(resultData, [activeIndex, "description"])
    });

    this.refs.suggestInput.blur();

    const id = _.get(resultData, [activeIndex, "id"]);

    await this.props.fetchPlaceDetail({ id });

    this.props.onSelected(resultData[activeIndex]);
  };

  renderFetching = () => (
    <div className="suggest-overlay">
      <div className="loading-wrap">
        <div className="la-ball-pulse">
          <div />
          <div />
          <div />
        </div>
      </div>
    </div>
  );

  renderNoResult = () => {
    const { resultData, value } = this.state;

    if (!_.isEmpty(resultData)) return null;

    return (
      <div className="suggest-overlay">
        <div className="no-result">
          no address about <strong>{value}</strong>
        </div>
      </div>
    );
  };

  renderResultList = () => {
    const { resultData, activeIndex, value } = this.state;

    if (_.isEmpty(resultData)) return null;

    return (
      <div className="suggest-overlay">
        <ul className="list-unstyled">
          {_.map(resultData, ({ id, description }, i) => (
            <li
              key={id}
              onClick={this.onSelectItem}
              onMouseEnter={() => this.handleGeoMouseEnter(i)}
              className={classNames({ active: i === activeIndex })}
            >
              <i className="fa fa-map-marker" />
              <span
                dangerouslySetInnerHTML={{
                  __html: _.replace(
                    description,
                    value,
                    `<strong>${value}</strong>`
                  )
                }}
              />
            </li>
          ))}
        </ul>
        <div className="powered-by-google">
          <img src={googleImageSrc} />
        </div>
      </div>
    );
  };

  render() {
    const { value, overlayOpen, isFetching } = this.state;

    return (
      <div className="geo-suggest" ref="suggest">
        <div className="input-container">
          <input
            ref="suggestInput"
            type="text"
            className="form-control rounded-0"
            autoComplete="off"
            onChange={this.onHandleChange}
            onKeyDown={this.onHandleKeyDown}
            onFocus={this.onHandleFocus}
            value={value}
            placeholder="Enter your address details"
          />
        </div>
        {isFetching && this.renderFetching()}
        {/* {!isFetching && overlayOpen && this.renderNoResult()} */}
        {!isFetching && overlayOpen && this.renderResultList()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.rentalReducer
  };
}

export default connect(mapStateToProps, { fetchPlaces, fetchPlaceDetail })(
  GeoSuggestInput
);
