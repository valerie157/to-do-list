import './App.css';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

function App() {
  const [selectedDate, setSelectedDate] = useState(null); // For the reminder date
const [selectedTime, setSelectedTime] = useState(null); // For the reminder time

  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
      reminderDate: selectedDate, // Replace with your reminder date logic
      reminderTime: selectedTime, // Replace with your reminder time logic
      isComplete: false, // Initialize as not complete
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);

    // Store the updatedTodoArr in localStorage
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handleCheckTodo = (index) => {
    let updatedTodos = [...allTodos];
    updatedTodos[index].isComplete = !updatedTodos[index].isComplete; // Toggle the isComplete property

    localStorage.setItem('todolist', JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));

    if (savedTodo) {
      setTodos(savedTodo);
    }
  }, []);

  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What is the task title?"
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What is the task description?"
            />
          </div>
          <div className="todo-input-item">
            <button type="button" onClick={handleAddTodo} className="primaryBtn">
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`isCompleteScreen ${isCompleteScreen === false ? 'active' : ''}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`isCompleteScreen ${isCompleteScreen === true ? 'active' : ''}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>
        {allTodos.map((item, index) => (
          <div className="todo-list" key={index}>
            <div className="todo-list-item">
              <h3>{item.title}</h3>
              <h3>{item.description}</h3>
              <AiOutlineDelete
                className="icon"
                onClick={() => handleDeleteTodo(index)}
                title="Delete"
              />
              <BsCheckLg
                className={`check-icon ${item.isComplete ? 'completed' : ''}`}
                onClick={() => handleCheckTodo(index)}
                title="Check"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

