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

    // console.log("checkhere", parseFloat(array[0]));
    // console.log("checkhere", parseFloat(array[1]));

    var map = new google.maps.Map(this.refs.map, {
      zoom: 4,
      center: { lat, lng }
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    // const icon = "https://png.icons8.com/map-pin/color/43/2980b9";
    // const icon1 = "/src/static/images/icons8-map-pin-orange-48 2.png";
    console.log("here is here", this.props.ratesResultFlitered);

    {
      _.map(this.props.ratesResultFlitered, rate => {
        const vehicle = _.get(this.props.vehicleTypes, rate.vehicleTypeId);
        console.log("checkitnow", typeof vehicle.vehicleType);
        const coord = vehicle.doors;
        const array = coord.split(",");

        const { tax, oneWayFee, conditions } = this.props;
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
        const { vehicleType, sample, seats, doors } = rate;

        const totalDays = getTotalDays(conditions);

        // total rate
        const totalWithoutTax =
          monthlyQty * monthlyRate +
          weeklyQty * weeklyRate +
          dailyQty * dailyRate;
        const taxFee = totalWithoutTax * tax / 100;
        const totalWithTax = totalWithoutTax * (1 + tax / 100) + oneWayFee;

        // i18n tweak
        let vehicleName = _.split(vehicleType, "|");
        let vehicleDesc = _.split(sample, "|");

        const label = `$${parseInt(totalWithTax).toString()}`;

        // if (lang === 'en') {
        //   vehicleName = _.first(vehicleName);
        //   vehicleDesc = _.first(vehicleDesc);
        // } else if (lang === 'zh-cn') {
        //   vehicleName = _.last(vehicleName);
        //   vehicleDesc = _.last(vehicleDesc);
        // }
        vehicleName = _.first(vehicleName);
        vehicleDesc = _.first(vehicleDesc);

        marker = new google.maps.Marker({
          key: rate.vehicleTypeId,
          position: { lat: parseFloat(array[0]), lng: parseFloat(array[1]) },
          label,
          map,
          // icon: `${locations[i].category === "桌餐" ? icon : icon1}`
          // icon: `${this.renderIcon(locations[i])}`
          icon: "/src/static/icons/pins/whitetopic.svg"
        });

        google.maps.event.addListener(
          marker,
          "click",
          (function(marker, i) {
            const url = "/map/" + array;
            return function() {
              infowindow.setContent(
                "<div><h5><a href=" +
                  url +
                  " >" +
                  array[0] +
                  "</a></h5></div><div>" +
                  "<a href='http://maps.google.com/maps?q=" +
                  array[0] +
                  "'/>" +
                  "<div><p><a href=" +
                  url +
                  " >" +
                  "查看详情" +
                  "</a></p></div><div>" +
                  "<a href='http://maps.google.com/maps?q=" +
                  array[0] +
                  "'/>" +
                  array[0] +
                  "<h6>" +
                  "导航前往" +
                  "</h6></a>" +
                  "<a href='tel:" +
                  array[0] +
                  "'/>" +
                  "<h6>" +
                  array[0] +
                  "</h6></a>" +
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
