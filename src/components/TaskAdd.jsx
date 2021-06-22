import React, {useRef, useContext} from 'react';
import styles from '../styles/TaskAdd.module.scss';

const TaskAdd = (props) => {
  let nameRef = useRef();
  let descRef = useRef();

  const handleClick = () => {
    if (nameRef.current.value !== '' && descRef.current.value !== '') { 
      props.addTask({name: nameRef.current.value, description: descRef.current.value, completed: false})
      nameRef.current.value = '';
      descRef.current.value = '';
    }
  }

  return (
    <div className={styles.adding__container}>
      <input type="text" placeholder="name" ref={nameRef} className={styles.input_name}/>
      <textarea type="text" placeholder="description" ref={descRef} className={styles.input_desc}/>
      <div onClick={handleClick} className={styles.buttonAdd}>
        Add
      </div>
    </div>
  )
}

export default TaskAdd;