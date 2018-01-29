/*global google*/

import React, { Component } from "react";
import _ from "lodash";
import classNames from "classnames/bind";
import styles from "./styles.css";
import { Link } from "react-router";

class MapHere extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null,
      name: null,
      coord: null,
      location: null,
      ph_no: null,
      locationi: null
    };
  }
  componentDidMount() {
    this.addMarkers();
  }

  renderIcon(locations) {
    if (!_.isEmpty(locations.ph_no)) {
      if (locations.category === "桌餐") {
        return "/src/static/icons/pins/redhead.svg";
      }
      if (locations.category === "自助" || "自助餐") {
        return "/src/static/icons/pins/orangehead.svg";
      }
      return "/src/static/icons/pins/purplehead.svg";
    } else {
      if (locations.class === 1) {
        return "/src/static/icons/pins/orangehead.svg";
      }
      if (locations.class === 2) {
        return "/src/static/icons/pins/yellowhead.svg";
      }
      if (locations.class === 3) {
        return "/src/static/icons/pins/greenhead.svg";
      }
      if (locations.class === 4) {
        return "/src/static/icons/pins/bluehead.svg";
      }
      if (locations.class === 5) {
        return "/src/static/icons/pins/purplehead.svg";
      }
      return "/src/static/icons/pins/redhead.svg";
    }
  }

  addMarkers = props => {
    const { locations, pin } = this.props;
    const { lat, lng } = this.props.center;

    const onOpen = (url, name, coord, location, ph_no, locationi) => {
      this.setState({
        url,
        name,
        coord,
        location,
        ph_no,
        locationi
      });
    };

    var map = new google.maps.Map(this.refs.map, {
      zoom: 4,
      center: { lat, lng }
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
      // const icon = "https://png.icons8.com/map-pin/color/43/2980b9";
      // const icon1 = "/src/static/images/icons8-map-pin-orange-48 2.png";

      marker = new google.maps.Marker({
        position: { lat: locations[i].lat, lng: locations[i].lng },
        map: map,
        // icon: `${locations[i].category === "桌餐" ? icon : icon1}`
        icon: `${this.renderIcon(locations[i])}`
      });

      google.maps.event.addListener(
        marker,
        "click",
        (function(marker, i) {
          const url = "/map/" + locations[i].id;
          return function() {
            infowindow.setContent(
              "<div><a href=" +
                url +
                " >" +
                locations[i].name +
                "</a></div><div>" +
                "<button onclick='" +
                onOpen(
                  url,
                  locations[i].name,
                  locations[i].coord,
                  locations[i].location,
                  locations[i].ph_no,
                  locations[i]
                ) +
                "/>'" +
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

  //不同的设备打开不同的导航app.
  renderNavi() {
    const { coord } = this.state;

    const coordArray = coord.split(",");
    if (
      /* if we're on iOS, open in Apple Maps */
      navigator.platform.indexOf("iPhone") != -1 ||
      navigator.platform.indexOf("iPad") != -1 ||
      navigator.platform.indexOf("iPod") != -1
    ) {
      window.open(`maps://maps.google.com/maps?daddr=${coord}&amp;ll=`);
    } else {
      /* else use Google */ window.open(
        `https://maps.google.com/maps?daddr=${coord}&amp;ll=`
      );
    }
  }

  renderPhone() {
    const { ph_no } = this.state;
    if (!_.isEmpty(ph_no)) {
      return (
        <div>
          <a href={`tel://${ph_no}`}>
            <i className="material-icons left blue-text">phone</i>
            {ph_no}
          </a>
        </div>
      );
    }
  }

  renderCategory(locationi) {
    switch (locationi.category) {
      case "自助":
        return <span>自助</span>;
      case "自助餐":
        return <span>自助</span>;
      case "桌餐":
        return <span>桌餐</span>;

      default:
        return <span>景点</span>;
    }
  }

  renderCard() {
    const { url, name, coord, location, ph_no, locationi } = this.state;

    return (
      <div className={styles.cardStyle}>
        <div className={classNames(styles.container, styles.columnStyle)}>
          <button
            onClick={() => {
              this.setState({ url: null });
            }}
            style={{
              border: 1,
              display: "flex",
              alignSelf: "start",
              marginLeft: 5,
              marginTop: 5,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            关闭&nbsp;<i
              className="fa fa-times-circle fa-1x"
              aria-hidden="true"
            />
          </button>
          <div style={{ marginLeft: 5, marginTop: 5 }} />

          <button
            style={{
              width: 80,
              height: 80,
              backgroundColor: "orange",
              borderRadius: "100%",
              fontSize: 26,
              color: "white"
            }}
            // className={classNames(styles.imgStyle)}
          >
            {this.renderCategory(locationi)}
          </button>
        </div>
        <div className={classNames(styles.rowStyle, styles.columnStyle)}>
          <div className={styles.titleStyle}>{name}</div>

          <div>
            <a>
              <i className="material-icons left blue-text">place</i>
              {location}
            </a>
          </div>
          {this.renderPhone()}

          <div>
            <button onClick={this.renderNavi.bind(this)}>
              <i className="material-icons left blue-text">near_me</i>
              导航前往
            </button>
          </div>
          <div>
            <Link to={url}>
              <i className="material-icons left blue-text">filter_list</i>
              查看详情
            </Link>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { url, name, coord, location, ph_no, locationi } = this.state;

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
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
        <div className={styles.cardContainer}>
          {url !== null ? this.renderCard() : ""}
        </div>
      </div>
    );
  }
}

export default MapHere;
