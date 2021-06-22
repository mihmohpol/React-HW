import React, {useContext} from 'react';
import styles from './../styles/ProjectList.module.scss'
import { ThemeContext } from '../context';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import ProjectAdd from './ProjectAdd';

import { connect } from 'react-redux';
import { AddProject } from '../redux/actions';
import ApiService from '../API/ApiService'
const ProjectsLists = (props) => {
  const {theme} = useContext(ThemeContext)
  let obj = {};
  obj[styles.wrapper] = true;
  obj[styles.wrapperDark] = theme === 'dark';
  let wrapperStyle = classNames(obj);
  
  const handleAdd = (projectName) => {
    ApiService.addProject(projectName).then(response => props.AddProject(response.name, response.id))
  }

  return (
    <div style={{width: 400}}>
      <ProjectAdd handleAdd={handleAdd}/>
      {Object.keys(props.projectsById).sort((a, b) => b - a).map(key => (
        <NavLink to={`/project/${key}`} style={{textDecoration: 'none'}}>
          <div className={wrapperStyle}>
            {props.projectsById[key].name}
          </div>
        </NavLink>
      ))} 
    </div>
  )
}

let mapStateToProps = (state) => {
  return {
    projectsById: state.ReducerApp.projectsById,
  }
};


export default connect(mapStateToProps, {AddProject})(ProjectsLists);