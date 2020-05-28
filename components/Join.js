import React, { useState } from 'react';
import styled from 'styled-components';


import { Button, StyledInput } from './StyledComponents'
import { socket } from '../constants/websocket'

const FormContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  text-align: center;
`

const FormItem = styled.p`
`

const Join = ({ cancel, setGameData, setGamePlaying }) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const gameData = {
    name, code, isAdmin: false
  }

  const handleJoinGame = (event) => {
    event.preventDefault();
    socket.emit('join', { name, code }, ({ error, users, maxRounds, categories }) => {
      if (error) {
        gtag('event', 'join_error', {
          error
        })
        alert(error);
      } else {
        gameData.maxRounds = maxRounds;
        gameData.users = users;
        gameData.categories = categories;
        setGameData(gameData)
        setGamePlaying(true)
      }
    });
  }

  return (
    <FormContainer>
      <form>
        <FormItem>
          <label htmlFor="name">Your Name:</label>
          <StyledInput maxLength="15" name="name" type="text" onChange={(event) => setName(event.target.value)} />
        </FormItem>
        <FormItem>
          <label htmlFor="code">Room Code:</label>
          <StyledInput name="code" maxLength="20" type="text" onChange={(event) => setCode(event.target.value)} />
        </FormItem>
        <Button fontSize="25px" padding="15px" minWidth="220px" onClick={(event) => handleJoinGame(event)}>Join Your Friends!</Button>
        <Button fontSize="25px" padding="15px" minWidth="220px" onClick={() => cancel()} type="submit">Cancel</Button>
      </form>
    </FormContainer>
  )
}

export default Join