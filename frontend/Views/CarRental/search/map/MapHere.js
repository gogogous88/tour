/*global google*/

import React, { Component } from "react";
import _ from "lodash";
import { formatMoney, getTotalDays } from "../../utils/yale";

class MapHere extends Component {
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
        const totalWithTax = totalWithoutTax * (1 + tax / 100) + oneWayFee;
        const actualDayCharge = totalWithoutTax / totalDays;

        // i18n tweak
        let vehicleName = _.split(vehicleType, "|");
        let vehicleDesc = _.split(sample, "|");
        const totalMilesAllowed = dailyKMorMileageAllowed * totalDays;

        const yinglishu =
          dailyKMorMileageAllowed !== 0
            ? `限${totalMilesAllowed}英里,超出部分${kMorMileageCharge}/英里`
            : "不限英里数";

        const label = `$${parseInt(totalWithTax).toString()}`;
        const totalPrice = formatMoney(totalWithTax);

        // if (lang === 'en') {
        //   vehicleName = _.first(vehicleName);
        //   vehicleDesc = _.first(vehicleDesc);
        // } else if (lang === 'zh-cn') {
        //   vehicleName = _.last(vehicleName);
        //   vehicleDesc = _.last(vehicleDesc);
        // }
        vehicleName = _.last(vehicleName);
        vehicleDesc = _.last(vehicleDesc);

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

        google.maps.event.addListener(
          marker,
          "click",
          (function(marker, i) {
            const url = "/map/" + array;
            return function() {
              infowindow.setContent(
                '<div style="width:200px; ">' +
                  "<div style='background-color:#fff;' class='text-center'><span style='padding-top:6px;padding-bottom:6px;font-size:18px;color:#333'>" +
                  vehicleName +
                  "</span></div>" +
                  "<div style='padding:5px 5px 5px 5px; background-color:#fff;height:90px'><img src=" +
                  imgURL +
                  " style='justify-content:center;display:flex; border-radius:10% 10% 10% 10%; width:90%'/></div>" +
                  "<div><p>" +
                  "<div><h5 style='font-size:16px; padding-top:5px'>" +
                  vehicleDesc +
                  "</h5></div>" +
                  "<div>" +
                  yinglishu +
                  "</div>" +
                  "<div style='margin-top:10px;flex-direct:row;display:flex;justify-content:space-around'>" +
                  "<div>" +
                  '<img src="https://png.icons8.com/ios-glyphs/20/3498db/gender-neutral-user.png" />' +
                  "<span>" +
                  "*" +
                  seats +
                  "</span>" +
                  "</div>" +
                  "<div>" +
                  '<img src="/src/static/icons/buttons/luggage.svg" />' +
                  "<span>" +
                  "*" +
                  baggages +
                  "</span>" +
                  "</div>" +
                  "<div>" +
                  '<img src="https://png.icons8.com/material/20/3498db/steering-wheel.png" />' +
                  "<span>" +
                  "自动挡" +
                  "</span>" +
                  "</div>" +
                  "</div>" +
                  "<div style='margin-top:5px;flex-direct:row;display:flex;justify-content:space-between; background-color:#f0f0f0'>" +
                  "<div><span style='padding-left:5px;font-size:14px'>" +
                  "单价" +
                  "</span></div>" +
                  "<div><span style='padding-right:5px;font-size:14px'>" +
                  "$" +
                  actualDayCharge +
                  "/天" +
                  "</span></div>" +
                  "</div>" +
                  //天数开始
                  "<div style='margin-top:5px;flex-direct:row;display:flex;justify-content:space-between; '>" +
                  "<div><span style='padding-left:5px;font-size:14px'>" +
                  "天数" +
                  "</span></div>" +
                  "<div><span style='padding-right:5px;font-size:14px'>" +
                  totalDays +
                  "天" +
                  "</span></div>" +
                  "</div>" +
                  //天数结束
                  //税开始
                  "<div style='margin-top:5px;flex-direct:row;display:flex;justify-content:space-between;background-color:#f0f0f0'>" +
                  "<div><span style='padding-left:5px;font-size:14px'>" +
                  "税" +
                  tax +
                  "%" +
                  "</span></div>" +
                  "<div><span style='padding-right:5px;font-size:14px'>" +
                  "$" +
                  taxFee +
                  "</span></div>" +
                  "</div>" +
                  //税结束
                  //小记开始
                  "<div style='margin-top:5px;flex-direct:row;display:flex;justify-content:space-between'>" +
                  "<div><span style='padding-left:5px;font-size:16px;color:red'>" +
                  "小计" +
                  "</span></div>" +
                  "<div><span style='padding-right:5px;font-size:16px;color:red'>" +
                  totalPrice +
                  "</span></div>" +
                  "</div>" +
                  //小记结束

                  "<div style='margin-top:5px;justify-content:center;display:flex'>" +
                  '<a class="waves-effect blue lighten-1 btn" ><i class="material-icons right white-text">send</i><span style="color:white">选择</span></a>' +
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

  render() {
    return (
      <div
        ref="map"
        style={{
          height: "100%",
          left: 0,
          right: 0,
          bottom: 0,
          position: "absolute"
          // zIndex: -1
        }}
      />
    );
  }
}

export default MapHere;
