import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { FormControl, Input, InputLabel } from '@mui/material';
import Message from "./Message";
import './App.css';
import db from "./firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    db.collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => doc.data()))
    })
  }, [] )
  
  useEffect(() => {
    setUsername(prompt('Please enter your name'));
  }, [])


  const sendMessage = (event) => {
    event.preventDefault();

    db.collection('messages').add({
      message:input, 
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('');
  }

  return (
    <div className="App">
      <h1>Hello coders 🚀</h1>
      <h2>Hello {username}</h2>

      <form>
        <FormControl>
        <InputLabel>Enter your message here</InputLabel>
        <Input value={input} onChange={event => setInput(event.target.value)}/>
        
        </FormControl>
        <Button disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}>Send message</Button>
      </form>
      {
        messages.map((message) => {
          return <Message username={username} message={message}></Message>
        })
      }
    </div>
  );
}

export default App;
