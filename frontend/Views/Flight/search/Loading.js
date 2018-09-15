import React from 'react';
import classNames from 'classnames/bind';

const Loading = props => (
  <div className={props.containerClass || 'loading-container'}>
    <div className="inner">
      <div
        className={classNames({
          'la-ball-pulse': true,
          'la-2x': !props.smallDots,
          'la-x': props.smallDots
        })}
      >
        <div />
        <div />
        <div />
      </div>
    </div>
  </div>
);

export default Loading;
