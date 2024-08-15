import { useEffect, useState } from 'react';
import './App.css';
import { TodoInput } from './Components/TodoInput';
import { TodoList } from './Components/TodoList';

function App() {
const [Todos,setTodos] = useState([])
const [todoValues,setTodoValues] = useState('')
useEffect(()=>{
  if (!localStorage){return}
  let localTodos = localStorage.getItem('todos')
  if(!localTodos){return}
  //since local storage stores everything as a string 
  //it chnages back the Todos as Orginal format
  localTodos = JSON.parse(localTodos)
  setTodos(localTodos)
},[])

function presistData(newList){
  //Since local storage strors everything as a string so 
  //Changing Todos from Orginal format to String
  localStorage.setItem('todos',JSON.stringify({todos:newList}))
}


//To Handle input of new Todo as Changes will not be tracked if we dont use State
//so adding new Todo with old once
function HandleInputTodos(newTodos) {
  presistData([...Todos,newTodos])
  setTodos([...Todos,newTodos])
}

//To Handle Deletion of Todo using filter 
//such that it will filter the index of the Todo which is clicked

function HandleDeleteTodo(index){
  const newTodoList = Todos.filter((todo,TodoIndex) => {
    return TodoIndex !== index
  })
  presistData(newTodoList)
  setTodos(newTodoList)
}

//Deleting the Todo needed to be updated and instead adding a new one

function HandleUpdateTodo(index)
{
  const ValueToBeUpdated = Todos[index]
  setTodoValues(ValueToBeUpdated)
  HandleDeleteTodo(index)
}


  return (
    <div className="App">
      <TodoInput HandleInputTodos ={HandleInputTodos} todoValues={todoValues} setTodoValues={setTodoValues}/>
      <TodoList Todos ={Todos} HandleDeleteTodo={HandleDeleteTodo}  HandleUpdateTodo={HandleUpdateTodo}/>
    </div>
  );
}

export default App;
