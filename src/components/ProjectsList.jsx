import React, {useContext} from 'react';
import styles from './../styles/ProjectList.module.scss'
import { ThemeContext } from '../context';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import ProjectAdd from './ProjectAdd';


const ProjectsLists = ({projectsById, setState}) => {
  const {theme} = useContext(ThemeContext)
  console.log(projectsById, theme)
  let obj = {};
  obj[styles.wrapper] = true;
  obj[styles.wrapperDark] = theme === 'dark';
  let wrapperStyle = classNames(obj);
  
  const handleAdd = (projectName) => {
    let id = Date.now();
    setState({projectsById: {
      [id]: {
        id: id,
        name: projectName,
        tasksIds: []
      },
      ...projectsById
    }})
  }

  return (
    <div>
      <ProjectAdd handleAdd={handleAdd}/>
      {Object.keys(projectsById).sort((a, b) => b - a).map(key => (
        <NavLink to={`/project/${key}`} style={{textDecoration: 'none'}}>
          <div className={wrapperStyle}>
            {projectsById[key].name}
          </div>
        </NavLink>
      ))} 
    </div>
  )
}

export default ProjectsLists;