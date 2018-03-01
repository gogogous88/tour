import React from "react";
import SlideShow from "react-image-show";

class PictureShow extends React.Component {
  render() {
    const { photoArray } = this.props;
    return (
      <SlideShow
        images={photoArray}
        width="100%"
        imagesWidth="100%"
        imagesHeight="auto"
        imagesHeightMobile="56vw"
        thumbnailsWidth="920px"
        thumbnailsHeight="12vw"
        indicators
        thumbnails
        fixedImagesHeight
      />
    );
  }
}

export default PictureShow;
