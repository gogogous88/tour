import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from "react-router";

class ArrayHotelShow extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    const { photoArray } = this.props;

    return (
      <Slider
        style={{
          marginLeft: 10,
          marginRight: 10
        }}
        {...settings}
      >
        {photoArray.map(eachPhoto => {
          return (
            <div className="container">
              <a key={eachPhoto} href={eachPhoto}>
                <img src={eachPhoto} width="100%" />
              </a>
            </div>
          );
        })}
      </Slider>
    );
  }
}

export default ArrayHotelShow;
