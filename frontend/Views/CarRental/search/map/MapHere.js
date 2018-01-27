/*global google*/

import React, { Component } from "react";
import _ from "lodash";
import { formatMoney, getTotalDays } from "../../utils/yale";
import styles from "./styles.css";
import classNames from "classnames/bind";

class MapHere extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleTypeId: null,
      dailyKMorMileageAllowed: null,
      kMorMileageCharge: null,
      vehicleType: null,
      sample: null,
      imgURL: null,
      seats: null,
      baggages: null,
      dailyQty: null,
      dailyRate: null,
      weeklyQty: null,
      weeklyRate: null,
      monthlyQty: null,
      monthlyRate: null,
      toggle: false
    };
  }
  componentDidMount() {
    this.addMarkers();
  }

  // renderIcon(locations) {
  //   if (!_.isEmpty(locations.ph_no)) {
  //     if (locations.category === "桌餐") {
  //       return "/src/static/icons/pins/redhead.svg";
  //     }
  //     if (locations.category === "自助" || "自助餐") {
  //       return "/src/static/icons/pins/orangehead.svg";
  //     }
  //     return "/src/static/icons/pins/purplehead.svg";
  //   } else {
  //     if (locations.class === 1) {
  //       return "/src/static/icons/pins/orangehead.svg";
  //     }
  //     if (locations.class === 2) {
  //       return "/src/static/icons/pins/yellowhead.svg";
  //     }
  //     if (locations.class === 3) {
  //       return "/src/static/icons/pins/greenhead.svg";
  //     }
  //     if (locations.class === 4) {
  //       return "/src/static/icons/pins/bluehead.svg";
  //     }
  //     if (locations.class === 5) {
  //       return "/src/static/icons/pins/purplehead.svg";
  //     }
  //     return "/src/static/icons/pins/redhead.svg";
  //   }
  // }

  renderYinglishu(
    vehicleTypeId,
    dailyKMorMileageAllowed,
    kMorMileageCharge,
    vehicleType,
    sample,
    imgURL,
    seats,
    baggages,
    dailyQty,
    dailyRate,
    weeklyQty,
    weeklyRate,
    monthlyQty,
    monthlyRate
  ) {
    this.setState({
      vehicleTypeId,
      dailyKMorMileageAllowed,
      kMorMileageCharge,
      vehicleType,
      sample,
      imgURL,
      seats,
      baggages,
      dailyQty,
      dailyRate,
      weeklyQty,
      weeklyRate,
      monthlyQty,
      monthlyRate
    });
  }

  addMarkers = props => {
    const { locations, pin } = this.props;
    const { lat, lng } = this.props.center;
    // const coord = this.props.vehicle;
    // const array = coord.split(",");

    var map = new google.maps.Map(this.refs.map, {
      zoom: 4,
      center: { lat, lng }
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    // const icon = "https://png.icons8.com/map-pin/color/43/2980b9";
    // const icon1 = "/src/static/images/icons8-map-pin-orange-48 2.png";

    {
      _.map(this.props.ratesResultFlitered, rate => {
        // const vehicle = _.get(this.props.vehicleTypes, rate.vehicleTypeId);

        const { tax, oneWayFee, conditions, vehicleTypes } = this.props;
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
        } = rate;

        const vehicle = _.get(vehicleTypes, rate.vehicleTypeId);

        const { vehicleType, sample, seats, doors, baggages } = vehicle;

        const coord = vehicle.doors;
        const array = coord.split(",");

        const totalDays = getTotalDays(conditions);

        // total rate
        const totalWithoutTax =
          monthlyQty * monthlyRate +
          weeklyQty * weeklyRate +
          dailyQty * dailyRate;
        const taxFee = totalWithoutTax * tax / 100;
        const roundTaxFee = formatMoney(taxFee);
        const totalWithTax = totalWithoutTax * (1 + tax / 100) + oneWayFee;
        const actualDayCharge = totalWithoutTax / totalDays;

        // i18n tweak
        let vehicleName = _.split(vehicleType, "|");
        let vehicleDesc = _.split(sample, "|");
        vehicleName = _.last(vehicleName);
        vehicleDesc = _.last(vehicleDesc);
        const totalMilesAllowed = dailyKMorMileageAllowed * totalDays;

        const yinglishu =
          dailyKMorMileageAllowed !== 0
            ? `总限${totalMilesAllowed}迈,超:$${kMorMileageCharge}/迈`
            : "不限英里数";

        const oneWayFeeDesc = oneWayFee !== 0 ? "异地还车费" : "";
        const oneWayFeePrice = oneWayFee !== 0 ? `$${oneWayFee}` : "";

        const label = `$${parseInt(totalWithTax).toString()}`;
        const totalPrice = formatMoney(totalWithTax);

        // if (lang === 'en') {
        //   vehicleName = _.first(vehicleName);
        //   vehicleDesc = _.first(vehicleDesc);
        // } else if (lang === 'zh-cn') {
        //   vehicleName = _.last(vehicleName);
        //   vehicleDesc = _.last(vehicleDesc);
        // }

        marker = new google.maps.Marker({
          key: rate.vehicleTypeId,
          position: { lat: parseFloat(array[0]), lng: parseFloat(array[1]) },
          label,
          map,
          // icon: `${locations[i].category === "桌餐" ? icon : icon1}`
          // icon: `${this.renderIcon(locations[i])}`
          icon: "/src/static/icons/pins/whitetopic.svg"
        });

        const imgURL = `/src/static/images/${vehicleTypeId}.jpg`;
        const style = `background-color:#000`;

        const onButtonClick = (
          vehicleTypeId,
          dailyKMorMileageAllowed,
          kMorMileageCharge,
          vehicleType,
          sample,
          imgURL,
          seats,
          baggages,
          dailyQty,
          dailyRate,
          weeklyQty,
          weeklyRate,
          monthlyQty,
          monthlyRate,
          totalWithTax
        ) => {
          return (
            <div
              style={{
                zIndex: 2,
                justifyContent: "center",
                position: "absolute",
                bottom: 50,
                display: "flex"
              }}
            >
              {this.renderYinglishu(
                vehicleTypeId,
                dailyKMorMileageAllowed,
                kMorMileageCharge,
                vehicleType,
                sample,
                imgURL,
                seats,
                baggages,
                dailyQty,
                dailyRate,
                weeklyQty,
                weeklyRate,
                monthlyQty,
                monthlyRate
              )}
            </div>
          );
        };

        google.maps.event.addListener(
          marker,
          "click",
          (function(marker, i) {
            const url = "/map/" + array;
            // const nextURL = `/extras/${yinglishu}`;
            return function() {
              infowindow.setContent(
                // '<div style="width:200px; ">' +
                "<div>" +
                  vehicleName +
                  "</div>" +
                  //   "<div style='padding:5px 5px 5px 5px; background-color:#fff;height:90px'><img src=" +
                  //   imgURL +
                  //   " style='justify-content:center;display:flex; border-radius:10% 10% 10% 10%; width:90%'/></div>" +
                  //   "<div><p>" +
                  //   "<div><h5 style='font-size:16px; padding-top:5px'>" +
                  //   vehicleDesc +
                  //   "</h5></div>" +
                  //   "<div>" +
                  //   yinglishu +
                  //   "</div>" +
                  //   "<div style='margin-top:10px;flex-direct:row;display:flex;justify-content:space-around'>" +
                  //   "<div>" +
                  //   '<img src="https://png.icons8.com/ios-glyphs/20/3498db/gender-neutral-user.png" />' +
                  //   "<span>" +
                  //   "*" +
                  //   seats +
                  //   "</span>" +
                  //   "</div>" +
                  //   "<div>" +
                  //   '<img src="/src/static/icons/buttons/luggage.svg" />' +
                  //   "<span>" +
                  //   "*" +
                  //   baggages +
                  //   "</span>" +
                  //   "</div>" +
                  //   "<div>" +
                  //   '<img src="https://png.icons8.com/material/20/3498db/steering-wheel.png" />' +
                  //   "<span>" +
                  //   "自动挡" +
                  //   "</span>" +
                  //   "</div>" +
                  //   "</div>" +
                  //   "<div style='margin-top:5px;flex-direct:row;display:flex;justify-content:space-between; background-color:#f0f0f0'>" +
                  //   "<div><span style='padding-left:5px;font-size:14px'>" +
                  //   "单价" +
                  //   "</span></div>" +
                  //   "<div><span style='padding-right:5px;font-size:14px'>" +
                  //   "$" +
                  //   actualDayCharge +
                  //   "/天" +
                  //   "</span></div>" +
                  //   "</div>" +
                  //   //天数开始
                  //   "<div style='margin-top:5px;flex-direct:row;display:flex;justify-content:space-between; '>" +
                  //   "<div><span style='padding-left:5px;font-size:14px'>" +
                  //   "天数" +
                  //   "</span></div>" +
                  //   "<div><span style='padding-right:5px;font-size:14px'>" +
                  //   totalDays +
                  //   "天" +
                  //   "</span></div>" +
                  //   "</div>" +
                  //   //天数结束
                  //   //税开始
                  //   "<div style='margin-top:5px;flex-direct:row;display:flex;justify-content:space-between;background-color:#f0f0f0'>" +
                  //   "<div><span style='padding-left:5px;font-size:14px'>" +
                  //   "税" +
                  //   tax +
                  //   "%" +
                  //   "</span></div>" +
                  //   "<div><span style='padding-right:5px;font-size:14px'>" +
                  //   "$" +
                  //   taxFee +
                  //   "</span></div>" +
                  //   "</div>" +
                  //   //税结束
                  //   //异地开始
                  //   "<div style='margin-top:5px;flex-direct:row;display:flex;justify-content:space-between'>" +
                  //   "<div><div style='padding-left:5px;font-size:14px'>" +
                  //   oneWayFeeDesc +
                  //   "</div></div>" +
                  //   "<div><div style='padding-right:5px;font-size:14px'>" +
                  //   oneWayFeePrice +
                  //   "</div></div>" +
                  //   "</div>" +
                  //   //异地结束
                  //   //小记开始
                  //   "<div style='margin-top:5px;flex-direct:row;display:flex;justify-content:space-between'>" +
                  //   "<div><span style='padding-left:5px;font-size:16px;color:red'>" +
                  //   "小计" +
                  //   "</span></div>" +
                  //   "<div><span style='padding-right:5px;font-size:16px;color:red'>" +
                  //   totalPrice +
                  //   "</span></div>" +
                  //   "</div>" +
                  //   //小记结束

                  "<div style='margin-top:5px;justify-content:center;display:flex'>" +
                  '<button onclick="' +
                  onButtonClick(
                    vehicleTypeId,
                    dailyKMorMileageAllowed,
                    kMorMileageCharge,
                    vehicleType,
                    sample,
                    imgURL,
                    seats,
                    baggages,
                    dailyQty,
                    dailyRate,
                    weeklyQty,
                    weeklyRate,
                    monthlyQty,
                    monthlyRate
                  ) +
                  "/>" +
                  // '" class="waves-effect blue lighten-1 btn" ><i class="material-icons right white-text">send</i><span style="color:white">选择</span></a>' +
                  "</div>"
              );

              infowindow.open(map, marker);
            };
          })(marker, i)
        );
      });
    }

    //add geolocation bellow
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          marker = new google.maps.Marker({
            position: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            map: map,
            icon: "https://png.icons8.com/navigation/p1em/20/2980b9"
          });

          infowindow.setPosition(pos);
          infowindow.setContent("现在我的位置");
          map.setCenter(pos);
        },
        function() {
          return true, infowindow, map.getCenter();
        }
      );
    } else {
      // Browser doesn't support Geolocation
      return false, infowindow, map.getCenter();
    }
    //add geolocation above

    //center your map bellow:
    var centerControlDiv = document.createElement("div");
    var centerControl = new CenterControl(centerControlDiv, map);

    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

    function CenterControl(controlDiv, map) {
      // Set CSS for the control border.
      var controlUI = document.createElement("button");
      controlUI.style.backgroundColor = "#fff";
      controlUI.style.border = "none";
      controlUI.style.outline = "none";
      controlUI.style.width = "28px";
      controlUI.style.height = "28px";
      controlUI.style.borderRadius = "2px";
      controlUI.style.boxShadow = "0 1px 4px rgba(0,0,0,0.3)";
      controlUI.style.cursor = "pointer";
      controlUI.style.marginRight = "10px";
      controlUI.style.padding = "0px";
      controlUI.title = "回到我的位置";
      controlDiv.appendChild(controlUI);

      var secondChild = document.createElement("div");
      secondChild.style.margin = "5px";
      secondChild.style.width = "18px";
      secondChild.style.height = "18px";
      secondChild.style.backgroundImage =
        "url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)";
      secondChild.style.backgroundSize = "180px 18px";
      secondChild.style.backgroundPosition = "0px 0px";
      secondChild.style.backgroundRepeat = "no-repeat";
      // secondChild.id = "you_location_img";
      controlUI.appendChild(secondChild);

      // Setup the click event listeners: simply set the map to Chicago.

      controlUI.addEventListener("click", function() {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          map.setCenter(pos);
        });
      });
    }
  };

  togglePriceList(
    actualDayCharge,
    totalDays,
    tax,
    taxFee,
    oneWayFeeDesc,
    oneWayFeePrice,
    totalPrice
  ) {
    if (this.state.toggle === true) {
      const roundTaxFee = formatMoney(taxFee);
      return (
        <div>
          <div className={styles.priceList}>
            <span className={styles.priceListTitle}>单价</span>
            <span className={styles.priceListTag}>${actualDayCharge}/天</span>
          </div>
          <div className={styles.priceList}>
            <span className={styles.priceListTitle}>天数</span>
            <span className={styles.priceListTag}>{totalDays}天</span>
          </div>
          <div className={styles.priceList}>
            <span className={styles.priceListTitle}>税({tax}%)</span>
            <span className={styles.priceListTag}>{roundTaxFee}</span>
          </div>
          <div className={styles.priceList}>
            <span className={styles.priceListTitle}>{oneWayFeeDesc}</span>
            <span className={styles.priceListTag}>{oneWayFeePrice}</span>
          </div>
        </div>
      );
    }
    return (
      <div style={{ marginTop: 10 }}>
        <h3 style={{ color: "red" }}>
          小计:{totalPrice} &nbsp;&nbsp;
          <button
            style={{ borderBottom: 1 }}
            onClick={() => {
              this.setState({ toggle: true });
            }}
          >
            <span style={{ fontSize: 14, color: "#333" }}>价格明细</span>
          </button>
        </h3>
      </div>
    );
  }

  renderNextButton(
    vehicleTypeId,
    vehicleName,
    vehicleDesc,
    tax,
    oneWayFee,
    totalWithoutTax,
    taxFee,
    totalWithTax,
    totalDays
  ) {
    return (
      <button
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
        className={this.state.toggle ? "btn" : styles.btn}
      >
        下一步
      </button>
    );
  }

  renderCard() {
    const { tax, oneWayFee, conditions, vehicleTypes } = this.props;
    var {
      vehicleTypeId,
      dailyKMorMileageAllowed,
      kMorMileageCharge,
      vehicleType,
      sample,
      imgURL,
      seats,
      baggages,
      dailyQty,
      dailyRate,
      weeklyQty,
      weeklyRate,
      monthlyQty,
      monthlyRate
    } = this.state;

    const totalDays = getTotalDays(conditions);

    const oneWayFeeDesc = oneWayFee !== 0 ? "异地还车费" : "";
    const oneWayFeePrice = oneWayFee !== 0 ? `$${oneWayFee}` : "";
    let vehicleName = _.split(vehicleType, "|");
    let vehicleDesc = _.split(sample, "|");
    vehicleName = _.last(vehicleName);
    vehicleDesc = _.last(vehicleDesc);
    const totalMilesAllowed = dailyKMorMileageAllowed * totalDays;

    // total rate
    const totalWithoutTax =
      monthlyQty * monthlyRate + weeklyQty * weeklyRate + dailyQty * dailyRate;
    const taxFee = totalWithoutTax * tax / 100;
    const totalWithTax = totalWithoutTax * (1 + tax / 100) + oneWayFee;
    const actualDayCharge = totalWithoutTax / totalDays;
    const totalPrice = formatMoney(totalWithTax);

    const yinglishu =
      dailyKMorMileageAllowed !== 0
        ? `总限${totalMilesAllowed}迈,超:$${kMorMileageCharge}/迈`
        : "不限英里数";

    return (
      <div className={styles.cardStyle}>
        <div className={classNames(styles.container, styles.columnStyle)}>
          <div style={{ marginLeft: 5, marginTop: 5 }}>
            <button
              onClick={() => {
                this.setState({ vehicleType: null, toggle: false });
              }}
              style={{ border: 1 }}
            >
              关闭&nbsp;<i
                className="fa fa-times-circle fa-1x"
                aria-hidden="true"
              />
            </button>
          </div>
          <img
            src={imgURL}
            className={classNames(styles.imgStyle)}
            width="100%"
            height="auto"
          />

          <div className={styles.carTitleStyle}>
            {this.state.toggle ? `小计:${totalPrice}` : ""}
          </div>

          <div className={styles.carTitleStyle}>
            {this.renderNextButton(
              vehicleTypeId,
              vehicleName,
              vehicleDesc,
              tax,
              oneWayFee,
              totalWithoutTax,
              taxFee,
              totalWithTax,
              totalDays
            )}
          </div>
        </div>
        <div className={classNames(styles.rowStyle, styles.columnStyle)}>
          <div className={styles.titleStyle}>{vehicleName}</div>
          <div>{vehicleDesc}</div>
          <div>{yinglishu}</div>
          <div className={styles.descStyle}>
            <div>
              <img src="https://png.icons8.com/ios-glyphs/20/3498db/gender-neutral-user.png" />
              <span>*{seats}</span>
            </div>
            <div>
              <img src="/src/static/icons/buttons/luggage.svg" />
              <span>*{baggages}</span>
            </div>
            <div>
              <img src="https://png.icons8.com/ios-glyphs/20/3498db/steering-wheel.png" />
              <span>*自动挡</span>
            </div>
          </div>
          {this.togglePriceList(
            actualDayCharge,
            totalDays,
            tax,
            taxFee,
            oneWayFeeDesc,
            oneWayFeePrice,
            totalPrice
          )}
        </div>
      </div>
    );
  }

  render() {
    const { vehicleType } = this.state;

    return (
      <div>
        <div
          ref="map"
          style={{
            height: "100%",
            left: 0,
            right: 0,
            bottom: 0,
            position: "absolute",
            zIndex: 1
          }}
        />

        <div className={styles.cardContainer}>
          {this.state.vehicleType !== null ? this.renderCard() : ""}
        </div>
      </div>
    );
  }
}

export default MapHere;
