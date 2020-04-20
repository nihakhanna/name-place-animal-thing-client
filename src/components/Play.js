import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components'

import GameHeader from './GameHeader'
import theme from '../constants/theme'

import StyledInput from './StyledComponents'

let socket;

const GameContainer = styled.div`
  font-family: ${theme.font};
  padding: 20px;
`


const GameScreen = styled.div`
  font-family: ${theme.font};
  padding: 20px;
`

const TableContainer = styled.div`
  display: flex;
`

const alphabets = ['A', 'B', 'C', 'D', "E", 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P']

const Play = ({ gameData }) => {
  const [name, setName] = useState('');
  const [users, setUsers] = useState([])
  const [code, setCode] = useState('');
  const [currentAlphabet, setAlphabet] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([])
  const ENDPOINT = 'http://localhost:5000/'

  useEffect(() => {
    const { name, code, isAdmin } = gameData;

    socket = io(ENDPOINT);
    setCode(code);
    setName(name);

    if (isAdmin) {
      socket.emit('create', { name, code }, (error) => {
        if (error) {
          alert(error);
        }
      });
    } else {
      socket.emit('join', { name, code }, (error) => {
        if (error) {
          alert(error);
        }
      });
    }
  }, [ENDPOINT, gameData]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [...messages, message]);
    });

    socket.on("gameData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', { code, message }, () => setMessage(''));
    }
  }

  console.log({ messages })
  return <GameContainer>
    <GameHeader roundNumber={1} />
    <div>
      Active Players: {users.map(user => <span>{user.name}</span>)}
    </div>
    <GameScreen>
      <GameTable />
      {/* <div>
        <StyledInput
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null} />
      </div> */}
    </GameScreen>

  </GameContainer>
}

const GameTable = ({ }) => {
  return <TableContainer>
    <p>
      <label htmlFor="name">Name:</label>
      <StyledInput maxLength="15" name="name" type="text" onChange={(event) => { }} />
    </p>
  </TableContainer>
}

export default Play;