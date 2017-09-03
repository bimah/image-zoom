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
      dimensions: {
        height: null,
        width: null,
      },
      zoom: null,
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
    const imageWidth = img.naturalWidth;
    const imageHeigh = img.naturalHeight;
    const viewportWidth = window.innerWidth - 60;

    const zoom = imageWidth <= viewportWidth ? 100 : Math.round(viewportWidth / (imageWidth / 100));

    this.setState({
      dimensions: { height: imageHeigh, width: imageWidth },
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
    const { imageInView, zoom, dimensions } = this.state;

    const viewportWidth = window.innerWidth - 60;
    const imgWidth = (dimensions.width / 100) * zoom;
    const containerWidth = dimensions.width <= viewportWidth ? viewportWidth : dimensions.width;
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
              style={{ width: `${imgWidth}px` }}
            />}
        </div>
      </div>
    );
  }
}

export default ImageViewer;
