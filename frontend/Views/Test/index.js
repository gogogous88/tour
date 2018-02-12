import React from "react";
import geodist from "geodist";

class Test extends React.Component {
  componentDidMount() {
    var dist = geodist(
      { lat: 41.85, lon: -87.65 },
      { lat: 33.7489, lon: -84.3881 }
    );
    console.log(dist);
  }

  render() {
    return <div>hello</div>;
  }
}

export default Test;
