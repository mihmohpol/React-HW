import React, {useContext} from 'react';
import styles from '../styles/Task.module.scss';
import { ThemeContext } from '../context';

import classNames from 'classnames';

const Task = (props) => { 
  let {theme} = useContext(ThemeContext)

  const handleClick = () => {
    props.changeCompleted(props)
  }

  let obj = {
  }
  obj[styles.task__wrapper] = true
  obj['task-dark'] = theme === "dark";

  let wrapperStyle = classNames(obj)

  return (
    <>
    <div className={wrapperStyle}>
      <div className={styles.task__title}>
        {props.name}
      </div>
      <div className={styles.task__description}>
        {props.description}
      </div>
      <div className={styles.task__bottom}>
        <div className={styles.task__status}>
          {props.completed && <div style={{color: '#4fbd00'}}>COMPLETED</div> }

          {!props.completed && <div style={{color: '#bd0000'}}>NOT COMPLETED</div>}
        </div>
        <div className={styles.completedButton} onClick={handleClick}>
          {!props.completed ? "Accept" : "Cancel"}
        </div>
      </div>
    </div>
    </>
  )
}

export default Task; 