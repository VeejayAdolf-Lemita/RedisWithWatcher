import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import { check } from 'meteor/check';
import { TasksCollection } from '../../TasksCollection';

import { TaskAdd, TaskRemove, TaskUpdate } from '../../common';

Meteor.methods({
  [TaskAdd]: function (data = {}) {
    try {
      check(data, Object);

      data.timestamp = moment().valueOf();
      // create log in the server just to notify if a new task is added.
      console.info(
        'registry.js call[%s]: %s at %s',
        TaskAdd,
        'New Task Added!',
        moment(data.timestamp),
      );
      return TasksCollection.insert(data);
    } catch (error) {
      console.error('registry.js call[%s]: %s.', TaskAdd, error);
    }
  },
  [TaskRemove]: function (id) {
    try {
      check(id, Meteor.Collection.ObjectID);
      // create log in the server just to notify if a task is removed.
      console.info(
        'registry.js call[%s]: %s at %s',
        TaskRemove,
        `Task ${id} removed`,
        moment(moment().valueOf()),
      );

      return TasksCollection.remove(id);
    } catch (error) {
      console.error('registry.js call[%s]: %s.', TaskRemove, error);
    }
  },
  // [TaskUpdate]: function (id, data = {}) {
  //   try {
  //     check(id, Meteor.Collection.ObjectID);
  //     check(data, Object);
  //     console.info(
  //       'registry.js call[%s]: %s at %s',
  //       TaskUpdate,
  //       `Task ${id} updated`,
  //       moment(moment().valueOf()),
  //     );
  //     console.log('id:', id);
  //     console.log('data:', data);

  //     return TasksCollection.update(id, { $set: { ...data } }, { upsert: 1 });
  //   } catch (error) {
  //     console.error('registry.js call[%s]: %s.', TaskUpdate, error);
  //   }
  // },
});
