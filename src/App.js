import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { FormControl, Input, InputLabel } from '@mui/material';
import Message from "./Message";
import './App.css';
import db from "./firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import FlipMove from "react-flip-move";

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    db.collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id,message: doc.data()})))
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

      <img src="https://cdn-icons-png.flaticon.com/512/2548/2548881.png?w=200&h=200"/>
      <h1>Hello {username}</h1>

      <form>
        <FormControl>
        <InputLabel>Enter your message here</InputLabel>
        <Input value={input} onChange={event => setInput(event.target.value)}/>
        
        </FormControl>
        <Button disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}>Send message</Button>
      </form>
      <FlipMove>{
        messages.map(({message, id}) => {
          return <Message key={id} username={username} message={message}></Message>
        })
      }</FlipMove>
    </div>
  );
}

export default App;
