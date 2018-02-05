import React, { Component } from "react";
import styles from "./styles.css";
import classNames from "classnames/bind";

class MapHere extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      pos: { lat: 41, lng: -121 },
      avatarUrl: "",
      city: "美国"
    };
  }

  componentDidMount() {
    this.addMarkers();
  }
  addMarkers() {
    const { locations } = this.props;
    console.log(locations);

    var map = new google.maps.Map(this.refs.map, {
      zoom: 4,
      center: { lat: 41, lng: -121 }
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    const onOpen = (name, avatarUrl, city, pos) => {
      this.setState({ name, avatarUrl, city, pos });
    };

    console.log(locations.length);

    for (i = 0; i < locations.length; i++) {
      // const icon = "https://png.icons8.com/map-pin/color/43/2980b9";
      // const icon1 = "/src/static/images/icons8-map-pin-orange-48 2.png";
      const renderLat = () => {
        var lat = 41;

        if (locations[i].pos) {
          return (lat = locations[i].pos.lat);
        }
        return (lat = 41);
      };

      const renderLng = () => {
        var lng = -121;

        if (locations[i].pos) {
          return (lng = locations[i].pos.lng);
        }
        return (lng = -121);
      };

      marker = new google.maps.Marker({
        position: {
          lat: renderLat(),
          lng: renderLng()
        },
        map: map,
        // icon: `${locations[i].category === "桌餐" ? icon : icon1}`
        icon: `${this.props.pin}`
      });

      google.maps.event.addListener(
        marker,
        "click",
        (function(marker, i) {
          const url = "/map/" + locations[i].id;
          return function() {
            infowindow.setContent(
              "<div><p onclick=" +
                onOpen(
                  locations[i].name,
                  locations[i].avatarUrl,
                  locations[i].location,
                  locations[i].pos
                ) +
                " >" +
                locations[i].name +
                "</p></div>" +
                "</div>"
            );

            infowindow.open(map, marker);
          };
        })(marker, i)
      );
    }
  }

  renderNextButton() {
    return <button />;
  }

  renderCard() {
    const { name, avatarUrl, city, pos } = this.state;
    return (
      <div className={styles.cardContainer}>
        <div className={styles.cardStyle}>
          <div className={classNames(styles.container, styles.columnStyle)}>
            <div style={{ marginLeft: 5, marginTop: 5 }}>
              <button
                onClick={() => {
                  this.setState({ name: "" });
                }}
                style={{ border: 1 }}
              >
                关闭&nbsp;<i
                  className="fa fa-times-circle fa-1x"
                  aria-hidden="true"
                />
              </button>
            </div>
            <img src={avatarUrl} className={classNames(styles.imgStyle)} />

            <div className={styles.carTitleStyle}>
              {this.renderNextButton(name, avatarUrl, city, pos)}
            </div>
          </div>
          <div className={classNames(styles.rowStyle, styles.columnStyle)}>
            <div className={styles.titleStyle}>{name}</div>
            <div>{city || "美国"}</div>
            <div>微信:未留下</div>
            <div>实时位置:</div>
            <div>波士顿</div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
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
        <div>{_.isEmpty(this.state.name) ? "" : this.renderCard()}</div>
      </div>
    );
  }
}

export default MapHere;
