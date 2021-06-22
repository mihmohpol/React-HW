import './App.scss';
import React, { useState } from 'react';
import MyTodoList from './components/MyTodoList'
import ProjectsList from './components/ProjectsList'
import classNames from 'classnames';
import {ThemeContext} from './context';
import {Switch, Route, Redirect} from 'react-router-dom';

import {connect} from 'react-redux';
import ApiService from './API/ApiService';
import {SetProjects} from './redux/actions'

class App extends React.Component {

  state = {
    theme: 'light',
  }


  handleChangeTheme = () => {
    if (this.state.theme === 'dark') this.setState({theme: 'light'}) 
    else this.setState({theme: 'dark'}) 
  }

  componentWillMount() {
    ApiService.getProjects().then(response => this.props.SetProjects(response))
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
              project={this.props.projectsById[props.match.params.id] || null}
              projectsById={this.props.projectsById}
              tasksById={this.props.tasksById || []}
              theme={this.state.theme}
            />}/>
            <Route exact path='/projects' render={() => <ProjectsList projectsById={this.props.projectsById}/>}/>
            <Route path='/' render={() => <Redirect to='/projects'></Redirect>}/>
          </Switch>
        </div>

        <div className={`themeSwicher-${this.state.theme}`} onClick={this.handleChangeTheme}>Change theme</div>
      </ThemeContext.Provider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    projectsById: state.ReducerApp.projectsById,
    tasksById: state.ReducerApp.tasksById,
  }
}

export default connect(mapStateToProps, {SetProjects})(App);

