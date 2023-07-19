import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import TasksWatcher from '../api/classes/client/task/TasksWatcher';

class App extends Component {
  constructor(props) {
    super(props);
    TasksWatcher.setWatcher(this, 'App');

    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd() {
    const { selectedId, title } = TasksWatcher.Task;
    // const isTaskSelected = !!selectedId;

    if (!title) {
      return alert('Title cannot be empty');
    }
    // if (isTaskSelected === true) {
    //   console.log({ title });
    //   TasksWatcher.updateTask(selectedId, { title });
    // } else {
    TasksWatcher.addTask({ title });
    // }

    // console.log({ title });
    TasksWatcher.resetForm({ forceRender: false });
  }

  handleDelete(id) {
    TasksWatcher.removeTask(id);
  }

  render() {
    TasksWatcher.initiateWatch('App');
    return (
      <div className='app'>
        <header>
          <div className='app-bar'>
            <div className='app-header'>
              <h1>📝️ To Do List ({this.props.Tasks.length})</h1>
            </div>
          </div>
        </header>
        <div className='main'>
          <div className='task-form'>
            <input
              type='text'
              placeholder='Enter a Todo'
              onChange={(e) => TasksWatcher.setTask({ title: e.target.value })}
              value={TasksWatcher.Task.title}
            />
            <button onClick={() => this.handleAdd()}>
              {TasksWatcher.Task.selectedId ? 'Update' : 'Add Task'}
            </button>
          </div>
        </div>
        {this.props.isLoading ? (
          'Loading...'
        ) : (
          <div>
            {this.props.Tasks.length === 0 ? (
              <h2>Enter your first Task</h2>
            ) : (
              <ul className='tasks'>
                {this.props.Tasks.map((task) => (
                  <li key={task._id._str}>
                    <span>
                      <b>Title: </b>
                      {task.title}
                    </span>
                    {/* <button
                      className='btn-info'
                      onClick={() =>
                        TasksWatcher.setTask({
                          selectedId: task._id,
                          title: task.title,
                        })
                      }
                    >
                      Edit Task
                    </button> */}
                    <button onClick={() => this.handleDelete(task._id)}>&times;</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withTracker(() => {
  const isReady = TasksWatcher.initiateSubscription();

  return { isLoading: !isReady, Tasks: TasksWatcher.Tasks };
})(App);
