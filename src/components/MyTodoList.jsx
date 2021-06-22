import React from 'react';

import Task from './Task';
import TaskAdd from './TaskAdd';

class MyTodoList extends React.Component {
  state = {
    tasks: [
      {
        id: 1,
        name: "Name of the task",
        description: "What needs to be done",
        completed: false,
      },
      {
        id: 2,
        name: "Clear room",
        desription: "My room is bad",
        completed: true,
      },
      {
        id: 3,
        name: "Learn React",
        description: "Nice lib",
        completed: true,
      },
      {
        id: 4,
        name: "Get 5 marks",
        description: "it's neccecary",
        completed: false,
      },
      {
        id: 5,
        name: "Learn NodeJS",
        description: "Nice platform",
        completed: false,
      },
      {
        id: 6,
        name: "Buy apple",
        description: "For my mom",
        completed: true,
      },
      {
        id: 7,
        name: "Go sleep",
        description: "Don't know what's a poing",
        completed: false,
      },
       
    ]
  }
  changeCompleted = function (id) {
    console.log(id, ' ',this.state.tasks)
    this.setState({tasks: this.state.tasks.map(task => task.id === id ? {...task, completed: !task.completed} : task)})
    
  }
  addTask = function (task) {
    console.log(task, this.state.tasks)
    if (task.name !== "") {
      this.setState({tasks: [{...task, id: Date.now()}, ...this.state.tasks]})
    }
  }
  render() {
    return (
      <div>
        <TaskAdd addTask={this.addTask.bind(this)}/>
        {this.state.tasks.map((task, key) => <Task key={key} {...task} changeCompleted={this.changeCompleted.bind(this)}/>)}
      </div>
    )
  }
}

export default MyTodoList