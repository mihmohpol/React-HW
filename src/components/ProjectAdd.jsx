import React, {useRef, useContext} from 'react';
import styles from '../styles/ProjectAdd.module.scss';

const ProjectAdd = ({handleAdd}) => {
  let nameRef = useRef();

  const handleClick = () => {
    handleAdd(nameRef.current.value)
    nameRef.current.value = '';
  }

  return (
    <div className={styles.adding__container}>
      <input type="text" placeholder="project name" ref={nameRef} className={styles.input_name}/>
      <div onClick={handleClick} className={styles.buttonAdd}>
        Add
      </div>
    </div>
  )
}

export default ProjectAdd;