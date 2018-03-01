import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from "react-router";

class ArrayShow extends Component {
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

    return photoArray ? (
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
              <a href={eachPhoto}>
                <img key={eachPhoto} src={eachPhoto} width="50%" />
              </a>
            </div>
          );
        })}
      </Slider>
    ) : (
      "loading..."
    );
  }
}

export default ArrayShow;
