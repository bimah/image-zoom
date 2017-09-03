import React from 'react';
import ImageSelector from './ImageSelector/main';
import ImageViewer from './ImageViewer/main';

import styles from './main.scss';

import ImagesActions from '../../actions/ImagesActions';

class ImageZoom extends React.Component {
  componentDidMount() {
    ImagesActions.sync();
  }

  render() {
    return (
      <div className={styles.main}>
        <ImageSelector />
        <ImageViewer />
      </div>
    );
  }
}

export default ImageZoom;
