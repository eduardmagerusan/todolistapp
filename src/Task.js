import { Button, ListItem, ListItemText } from '@mui/material'
import { doc, setDoc, deleteDoc } from 'firebase/firestore'
import React from 'react'
import { db } from './firebase_config'

export default function TaskListItem({ task, inprogress, id, timestamp}) {

    function updateInProgress() {
        setDoc(doc(db, "tasks", id), {
            task: task,
            inprogress: !inprogress,
            timestamp: timestamp,
        });
    }

    function deleteTask() {
        deleteDoc(doc(db, "tasks", id))
    }

  return (
    <div style={{display:"flex"}}>
    <ListItem>
        <ListItemText 
            primary={task} 
            secondary={inprogress ? "In Progress" : "Completed"}
        />
    </ListItem>

    <Button onClick={updateInProgress}>
        {inprogress ? "Done" : "Undone"}
    </Button>
    <Button onClick={deleteTask}>X</Button>
    </div>
  )
}
