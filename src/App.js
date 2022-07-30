import './App.css';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { db } from "./firebase_config";
import { collection, addDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import TaskListItem from './Task';
import {Helmet} from "react-helmet";

function App() {

  const [tasks, setTasks] = useState([]);

  const [taskInput, setTaskInput] = useState("");

  const tasksCollectionRef = collection(db, 'tasks')

  useEffect(() => {
    getTasks();
  }, []) // runs only on first launch

  function getTasks() {
    onSnapshot(tasksCollectionRef, function(querySnapshot) {
      setTasks(querySnapshot.docs.map((doc) => ({
        id: doc.id,
        task: doc.data().task,
        inprogress: doc.data().inprogress,
        timestamp: doc.data().timestamp
        }))
      );
    })
  }

  function addTask(e) {
    e.preventDefault();
    addDoc(tasksCollectionRef, {
    // collection(db, "tasks").add({
      inprogress: true,
      // timestamp: getFirestore.FieldValue.serverTimestamp(),
      timestamp: serverTimestamp(),
      task: taskInput,
    });
    setTaskInput("");
  }

  return (
    <div className="App">
        <Helmet>
            <meta charSet="utf-8" />
            <title>TodoList</title>
            <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      <div className="Header">
        <h1>TodoList</h1>
      </div>
      <div className='Task-Input'>
        <form>
        <TextField 
          id="standard-basic" 
          label="Enter a task" 
          variant="standard"
          value={taskInput}
          onChange={(e)=> setTaskInput(e.target.value)}
          style={{ maxWidth: "300px", width: "90vw", marginRight: "50px" }} 
        />
        <Button 
          type='submit' 
          variant="contained" 
          onClick={addTask} 
          style={{ marginTop: "10px" }} 
        >
          Add
        </Button>
        </form>
      </div>
      <div className='Task-Content'>
        {tasks.map((task) => (
          <TaskListItem 
          task={task.task} 
          inprogress={task.inprogress} 
          id={task.id}
          timestamp={task.timestamp}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
