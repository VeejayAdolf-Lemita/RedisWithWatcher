import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '../imports/api/TasksCollection';
import { TasksPub } from '../imports/api/common';
import '../imports/api/server/methods';
import Server from '../imports/api/server/Server';

Meteor.startup(async () => {
  Server.run();
  // Meteor.publish(TasksPub, function () {
  //   try {
  //     return TasksCollection.find({}, { fields: { title: 1 } });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  //   this.ready();
  // });
});
