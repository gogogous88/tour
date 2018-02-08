import React from "react";

const MaterialButton = props => {
  const { link1, link2, link3, name1, name2, name3 } = props;
  return (
    <div className="fixed-action-btn toolbar">
      <a className="btn-floating btn-large red pulse">
        <i className="large material-icons">add</i>
      </a>
      <ul>
        <li className="waves-effect waves-light">
          <a href={link1}>{name1}</a>
        </li>
        <li className="waves-effect waves-light">
          <a href={link2}>{name2}</a>
        </li>
        <li className="waves-effect waves-light">
          <a href={link3}>{name3}</a>
        </li>
      </ul>
    </div>
  );
};

export default MaterialButton;
