/*global google*/

import React, { Component } from "react";

class MapHere extends Component {
  componentDidMount() {
    this.addMarkers();
  }

  addMarkers = () => {
    const { locations } = this.props;
    const { lat, lng } = this.props.center;
    console.log(locations);
    var map = new google.maps.Map(this.refs.map, {
      zoom: 4,
      center: { lat, lng }
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: { lat: locations[i].lat, lng: locations[i].lng },
        map: map,
        icon: "https://png.icons8.com/map-pin/color/43/2980b9"
      });

      google.maps.event.addListener(
        marker,
        "click",
        (function(marker, i) {
          const url = "/map/" + locations[i].id;
          return function() {
            infowindow.setContent(
              "<div><h5><a href=" +
                url +
                " >" +
                locations[i].name +
                "</a></h5></div><div>" +
                "<a href='http://maps.google.com/maps?q=" +
                locations[i].addr +
                "'/>" +
                "<div><p><a href=" +
                url +
                " >" +
                "查看详情" +
                "</a></p></div><div>" +
                "<a href='http://maps.google.com/maps?q=" +
                locations[i].addr +
                "'/>" +
                "<h6>" +
                "导航前往" +
                "</h6></a>" +
                "<a href='tel:" +
                locations[i].ph_no +
                "'/>" +
                "<h6>" +
                locations[i].ph_no +
                "</h6></a>" +
                "</div>"
            );

            infowindow.open(map, marker);
          };
        })(marker, i)
      );
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
      secondChild.id = "you_location_img";
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
