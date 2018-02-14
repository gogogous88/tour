import React, { Component } from "react";
import MultiSelect from "../../Components/MultiSelect/index";

class Test extends Component {
  render() {
    const choices = [
      { label: "导游", value: "导游" },
      { label: "翻译", value: "翻译" },
      { label: "地产经济", value: "地产经纪" },
      { label: "提供导游之家", value: "提供导游之家" },
      { label: "门票代理", value: "门票代理" },
      { label: "项目提供人", value: "项目提供人" },
      { label: "其他", value: "其他" }
    ];
    return <MultiSelect choices={choices} />;
  }
}

export default Test;
