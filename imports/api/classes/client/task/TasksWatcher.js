import Watcher from '../Watcher';
import Client from '../Client';
import { TasksCollection } from '../../../TasksCollection';
import { TaskAdd, TaskRemove, TaskUpdate, TasksPub } from '../../../common';

class TaskWatcher extends Watcher {
  #task;

  constructor(parent) {
    super(parent);
    this.#task = { title: '', selectedId: null };
  }

  get Task() {
    return this.#task;
  }

  setTask(newTask = {}) {
    this.#task = { ...this.#task, ...newTask };
    this.activateWatcher();
  }

  get Tasks() {
    return TasksCollection.find({}, { fields: { title: 1 } }).map((data) => data);
  }

  addTask(data) {
    this.Parent.callFunc(TaskAdd, data).catch((error) => console.log(error));
  }

  removeTask(id) {
    this.Parent.callFunc(TaskRemove, id).catch((error) => console.log(error));
  }

  // updateTask(id, data) {
  //   this.Parent.callFunc(TaskUpdate, id, data).catch((error) => console.log(error));
  // }

  resetForm({ forceRender = true }) {
    this.#task = { title: '' };
    forceRender && this.activateWatcher();
  }

  initiateSubscription() {
    return this.Parent.subscribe(TasksPub);
  }
}

export default new TaskWatcher(Client);
