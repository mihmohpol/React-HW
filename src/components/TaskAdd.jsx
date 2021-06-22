import React, {useRef} from 'react';
import '../App.css'

const TaskAdd = (props) => {
  let nameRef = useRef();
  let descRef = useRef();

  const handleClick = () => {
    props.addTask({name: nameRef.current.value, description: descRef.current.value, completed: false})
    nameRef.current.value = '';
    descRef.current.value = '';
  }

  return (
    <div className="adding__container">
      <input type="text" placeholder="name" ref={nameRef} className="input_name"/>
      <textarea type="text" placeholder="description" ref={descRef} className="input_desc"/>
      <div onClick={handleClick} className="button-add">
        Add
      </div>
    </div>
  )
}

export default TaskAdd;