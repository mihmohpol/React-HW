import React from 'react';

import Task from './Task';
import TaskAdd from './TaskAdd';
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../context';

import { connect } from 'react-redux';
import {AddTask, ChangeCompleted} from '../redux/actions';

class MyTodoList extends React.Component {
  changeCompleted = function (id) {
    // console.log(id, ' ',this.props.tasksById[id].completed)
    this.props.ChangeCompleted(id)
  }
  addTask = function (task) {
    this.props.AddTask(task.name, task.description, this.props.project)
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


export default connect(null, {AddTask, ChangeCompleted})(MyTodoList);