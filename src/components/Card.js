import React, { useState } from 'react'
import './Card.css'
import MyButton from './MyButton';
import { removeTask,modifyTask,toggleTask } from '../redux/modules/todo';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
function Card({isDone, id, cardTitle, desc}) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [values, setValues] = useState({
    title:cardTitle,
    desc:desc
  })
  const moveCard = ()=> {
    dispatch(toggleTask(id))
  }
  const deleteCard=()=>{
    dispatch(removeTask(id))
  }
  const modifyCard=()=>{
    setIsEditing(!isEditing);
  }
  const OnChange=(e)=>{
    setValues({...values,
      [e.target.name]: e.target.value,
    })
  }
  const saveCard=()=>{
    dispatch(modifyTask({id,values}))
    setIsEditing(!isEditing)
  }
  return (
    <div className='card' >
        {isEditing ? <input style={{//h1태그의 default style
          display: "block",
          fontSize: "2em",
          marginTop: "0.67em",
          marginBottom: "0.67em",
          marginLeft: "0",
          marginRight: "0",
          fontWeight: "bold"}} type="text" name="title" value={values.title} onChange={OnChange}/> :
          <h1 className='card-title'>{cardTitle}</h1> }
        {isEditing ? <input type="text" name="desc" value={values.desc} onChange={OnChange}/>: 
        <p className='card-description'>{desc}</p> }
        <div className='control-section'>
          <MyButton title="🗑️" func={deleteCard}/>
          <MyButton title={isDone ? "↩️":"✔️"} func={moveCard}/>
          {isEditing ? <MyButton title="💾" func={saveCard}/>:
          <MyButton title="📝" func={modifyCard}/>}
          <Link to={`/spec/${id}`}>
            <MyButton title="ℹ️"/>
          </Link>
        </div>
    </div>
  )
}

export default Card