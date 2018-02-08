import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from "react-router";

class SlideShow extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    const { img1, link1, img2, link2, link3, img3 } = this.props;

    return (
      <Slider {...settings}>
        <div>
          <Link to={link2}>
            <img src={img2} width="100%" />
          </Link>
        </div>
        <div>
          <Link to={link1}>
            <img src={img1} width="100%" />
          </Link>
        </div>
        <div>
          <Link to={link3}>
            <img src={img3} width="100%" />
          </Link>
        </div>
      </Slider>
    );
  }
}

export default SlideShow;
