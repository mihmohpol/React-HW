import React from 'react';

import Task from './Task';
import TaskAdd from './TaskAdd';
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../context';

import { connect } from 'react-redux';
import {AddTask, ChangeCompleted, setTasks} from '../redux/actions';

import ApiService from '../API/ApiService'

class MyTodoList extends React.Component {

  state = {
    isExist: true
  }

  changeCompleted = function (data) {
    // console.log(id, ' ',this.props.tasksById[id].completed)
    console.log(data)
    ApiService.changeTask({
      name: data.name,
      description: data.description,
      priority: data.priority,
      completed: !data.completed,
      id: data.id
    },this.props.match.params.id).then(response => {
      console.log(data.id)
      this.props.ChangeCompleted(data.id)
    })  
    // this.props.ChangeCompleted(data)
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.project) {
      ApiService.getTasksByProject(this.props.match.params.id).then(response => {
        this.props.setTasks(this.props.match.params.id, response)
      }).catch(error => {
        this.setState({isExist: false})
      })
    }
  }

  componentDidMount() {
    ApiService.getTasksByProject(this.props.match.params.id).then(response => {
      this.props.setTasks(this.props.match.params.id, response)
    }).catch(error => {
      this.setState({isExist: false})
    })
  }

  addTask = function (task) {
    // this.props.AddTask(task.name, task.description, this.props.project)
    ApiService.addTask(this.props.project.id, task.name, task.description).then(response => {
      console.log(response)
      this.props.AddTask(task.name, task.description, this.props.project, response.id)
    })

  }
  render() {
    console.log(this.props.project)
    if (!this.state.isExist) return <Redirect to='/projects'></Redirect>
    if (!this.props.project) return <div>Loading</div>
    return (
      <div style={{width: 400}}>
        <NavLink className={`back-${this.props.theme}`} to='/projects'>Back from <span style={{fontWeight: 'bold'}}>{this.props.project.name}</span></NavLink>
        <TaskAdd addTask={this.addTask.bind(this)}/>
        {this.props.project.tasksIds.sort((a, b) => b - a).map((id, key) => <Task key={key} {...this.props.tasksById[id]} changeCompleted={this.changeCompleted.bind(this)}/>)}
      </div>
    )
  }
}


export default connect(null, {AddTask, ChangeCompleted, setTasks})(MyTodoList);