import React from 'react';
import '../App.css';
const Task = (props) => {

  const handleClick = () => {
    console.log(`Task ${props.id} completed status = ${props.completed}`)
  }

  return (
    <div className="task__wrapper">
      <div className="task__title">
        {props.name}
      </div>
      <div className="task__description">
        {props.description}
      </div>
      <div className="task__bottom">
        <div className="task__status">
          {props.completed && <div style={{color: '#4fbd00'}}>COMPLETED</div> }

          {!props.completed && <div style={{color: '#bd0000'}}>NOT COMPLETED</div>}
        </div>
        <div className="completed-button" onClick={handleClick}>
          {props.completed ? "Accept" : "Cancel"}
        </div>
      </div>
    </div>
  )
}

export default Task;