import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './main.scss';

const cx = classNames.bind(styles);

const Button = (props) => {
  const buttonClasses = cx('button', {
    left: props.direction === 'left',
    right: props.direction === 'right',
  });
  return (
    <button className={buttonClasses} onClick={props.onClick}>{props.label}</button>
  );
};

Button.defaultProps = {
  direction: 'none',
};

Button.propTypes = {
  direction: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
