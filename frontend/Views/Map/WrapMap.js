import React, { Component } from "react";
import _ from "lodash";

class WrapMap extends Component {
  componentDidMount() {
    this.addMarker();
  }

  addMarker = props => {
    const { lat, lng, location } = this.props;

    // console.log(location);

    var map = new google.maps.Map(this.refs.map, {
      zoom: 4,
      center: { lat, lng }
    });

    var infowindow = new google.maps.InfoWindow();

    var marker;

    marker = new google.maps.Marker({
      position: { lat, lng },
      map: map
      // icon: `${locations[i].category === "桌餐" ? icon : icon1}`
      // icon: `${this.renderIcon(locations[i])}`
    });
    if (!_.isEmpty(location.ph_no)) {
      return google.maps.event.addListener(
        marker,
        "click",
        (function(marker) {
          const url = "/map/" + location.id;
          return function() {
            infowindow.setContent(
              "<div>" +
                "<a href='http://maps.google.com/maps?q=" +
                location.coord +
                "'/>" +
                location.location +
                "<h5>" +
                "导航前往" +
                "</h5></a>" +
                "<a href='tel:" +
                location.ph_no +
                "'/>" +
                "<h6>" +
                location.ph_no +
                "</h6></a>" +
                "</div>"
            );

            infowindow.open(map, marker);
          };
        })(marker)
      );
    }
    return google.maps.event.addListener(
      marker,
      "click",
      (function(marker) {
        const url = "/map/" + location.id;
        return function() {
          infowindow.setContent(
            "<div>" +
              "<a href='http://maps.google.com/maps?q=" +
              location.coord +
              "'/>" +
              location.location +
              "<h6>" +
              "导航前往" +
              "</h6></a>" +
              "</div>"
          );

          infowindow.open(map, marker);
        };
      })(marker)
    );
  };

  render() {
    // console.log(this.props);
    // const {} = this.props;
    return (
      <div>
        <div ref="map" style={{ width: "100%", height: 300 }} />
      </div>
    );
  }
}

export default WrapMap;
