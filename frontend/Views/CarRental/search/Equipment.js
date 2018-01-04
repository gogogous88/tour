import React from 'react';
import classNames from 'classnames/bind';

const Equipment = props => {
  const { title, price, days, amount, multipliable } = props;

  function renderAddButton() {
    return (
      <span className="add-wrap">
        <i className="fa fa-plus-circle" onClick={props.onAddClick} />
      </span>
    );
  }

  function renderRemoveButton() {
    return (
      <span className="remove-wrap">
        <i className="fa fa-times-circle" onClick={props.onRemoveClick} />
      </span>
    );
  }

  function renderAdjustButtons(i) {
    return (
      <span className="adjust-wrap">
        <i className="fa fa-minus-circle" onClick={props.onDecreaseClick} />
        <span>{i}</span>
        <i className="fa fa-plus-circle" onClick={props.onIncreaseClick} />
      </span>
    );
  }

  if (!title) return null;

  return (
    <tr
      className={classNames({
        'table-success': amount > 0,
        active: amount > 0
      })}
    >
      <td>
        <strong>{title}</strong>
      </td>
      <td>${price} / day</td>
      <td>{days} day(s)</td>
      <td>${(price * days * amount).toFixed(2)}</td>
      <td>
        {amount === 0 && renderAddButton()}
        {!multipliable && amount > 0 && renderRemoveButton()}
        {multipliable && amount > 0 && renderAdjustButtons(amount)}
      </td>
    </tr>
  );
};

export default Equipment;
