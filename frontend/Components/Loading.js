import React from "react";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        top: 0,
        bottom: 0,
        height: "100%",
        width: "100%",
        position: "fixed",
        backgroundColor: "#fff",
        zIndex: 1
      }}
    >
      <img src="/src/static/gifs/shangche.gif" style={{ width: 120 }} />
    </div>
  );
};

export default Loading;
