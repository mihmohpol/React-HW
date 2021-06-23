import './App.scss';
import React, { useState } from 'react';
import MyTodoList from './components/MyTodoList'
import ProjectsList from './components/ProjectsList'
import classNames from 'classnames';
import {ThemeContext} from './context';

import {Switch, Route, Redirect} from 'react-router-dom';

const normalizeState = (projectArray) => {
  let normalizedState = {
    projectsById: {},
    tasksById: {},
  };

  projectArray.forEach((project) => {
    normalizedState.projectsById[project.id] = {
      id: project.id,
      name: project.name,
      tasksIds: project.tasks.map(task => {
        normalizedState.tasksById[task.id] = task
        return task.id
      })
    }
  })

  return normalizedState;
}

class App extends React.Component {

  state = {
    theme: 'light',
  }

  componentWillMount() {
    let projects = [
      {
        id: 1,
        name: "Project name",
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
    ]

    this.setState({...normalizeState(projects)});
  }

  handleChangeTheme = () => {
    if (this.state.theme === 'dark') this.setState({theme: 'light'}) 
    else this.setState({theme: 'dark'}) 
  }

  render() {
    let appClass = classNames({
      App: true,
      'App-dark': this.state.theme === 'dark'
    })
    console.log(this.state)
    return (
      <ThemeContext.Provider value={{
        theme: this.state.theme
      }}> 
        <div className={appClass}>
          <Switch>
            <Route exact path='/project/:id' render={(props) => <MyTodoList {...props} 
              project={this.state.projectsById[props.match.params.id] || null}
              projectsById={this.state.projectsById}
              tasksById={this.state.tasksById || []}
              theme={this.state.theme}
              setState={this.setState.bind(this)}
            />}/>
            <Route exact path='/projects' render={() => <ProjectsList projectsById={this.state.projectsById} setState={this.setState.bind(this)}/>}/>
            <Route path='/' render={() => <Redirect to='/projects'></Redirect>}/>
          </Switch>
        </div>

        <div className={`themeSwicher-${this.state.theme}`} onClick={this.handleChangeTheme}>Change theme</div>
      </ThemeContext.Provider>
    );
  }
}

export default App;

