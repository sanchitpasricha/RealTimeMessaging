import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { FormControl, Input } from '@mui/material';
import Message from "./Message";
import './App.css';
import db from "./firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import FlipMove from "react-flip-move";
import SendIcon from '@mui/icons-material/Send';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    db.collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
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

      <img src="https://cdn-icons-png.flaticon.com/512/2548/2548881.png?w=100&h=100"/>
      <h2>Hello Chatters</h2>
      <h4>Hello {username}</h4>

      <form className="app_form">
        <FormControl className="app_FormControl">
        {/* <InputLabel>Enter your message here</InputLabel> */}
        <Input className="app__input" placeholder={"Enter your message"} value={input} onChange={event => setInput(event.target.value)}/>
        <IconButton className="app__iconButton">
          <SendIcon disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}/>
        </IconButton>
        </FormControl>
        
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
