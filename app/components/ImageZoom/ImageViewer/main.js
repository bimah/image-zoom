import React from 'react';
import Button from '../Button/main';

import styles from './main.scss';

import ImagesStore from '../../../stores/ImagesStore';

class ImageViewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      imageInView: null,
      imageWidth: null,
      zoom: null,
      viewportWidth: window.innerWidth - 60,
    };

    this.onImagesStoreChange = this.onImagesStoreChange.bind(this);
    this.onImgLoad = this.onImgLoad.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
  }

  componentDidMount() {
    ImagesStore.listen(this.onImagesStoreChange);
  }

  componentWillUnmount() {
    ImagesStore.unlisten(this.onImagesStoreChange);
  }

  onImagesStoreChange({ images, imageSelected }) {
    this.setState({ images, imageInView: images[imageSelected] });
  }

  onImgLoad({ target: img }) {
    const { viewportWidth } = this.state;
    const imageWidth = img.naturalWidth;

    const zoom = imageWidth <= viewportWidth ? 100 : Math.round(viewportWidth / (imageWidth / 100));

    this.setState({
      imageWidth,
      zoom,
    });
  }

  zoomIn() {
    const { zoom } = this.state;
    if (zoom === 100) return;
    const newZoom = zoom % 5 === 0 ? zoom + 5 : zoom + (5 - (zoom % 5));
    this.setState({ zoom: newZoom });
  }

  zoomOut() {
    const { zoom } = this.state;
    if (zoom === 50) return;
    const newZoom = zoom % 5 === 0 ? zoom - 5 : zoom - (zoom % 5);
    this.setState({ zoom: newZoom });
  }

  render() {
    const { imageInView, zoom, imageWidth, viewportWidth } = this.state;

    const currentImageWidth = (imageWidth / 100) * zoom;
    const containerWidth = imageWidth <= viewportWidth ? viewportWidth : imageWidth;
    const leftPosition = containerWidth >= viewportWidth
      ? ((containerWidth - viewportWidth) / 2) : 0;

    return (
      <div className={styles.container}>
        <div className={styles.zoom}>
          <p>{zoom !== null && zoom}%</p>
        </div>
        <div className={styles['zoom--cta']}>
          <Button label="+" onClick={this.zoomIn} direction="left" />
          <Button label="-" onClick={this.zoomOut} direction="right" />
        </div>
        <div className={styles['image--container']} style={{ width: `${containerWidth}px`, left: `-${leftPosition}px` }}>
          {imageInView &&
            <img
              src={imageInView.url}
              onLoad={this.onImgLoad}
              alt={imageInView.name}
              style={{ width: `${currentImageWidth}px` }}
            />}
        </div>
      </div>
    );
  }
}

export default ImageViewer;
