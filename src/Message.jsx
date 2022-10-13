import React,{forwardRef} from 'react'
import { Card, CardContent, Typography } from '@mui/material';
import './Message.css';

const Message = forwardRef(({message, username}, ref) => {

  const isUser = username === message.username;

  return (
    <div ref={ref} className={`message ${isUser && "message_user"}`}>
      <Card className={isUser ? "message_userCard" : "message_guestCard"}>
        <CardContent>
          <Typography
            variant='h5'
            component='h2'
          >
            <h6>{!isUser && `${message.username || 'Unknown User'} :`}  {message.message}</h6>
          </Typography>
        </CardContent> 
      </Card>
    </div>
  )
})

export default Message
