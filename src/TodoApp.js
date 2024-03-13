import React, { useEffect, useRef, useState } from 'react'
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";

const TodoApp = () => {

  const [todoData, setTodoData] = useState([])
  const [taskIdex, setTaskIndex] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const[isCompleted, setIsCompleted] = useState([])

 console.log(todoData);

  
  const myRef = useRef()


  const handleSubmit = (e) => {
    e.preventDefault()
    const value = e.target[0].value

    if (isEditing) {
      setTodoData((prev) => prev.map((data, index) => index !== taskIdex ? data : {...data, text: value}))
      refFunction()
    }
    else {

      setTodoData((prev) => [...prev, {text : value, completed: false}])
      console.log(value)
      refFunction()
    }
    setIsEditing(false)
  }

  const handleDelete = (index) => {
    const deleTodo = [...todoData]
    deleTodo.splice(index, 1)
    setTodoData(deleTodo)
  }

  const handleEdit = (index) => {
    const value = todoData[index]
    setTaskIndex(index)
    setIsEditing(!isEditing)
    myRef.current.value = value.text
    
  }
  
  function refFunction() {
    myRef.current.value = ""
    myRef.current.focus()
  }
  
  const handleComplete = (index) => {
    setTodoData(prevTodoData => {
      const updatedTodoData = prevTodoData.map((todo, i) => {
        if (i === index) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      localStorage.setItem("todo", JSON.stringify(updatedTodoData)); // Save updated todoData to storage
      console.log(updatedTodoData);
      return updatedTodoData;
    });
    
    setIsCompleted(prevIsCompleted => {
      const updatedIsCompleted = [...prevIsCompleted];
      updatedIsCompleted[index] = !updatedIsCompleted[index];
      return updatedIsCompleted;
    });
   
  }
  
  
  useEffect(() => {
    const todoStorage = JSON.parse(localStorage.getItem("todo"))
    if (todoStorage) {
      setTodoData(todoStorage)
      setIsCompleted(todoStorage.map(todo => todo.completed ))
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todoData))
  }, [todoData])


  return (
    <div className='todo-app'>
      <form onSubmit={handleSubmit}>
        <input
          autoComplete='off'
          autoFocus
          ref={myRef}
          type="text"
          name="task"
        />
        <button type='submit'>{isEditing ? "Edit" : "Add Task"}</button>
      </form>
      <div className='Todos'>
        <ul className='todo-list'>
          {todoData.map((todo, index) => (

            <li 
            key={index} 
            className="todo"  
            style={{textDecoration: isCompleted[index]? "line-through": "", color: isCompleted[index]? "red" : ""}}>
              {todo.text}
              <span>
                <FaTrash size={20} color={'white'} onClick={() => handleDelete(index)} />
                <FaCheck size={20} color={isCompleted[index]? "green": "white"} onClick={() => handleComplete(index)} />
                <FaEdit size={20} color={isEditing && index === taskIdex ? "red" : "white"} onClick={() => handleEdit(index)} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TodoApp