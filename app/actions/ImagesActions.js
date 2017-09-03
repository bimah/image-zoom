import alt from '../alt';

class ImagesActions {
  constructor() {
    this.generateActions(
      'sync',
      'selectImage',
    );
  }
}

export default alt.createActions(ImagesActions);
