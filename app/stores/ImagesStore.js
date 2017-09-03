import alt from '../alt';
import ImagesData from '../../images.json';

import Actions from '../actions/ImagesActions';

class ImagesStore {
  constructor() {
    this.state = {
      images: [],
      imageSelected: 0,
    };

    this.bindActions(Actions);
  }

  // TODO Implement different providers (Dropbox, cloud storage, etc...)
  onSync() {
    this.setState({ images: ImagesData });
  }

  onSelectImage(index) {
    if (index === this.state.imageSelected) return;
    this.setState({ imageSelected: index });
  }
}

export default alt.createStore(ImagesStore, 'ImagesStore');
