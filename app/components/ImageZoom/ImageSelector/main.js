import React from 'react';
import classNames from 'classnames/bind';
import styles from './main.scss';
import Thumb from './Thumb/main';
import Button from '../Button/main';

import ImagesStore from '../../../stores/ImagesStore';

const cx = classNames.bind(styles);

class ImageSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      imageSelected: null,
      open: false,
    };

    this.onImagesStoreChange = this.onImagesStoreChange.bind(this);
    this.togglePanel = this.togglePanel.bind(this);
  }

  componentDidMount() {
    ImagesStore.listen(this.onImagesStoreChange);
  }

  componentWillUnmount() {
    ImagesStore.unlisten(this.onImagesStoreChange);
  }

  onImagesStoreChange(imageStore) {
    this.setState(imageStore);
  }

  togglePanel() {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  render() {
    const { images, imageSelected, open } = this.state;
    const buttonLable = open ? '<' : '>';
    const mainClasses = cx('container', {
      open,
    });
    return (
      <div className={mainClasses}>
        <div className={styles.handler}>
          <Button label={buttonLable} direction="right" onClick={this.togglePanel} />
        </div>
        <div className={styles.thumbs}>
          {images.map((image, i) =>
            <Thumb key={Math.random()} image={image} selected={imageSelected === i} index={i} />)}
        </div>
      </div>
    );
  }
}

export default ImageSelector;
