import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "../search/styles/extras.css";

class Equipment extends Component {
  renderTitle() {
    switch (this.props.title) {
      case "Child Seat":
        return <span>儿童座椅</span>;

      case "GPS":
        return <span>GPS导航</span>;

      case "CDW No Tax":
        return <span>车损险(CDW)</span>;

      default:
        return <span>{this.props.title}</span>;
    }
  }
  render() {
    const { props } = this;
    const { title, price, days, amount, multipliable } = props;

    function renderAddButton() {
      return (
        <span className={classNames(styles.spanStyle, styles.addWrap)}>
          <i
            className={classNames(styles.iStyle, "fa fa-plus-circle")}
            onClick={props.onAddClick}
          />
        </span>
      );
    }

    function renderRemoveButton() {
      return (
        <span className={classNames(styles.removeWrap, styles.spanStyle)}>
          <i
            className={classNames(styles.iStyle, "fa fa-times-circle")}
            onClick={props.onRemoveClick}
          />
        </span>
      );
    }

    function renderAdjustButtons(i) {
      return (
        <span className={classNames(styles.spanStyle, styles.adjustWrap)}>
          <i
            className={classNames(styles.iStyle, "fa fa-minus-circle")}
            onClick={props.onDecreaseClick}
          />
          <span>{i}</span>
          <i
            className={classNames(styles.iStyle, "fa fa-plus-circle")}
            onClick={props.onIncreaseClick}
          />
        </span>
      );
    }

    if (!title) return null;

    return (
      <tr
        className={classNames(styles.trStyle, {
          "table-success": amount > 0,
          active: amount > 0
        })}
      >
        <td className={styles.tdStyle}>
          <strong>{this.renderTitle()}</strong>
        </td>
        <td className={styles.tdStyle}>${price} / 天</td>
        <td className={styles.tdStyle}>{days} 天</td>
        <td className={styles.tdStyle}>
          ${(price * days * amount).toFixed(2)}
        </td>
        <td className={styles.tdStyle}>
          {amount === 0 && renderAddButton()}
          {!multipliable && amount > 0 && renderRemoveButton()}
          {multipliable && amount > 0 && renderAdjustButtons(amount)}
        </td>
      </tr>
    );
  }
}

export default Equipment;
