import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import Actions from '../../../../actions/ImagesActions';

import styles from './main.scss';

const cx = classNames.bind(styles);

const Thumb = ({ image, selected, index }) => {
  const mainStyles = cx('thumb', {
    selected,
  });
  const handleClick = i => Actions.selectImage(i);
  return (
    <button className={mainStyles} onClick={() => handleClick(index)} >
      <div className={styles.image} style={{ backgroundImage: `url(${image.url})` }} />
      <div className={styles.name}>
        <p>{image.name}</p>
      </div>
    </button>
  );
};

Thumb.defaultProps = {
  selected: false,
};

Thumb.propTypes = {
  image: PropTypes.shape({
    name: PropTypes.string,
    fileName: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  selected: PropTypes.bool,
};

export default Thumb;
