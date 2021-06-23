import React from 'react';

import Task from './Task';
import TaskAdd from './TaskAdd';
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../context';

class MyTodoList extends React.Component {
  state = {
    tasks: this.props.tasks || [],
  }
  changeCompleted = function (id) {
    console.log(id, ' ',this.props.tasksById[id].completed)
    // this.setState({tasks: this.state.tasks.map(task => task.id === id ? {...task, completed: !task.completed} : task)})
    this.props.setState({
      tasksById: {
        ...this.props.tasksById,
        [id]: {
          ...this.props.tasksById[id],
          completed: !this.props.tasksById[id].completed
        },
      }
    })
  }
  addTask = function (task) {
    console.log(task, this.state.tasks)
    console.log(this.props.project)
    if (task.name !== "") {
      let id = Date.now();
      this.props.setState({projectsById: {
        ...this.props.projectsById,
        [this.props.project.id]: {
          ...this.props.project,
          tasksIds: [id, ...this.props.project.tasksIds]
        }
      },
      tasksById: {
        ...this.props.tasksById,
        [id]: {
          id,
          ...task
        }
      }})
    }
  }
  render() {
    if (!this.props.project) return <Redirect to='/projects'></Redirect>
    return (
      <div style={{width: 400}}>
        <NavLink className={`back-${this.props.theme}`} to='/projects'>Back to Projects</NavLink>
        <TaskAdd addTask={this.addTask.bind(this)}/>
        {this.props.project.tasksIds.map((id, key) => <Task key={key} {...this.props.tasksById[id]} changeCompleted={this.changeCompleted.bind(this)}/>)}
      </div>
    )
  }
}

export default MyTodoList