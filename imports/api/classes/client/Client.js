import Watcher from './Watcher';

class Session extends Watcher {
  constructor(parent) {
    super(parent);
    this.secureTransaction();
  }
}

export default new Session();
