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
              <Link key={eachPhoto.secure_url} to={eachPhoto.secure_url}>
                <img src={eachPhoto.secure_url} width="50%" />
              </Link>
            </div>
          );
        })}
      </Slider>
    );
  }
}

export default ArrayShow;
